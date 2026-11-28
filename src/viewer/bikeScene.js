import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BIKE_PARTS } from '../data/bikeParts';
import { buildBikeSegments, groundRingSegments } from './bikeGeometry';

// One persistent three.js scene for the blueprint bike. Nothing here changes the
// underlying wireframe geometry; enhancements only refine depth, lighting glow,
// subsystem focus hierarchy, hover feedback, and zoom-explode guide tethers.

export const ZOOM = { far: 5.0, near: 1.9, start: 6.4, min: 1.3, max: 9 };

const BASE_COLOR = new THREE.Color(0xb2bdce);
const HOVER_COLOR = new THREE.Color(0xff708c);
const RED = new THREE.Color(0xff1744);
const GLOW_RED = new THREE.Color(0xff4d6d);
const BIKE_CENTER = new THREE.Vector3(0, 0.85, 0);
const START_DIRECTION = new THREE.Vector3(0.2, 0.24, 1).normalize();
const SAME_GROUP_BOOST = 1.25;
const BLINK_HZ = 1.4;

const LINE_ONLY_PARTS = new Set([
  'main-chassis',
  'wiring-harness',
  'clutch-cable',
  'exhaust-muffler',
  'chain',
  'front-tyre',
  'rear-tyre',
  'telescopic-forks',
  'swingarm',
  'rear-shock-absorbers',
  'seat',
]);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => {
  const c = clamp01(v);
  return c * c * (3 - 2 * c);
};

function makeStars() {
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
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xcbd5e1, size: 0.05, transparent: true, opacity: 0.48, sizeAttenuation: true }));
}

/**
 * @param {{container: HTMLElement, onSelect?: (id: string) => void,
 *   onHover?: (id: string | null) => void,
 *   onFrame?: (frame: object) => void, reducedMotion?: boolean}} options
 * @returns {null | object} null when WebGL is unavailable
 */
