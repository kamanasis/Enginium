import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BIKE_PARTS } from '../data/bikeParts';
import { buildBikeSegments, groundRingSegments } from './bikeGeometry';

// One persistent three.js scene for the blueprint bike. Nothing here is rebuilt
// when the selection, markers or React props change; they only change colours.
//
// Zoom-to-explode, in one place:
//   depth        = clamp01((FAR - cameraDistance) / (FAR - NEAR))   how close we are
//   e            = smoothed smoothstep(depth)                       explosion factor 0..1
//   displacement = offset * smoothstep((e - start) / (1 - start)) * boost
// displacement is recomputed from e every frame and written to the part's
// group position; assembled vertices are never touched. At e = 0 every group
// position is set to exactly (0, 0, 0), so repeated zooming cannot accumulate drift.

export const ZOOM = { far: 5.0, near: 1.9, start: 6.4, min: 1.3, max: 9 };

const BASE_COLOR = new THREE.Color(0xaab3c2);
const RED = new THREE.Color(0xff1744);
const BIKE_CENTER = new THREE.Vector3(0, 0.85, 0);
const START_DIRECTION = new THREE.Vector3(0.2, 0.24, 1).normalize();
const SAME_GROUP_BOOST = 1.25;
const BLINK_HZ = 1.4;

// Long or large parts are picked through their lines instead of a bounding box.
const NO_PROXY = new Set(['main-chassis', 'wiring-harness', 'clutch-cable', 'exhaust-muffler', 'seat']);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => {
  const c = clamp01(v);
  return c * c * (3 - 2 * c);
};

function makeStars() {
  // Deterministic scatter so the backdrop is identical on every load.
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const positions = [];
  for (let i = 0; i < 240; i += 1) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(rand() * 0.9 + 0.05);
    const radius = 14 + rand() * 10;
    positions.push(Math.sin(phi) * Math.cos(theta) * radius, Math.cos(phi) * radius * 0.8 + 1, Math.sin(phi) * Math.sin(theta) * radius);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xcbd5e1, size: 0.05, transparent: true, opacity: 0.5, sizeAttenuation: true }));
}

/**
 * @param {{container: HTMLElement, onSelect?: (id: string) => void,
 *   onFrame?: (frame: object) => void, reducedMotion?: boolean}} options
 * @returns {null | object} null when WebGL is unavailable
 */