export function createBikeScene({ container, onSelect, onHover, onFrame, reducedMotion = false }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const dom = renderer.domElement;
  dom.style.display = 'block';
  dom.style.width = '100%';
  dom.style.height = '100%';
  dom.style.touchAction = 'none';
  dom.setAttribute('aria-hidden', 'true');
  container.appendChild(dom);

  const scene = new THREE.Scene();
  // Soft depth fog blends distant grid edges and rear parts seamlessly into the dark canvas
  scene.fog = new THREE.FogExp2(0x05060a, 0.048);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);

  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.8;
  controls.minDistance = ZOOM.min;
  controls.maxDistance = ZOOM.max;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI / 2 - 0.02;
  controls.autoRotateSpeed = 0.7;

  // Environment: drafting grid, wheel rings and stars.
  const grid = new THREE.GridHelper(18, 36, 0x991b38, 0x2d0c16);
  grid.material.transparent = true;
  grid.material.opacity = 0.56;
  scene.add(grid);

  const ringGeometry = new THREE.BufferGeometry();
  ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundRingSegments(), 3));
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0xff1744, transparent: true, opacity: 0.38 });
  scene.add(new THREE.LineSegments(ringGeometry, ringMaterial));
  const stars = makeStars();
  scene.add(stars);

  // Subtle crimson explosion leader tethers (only visible while zooming to explode parts)
  const tetherPositions = new Float32Array(BIKE_PARTS.length * 6);
  const tetherGeo = new THREE.BufferGeometry();
  tetherGeo.setAttribute('position', new THREE.BufferAttribute(tetherPositions, 3));
  tetherGeo.setDrawRange(0, 0);
  const tetherMat = new THREE.LineBasicMaterial({
    color: 0xff1744,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const tetherLines = new THREE.LineSegments(tetherGeo, tetherMat);
  tetherLines.frustumCulled = false;
  scene.add(tetherLines);

  // Parts (unchanged procedural wireframe geometry)
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

    const material = new THREE.LineBasicMaterial({ color: BASE_COLOR.clone(), transparent: true, opacity: 0.58 });
    const lines = new THREE.LineSegments(geometry, material);

    // Subtle additive glow pass reusing the exact same geometry for crisp active/hover highlighting
    const glowMaterial = new THREE.LineBasicMaterial({
      color: GLOW_RED.clone(),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowLines = new THREE.LineSegments(geometry, glowMaterial);
    glowLines.scale.setScalar(1.003);

    const group = new THREE.Group();
    group.add(lines);
    group.add(glowLines);
    scene.add(group);

    const part = {
      id: meta.id,
      meta,
      group,
      lines,
      glowLines,
      material,
      glowMaterial,
      center,
      offset: new THREE.Vector3(...meta.offset),
      boost: 1,
      opacity: 0.58,
      glowOpacity: 0,
    };

    if (meta.selectable !== false) {
      lines.userData = { partId: meta.id, isLine: true };
      pickTargets.push(lines);

      if (!LINE_ONLY_PARTS.has(meta.id)) {
        const pad = 0.05;
        const minDim = 0.12;
        const proxyGeometry = new THREE.BoxGeometry(
          Math.max(size.x + pad, minDim),
          Math.max(size.y + pad, minDim),
          Math.max(size.z + pad, minDim),
        );
        const proxy = new THREE.Mesh(proxyGeometry, new THREE.MeshBasicMaterial({ visible: false }));
        proxy.position.copy(center);
        const p = proxyGeometry.parameters;
        proxy.userData = { partId: meta.id, isLine: false, volume: p.width * p.height * p.depth };
        group.add(proxy);
        pickTargets.push(proxy);
      }
    }
    parts.set(meta.id, part);
  }

  // State
  let selectedId = null;
  let hoveredId = null;
  let markerIds = [];
  let e = 0;
  let tween = null;
  let lastInteraction = -Infinity;
  let disposed = false;
  let last = performance.now();

  const raycaster = new THREE.Raycaster();
  raycaster.params.Line.threshold = 0.14;
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

  function evaluateHits(ray, hits) {
    if (!hits || hits.length === 0) return null;

    const partBest = new Map();
    for (const h of hits) {
      const id = h.object.userData.partId;
      if (!id) continue;
      const isLine = Boolean(h.object.userData.isLine);
      const rayDist = isLine ? ray.distanceToPoint(h.point) : 0.015;
      const depth = h.distance;

      const cur = partBest.get(id);
      if (!cur || rayDist < cur.rayDist || (Math.abs(rayDist - cur.rayDist) < 0.02 && depth < cur.depth)) {
        partBest.set(id, { id, rayDist, depth, isLine, point: h.point });
      }
    }

    const list = Array.from(partBest.values());
    if (list.length === 1) return list[0].id;

    list.sort((a, b) => {
      const diffRay = a.rayDist - b.rayDist;
      if (Math.abs(diffRay) > 0.035) return diffRay;
      const diffDepth = a.depth - b.depth;
      if (Math.abs(diffDepth) > 0.35) return diffDepth;
      return diffRay;
    });

    return list[0].id;
  }

  function pickAt(clientX, clientY) {
    const rect = dom.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    let hits = raycaster.intersectObjects(pickTargets, false);
    let best = evaluateHits(raycaster.ray, hits);
    if (best) return best;

    const offsets = [
      [8, 0], [-8, 0], [0, 8], [0, -8],
      [12, 8], [-12, -8], [8, -12], [-8, 12],
    ];
    for (let i = 0; i < offsets.length; i += 1) {
      const [ox, oy] = offsets[i];
      ndc.set(((clientX + ox - rect.left) / rect.width) * 2 - 1, -((clientY + oy - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      hits = raycaster.intersectObjects(pickTargets, false);
      best = evaluateHits(raycaster.ray, hits);
      if (best) return best;
    }

    return null;
  }

  let downAt = null;
  const onPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    downAt = { x: event.clientX, y: event.clientY, t: performance.now() };
  };
  const onPointerUp = (event) => {
    if (!downAt) return;
    if (event.button !== undefined && event.button !== 0) return;
    const moved = Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y);
    const duration = performance.now() - downAt.t;
    downAt = null;
    if (moved > 14 || duration > 1000) return;
    const id = pickAt(event.clientX, event.clientY);
    if (id) onSelect?.(id);
  };
  let hoverBusy = false;
  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse' || event.buttons || hoverBusy) return;
    hoverBusy = true;
    window.setTimeout(() => {
      hoverBusy = false;
      if (disposed) return;
      const hitId = pickAt(event.clientX, event.clientY);
      dom.style.cursor = hitId ? 'pointer' : 'grab';
      if (hitId !== hoveredId) {
        hoveredId = hitId;
        onHover?.(hoveredId);
      }
    }, 40);
  };
  const onPointerLeave = () => {
    if (hoveredId !== null) {
      hoveredId = null;
      dom.style.cursor = 'grab';
      onHover?.(null);
    }
  };
  dom.addEventListener('pointerdown', onPointerDown);
  dom.addEventListener('pointerup', onPointerUp);
  dom.addEventListener('pointermove', onPointerMove);
  dom.addEventListener('pointerleave', onPointerLeave);

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

    const distance = currentDistance();
    const depth = clamp01((ZOOM.far - distance) / (ZOOM.far - ZOOM.near));
    const eTarget = smooth(depth);
    e += (eTarget - e) * (1 - Math.exp(-dt * 7));
    if (Math.abs(eTarget - e) < 5e-4) e = eTarget;

    const groupFocus = focus ? focus.meta.group : null;
    let maxDisplacement = 0;
    let tetherVertexCount = 0;
    const tPosAttr = tetherGeo.getAttribute('position');
    const tArr = tPosAttr.array;

    for (const part of parts.values()) {
      const boostTarget = groupFocus && part.meta.group === groupFocus ? SAME_GROUP_BOOST : 1;
      part.boost += (boostTarget - part.boost) * (1 - Math.exp(-dt * 6));
      const progress = smooth((e - part.meta.start) / (1 - part.meta.start));
      if (progress === 0) {
        part.group.position.set(0, 0, 0);
      } else {
        part.group.position.copy(part.offset).multiplyScalar(progress * part.boost);
        const disp = part.group.position.length();
        maxDisplacement = Math.max(maxDisplacement, disp);

        if (disp > 0.04 && tetherVertexCount + 2 <= BIKE_PARTS.length * 2) {
          const idx = tetherVertexCount * 3;
          tArr[idx] = part.center.x;
          tArr[idx + 1] = part.center.y;
          tArr[idx + 2] = part.center.z;
          tArr[idx + 3] = part.center.x + part.group.position.x;
          tArr[idx + 4] = part.center.y + part.group.position.y;
          tArr[idx + 5] = part.center.z + part.group.position.z;
          tetherVertexCount += 2;
        }
      }
    }
    tPosAttr.needsUpdate = true;
    tetherGeo.setDrawRange(0, tetherVertexCount);
    tetherMat.opacity = clamp01(e * 0.65) * 0.36;

    tmpDesired.copy(BIKE_CENTER);
    if (focus) tmpDesired.lerp(tmpProject.copy(focus.center).add(focus.group.position), smooth(depth));
    tmpDelta.copy(tmpDesired).sub(controls.target);
    if (tmpDelta.lengthSq() < 1e-8) {
      tmpDelta.set(0, 0, 0);
    } else {
      tmpDelta.multiplyScalar(1 - Math.exp(-dt * 6));
    }
    controls.target.add(tmpDelta);
    camera.position.add(tmpDelta);

    // Highlight, subsystem hierarchy, hover & additive glow
    const hasFocus = Boolean(selectedId) || markerIds.length > 0;
    const k = 1 - Math.exp(-dt * 10);
    for (const part of parts.values()) {
      const isSelected = part.id === selectedId;
      const isMarker = markerIds.includes(part.id);
      const isHovered = part.id === hoveredId && !isSelected && !isMarker;
      const isSibling = Boolean(groupFocus) && part.meta.group === groupFocus && !isSelected && !isMarker;

      let targetOpacity = isSelected
        ? 1
        : isMarker
          ? 0.88
          : isHovered
            ? 0.92
            : isSibling
              ? 0.42
              : hasFocus
                ? 0.26
                : 0.58;
      if (part.meta.selectable === false) targetOpacity *= 0.72;
      if (part.id === markerIds[0] && !reducedMotion) {
        targetOpacity = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(seconds * Math.PI * 2 * BLINK_HZ));
      }
      part.opacity += (targetOpacity - part.opacity) * k;
      part.material.opacity = part.opacity;

      const targetColor = (isSelected || isMarker)
        ? RED
        : isHovered
          ? HOVER_COLOR
          : BASE_COLOR;
      part.material.color.lerp(targetColor, k);

      const targetGlow = (isSelected || isMarker) ? 0.42 : isHovered ? 0.22 : 0;
      part.glowOpacity += (targetGlow - part.glowOpacity) * k;
      part.glowMaterial.opacity = part.glowOpacity;
      part.glowLines.visible = part.glowOpacity > 0.01;
    }

    if (!reducedMotion) {
      ringMaterial.opacity = 0.34 + 0.08 * (0.5 + 0.5 * Math.sin(seconds * 1.4));
      stars.rotation.y += dt * 0.004;
    }
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

  return {
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
    pick(clientX, clientY) {
      return pickAt(clientX, clientY);
    },
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
      dom.removeEventListener('pointerleave', onPointerLeave);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material?.dispose?.());
      });
      renderer.dispose();
      if (dom.parentNode === container) container.removeChild(dom);
    },
  };
}