export function createBikeScene({ container, onSelect, onFrame, reducedMotion = false }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const dom = renderer.domElement;
  dom.style.display = 'block';
  dom.style.width = '100%';
  dom.style.height = '100%';
  dom.style.touchAction = 'none'; // one-finger rotate and pinch zoom must not scroll the page
  dom.setAttribute('aria-hidden', 'true');
  container.appendChild(dom);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);

  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false; // keeps the explode behaviour deterministic
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.8;
  controls.minDistance = ZOOM.min;
  controls.maxDistance = ZOOM.max;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // never orbit under the ground plane
  controls.autoRotateSpeed = 0.7;

  // Environment: drafting grid, wheel rings and stars.
  const grid = new THREE.GridHelper(18, 36, 0x8a1630, 0x2a0b14);
  grid.material.transparent = true;
  grid.material.opacity = 0.55;
  scene.add(grid);

  const ringGeometry = new THREE.BufferGeometry();
  ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundRingSegments(), 3));
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0xff1744, transparent: true, opacity: 0.35 });
  scene.add(new THREE.LineSegments(ringGeometry, ringMaterial));
  const stars = makeStars();
  scene.add(stars);

  // Parts
  const segments = buildBikeSegments();
  const parts = new Map();
  const pickTargets = [];

  for (const meta of BIKE_PARTS) {
    const positions = segments.get(meta.id);
    if (!positions) continue;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox.clone();
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());

    const material = new THREE.LineBasicMaterial({ color: BASE_COLOR.clone(), transparent: true, opacity: 0.55 });
    const lines = new THREE.LineSegments(geometry, material);
    const group = new THREE.Group();
    group.add(lines);
    scene.add(group);

    const part = {
      id: meta.id,
      meta,
      group,
      lines,
      material,
      center,
      offset: new THREE.Vector3(...meta.offset),
      boost: 1,
      opacity: 0.55,
    };

    if (meta.selectable !== false) {
      if (NO_PROXY.has(meta.id)) {
        lines.userData = { partId: meta.id, volume: 1e6 };
        pickTargets.push(lines);
      } else {
        const proxyGeometry = new THREE.BoxGeometry(Math.max(size.x + 0.06, 0.14), Math.max(size.y + 0.06, 0.14), Math.max(size.z + 0.06, 0.14));
        const proxy = new THREE.Mesh(proxyGeometry, new THREE.MeshBasicMaterial({ visible: false }));
        proxy.position.copy(center);
        const p = proxyGeometry.parameters;
        proxy.userData = { partId: meta.id, volume: p.width * p.height * p.depth };
        group.add(proxy);
        pickTargets.push(proxy);
      }
    }
    parts.set(meta.id, part);
  }

  // State
  let selectedId = null;
  let markerIds = [];
  let e = 0;
  let tween = null;
  let lastInteraction = -Infinity;
  let disposed = false;
  let last = performance.now();

  const raycaster = new THREE.Raycaster();
  raycaster.params.Line.threshold = 0.05;
  const ndc = new THREE.Vector2();
  const tmpDir = new THREE.Vector3();
  const tmpDelta = new THREE.Vector3();
  const tmpDesired = new THREE.Vector3();
  const tmpProject = new THREE.Vector3();

  const currentDistance = () => camera.position.distanceTo(controls.target);

  function setCameraDistance(distance) {
    tmpDir.copy(camera.position).sub(controls.target).normalize();
    camera.position.copy(controls.target).addScaledVector(tmpDir, distance);
  }

  function startTween(to) {
    const clamped = Math.min(Math.max(to, ZOOM.min), controls.maxDistance);
    tween = { from: currentDistance(), to: clamped, t0: performance.now(), duration: reducedMotion ? 1 : 650 };
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // Initial framing: pull back on narrow (portrait) viewports so the whole bike fits.
  resize();
  const fit = Math.min(Math.max(1, 1.55 / camera.aspect), 1.5);
  const startDistance = ZOOM.start * fit;
  controls.maxDistance = Math.max(ZOOM.max, startDistance + 1);
  controls.target.copy(BIKE_CENTER);
  camera.position.copy(BIKE_CENTER).addScaledVector(START_DIRECTION, startDistance);
  controls.update();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const onControlStart = () => {
    lastInteraction = performance.now();
    tween = null;
  };
  controls.addEventListener('start', onControlStart);

  function pickAt(clientX, clientY) {
    const rect = dom.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    let bestId = null;
    let bestVolume = Infinity;
    for (const hit of raycaster.intersectObjects(pickTargets, false)) {
      const { partId, volume } = hit.object.userData;
      if (volume < bestVolume) {
        bestVolume = volume;
        bestId = partId;
      }
    }
    return bestId;
  }

  let downAt = null;
  const onPointerDown = (event) => {
    downAt = { x: event.clientX, y: event.clientY, t: performance.now() };
  };
  const onPointerUp = (event) => {
    if (!downAt) return;
    const moved = Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y);
    const quick = performance.now() - downAt.t < 600;
    downAt = null;
    if (moved > 6 || !quick) return; // a drag is a rotation, not a selection
    const id = pickAt(event.clientX, event.clientY);
    if (id) onSelect?.(id);
  };
  let hoverBusy = false;
  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse' || event.buttons || hoverBusy) return;
    hoverBusy = true;
    window.setTimeout(() => {
      hoverBusy = false;
      if (!disposed) dom.style.cursor = pickAt(event.clientX, event.clientY) ? 'pointer' : 'grab';
    }, 50);
  };
  dom.addEventListener('pointerdown', onPointerDown);
  dom.addEventListener('pointerup', onPointerUp);
  dom.addEventListener('pointermove', onPointerMove);

  function focusPart() {
    return parts.get(selectedId) || parts.get(markerIds[0]) || null;
  }

  function tick() {
    if (disposed) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const seconds = now / 1000;

    if (tween) {
      const p = clamp01((now - tween.t0) / tween.duration);
      setCameraDistance(tween.from + (tween.to - tween.from) * smooth(p));
      if (p >= 1) tween = null;
    }

    const focus = focusPart();
    controls.autoRotate = !reducedMotion && !focus && e === 0 && now - lastInteraction > 4000;
    controls.update();

    // Explosion factor from how close the camera is.
    const distance = currentDistance();
    const depth = clamp01((ZOOM.far - distance) / (ZOOM.far - ZOOM.near));
    const eTarget = smooth(depth);
    e += (eTarget - e) * (1 - Math.exp(-dt * 7));
    if (Math.abs(eTarget - e) < 5e-4) e = eTarget;

    // Positions: always assembled pose + offset * f(e). Pure function of e.
    const groupFocus = focus ? focus.meta.group : null;
    let maxDisplacement = 0;
    for (const part of parts.values()) {
      const boostTarget = groupFocus && part.meta.group === groupFocus ? SAME_GROUP_BOOST : 1;
      part.boost += (boostTarget - part.boost) * (1 - Math.exp(-dt * 6));
      const progress = smooth((e - part.meta.start) / (1 - part.meta.start));
      if (progress === 0) {
        part.group.position.set(0, 0, 0);
      } else {
        part.group.position.copy(part.offset).multiplyScalar(progress * part.boost);
        maxDisplacement = Math.max(maxDisplacement, part.group.position.length());
      }
    }

    // As the user zooms in, the orbit target glides from the bike to the focused part.
    tmpDesired.copy(BIKE_CENTER);
    if (focus) tmpDesired.lerp(tmpProject.copy(focus.center).add(focus.group.position), smooth(depth));
    tmpDelta.copy(tmpDesired).sub(controls.target);
    if (tmpDelta.lengthSq() < 1e-8) {
      tmpDelta.set(0, 0, 0);
    } else {
      tmpDelta.multiplyScalar(1 - Math.exp(-dt * 6));
    }
    controls.target.add(tmpDelta);
    camera.position.add(tmpDelta); // same shift keeps the view direction and distance unchanged

    // Highlight and blink.
    const hasFocus = Boolean(selectedId) || markerIds.length > 0;
    const k = 1 - Math.exp(-dt * 10);
    for (const part of parts.values()) {
      const isSelected = part.id === selectedId;
      const isMarker = markerIds.includes(part.id);
      let targetOpacity = isSelected ? 1 : isMarker ? 0.85 : hasFocus ? 0.3 : 0.55;
      if (part.meta.selectable === false) targetOpacity *= 0.7;
      if (part.id === markerIds[0] && !reducedMotion) {
        targetOpacity = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(seconds * Math.PI * 2 * BLINK_HZ));
      }
      part.opacity += (targetOpacity - part.opacity) * k;
      part.material.opacity = part.opacity;
      part.material.color.lerp(isSelected || isMarker ? RED : BASE_COLOR, k);
    }

    stars.rotation.y += dt * 0.004;
    renderer.render(scene, camera);

    if (onFrame) {
      const rect = dom.getBoundingClientRect();
      const projected = [];
      const ids = new Set(markerIds);
      if (selectedId) ids.add(selectedId);
      for (const id of ids) {
        const part = parts.get(id);
        if (!part) continue;
        tmpProject.copy(part.center).add(part.group.position).project(camera);
        projected.push({
          id,
          x: (tmpProject.x * 0.5 + 0.5) * rect.width,
          y: (-tmpProject.y * 0.5 + 0.5) * rect.height,
          visible: tmpProject.z < 1,
        });
      }
      onFrame({ explosion: e, distance, maxDisplacement, markers: projected });
    }
  }

  renderer.setAnimationLoop(tick);

  const api = {
    setSelected(id) {
      selectedId = id && parts.has(id) ? id : null;
    },
    setMarkers(ids) {
      markerIds = ids.filter((id) => parts.has(id) && parts.get(id).meta.selectable !== false);
    },
    zoomBy(factor) {
      lastInteraction = performance.now();
      startTween(currentDistance() * factor);
    },
    reassemble() {
      lastInteraction = performance.now();
      startTween(startDistance);
    },
    /** Which part id is under this client position, or null. */
    pick(clientX, clientY) {
      return pickAt(clientX, clientY);
    },
    /** Immediate camera distance, for tests. */
    setDistance(distance) {
      tween = null;
      setCameraDistance(Math.min(Math.max(distance, ZOOM.min), controls.maxDistance));
    },
    getState() {
      let maxDisplacement = 0;
      for (const part of parts.values()) maxDisplacement = Math.max(maxDisplacement, part.group.position.length());
      return { explosion: e, distance: currentDistance(), maxDisplacement, partCount: parts.size };
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointermove', onPointerMove);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material?.dispose?.());
      });
      renderer.dispose();
      if (dom.parentNode === container) container.removeChild(dom);
    },
  };
  return api;
}
