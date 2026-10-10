import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CYAN = 0x38d9e8;
const BLUE = 0x2563eb;

export default function EngineeringBackdrop() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    let frameId = 0;
    let disposed = false;
    let running = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const sceneRoot = new THREE.Group();
    const animated = [];
    const disposables = [];
    camera.position.set(0, 1.5, 13);
    camera.lookAt(0, 0.8, 0);
    scene.add(sceneRoot);

    const makeMaterial = (color, opacity = 0.4) => {
      const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
      disposables.push(material);
      return material;
    };
    const addMesh = (geometry, material, parent = sceneRoot) => {
      disposables.push(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    };

    const gear = new THREE.Group();
    gear.position.set(-3.7, 2.2, -1.3);
    gear.rotation.set(0.15, -0.2, 0.25);
    gear.add(addMesh(new THREE.TorusGeometry(2.15, 0.12, 10, 64), makeMaterial(CYAN, 0.42), gear));
    gear.add(addMesh(new THREE.TorusGeometry(1.48, 0.055, 8, 48), makeMaterial(BLUE, 0.5), gear));
    const teeth = new THREE.Group();
    for (let i = 0; i < 18; i += 1) {
      const tooth = addMesh(new THREE.BoxGeometry(0.34, 0.16, 0.1), makeMaterial(CYAN, 0.32), teeth);
      const angle = (i / 18) * Math.PI * 2;
      tooth.position.set(Math.cos(angle) * 2.32, Math.sin(angle) * 2.32, 0);
      tooth.rotation.z = angle;
    }
    gear.add(teeth);
    gear.add(addMesh(new THREE.CylinderGeometry(0.68, 0.68, 0.12, 32, 1, true), makeMaterial(CYAN, 0.2), gear));
    sceneRoot.add(gear);
    animated.push({ object: gear, axis: 'z', speed: 0.035 });

    const orbit = new THREE.Group();
    orbit.position.set(3.1, 0.5, -2.4);
    orbit.rotation.set(0.7, 0.25, -0.3);
    orbit.add(addMesh(new THREE.TorusGeometry(2.5, 0.035, 8, 96), makeMaterial(CYAN, 0.24), orbit));
    orbit.add(addMesh(new THREE.TorusGeometry(1.75, 0.025, 8, 72), makeMaterial(BLUE, 0.35), orbit));
    orbit.add(addMesh(new THREE.SphereGeometry(0.74, 16, 10), makeMaterial(CYAN, 0.2), orbit));
    sceneRoot.add(orbit);
    animated.push({ object: orbit, axis: 'y', speed: -0.018 });

    const particlePositions = new Float32Array(190 * 3);
    let seed = 17;
    const random = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (random() - 0.5) * 22;
      particlePositions[i + 1] = (random() - 0.5) * 11;
      particlePositions[i + 2] = -random() * 8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: CYAN, size: 0.035, transparent: true, opacity: 0.42, sizeAttenuation: true });
    disposables.push(particleGeometry, particleMaterial);
    sceneRoot.add(new THREE.Points(particleGeometry, particleMaterial));

    const grid = new THREE.GridHelper(28, 28, CYAN, BLUE);
    grid.position.set(0, -2.5, -3);
    grid.rotation.x = 0;
    grid.material.transparent = true;
    grid.material.opacity = 0.13;
    disposables.push(grid.geometry, grid.material);
    sceneRoot.add(grid);

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (renderer) {
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      }
    };
    const render = (time = 0) => {
      if (disposed || !renderer) return;
      animated.forEach(({ object, axis, speed }) => { object.rotation[axis] = time * 0.001 * speed; });
      renderer.render(scene, camera);
    };
    const animate = (time) => { if (!running) return; render(time); frameId = requestAnimationFrame(animate); };
    const setMotion = () => {
      running = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden;
      cancelAnimationFrame(frameId);
      if (running) frameId = requestAnimationFrame(animate); else render(0);
    };
    const visibilityChange = () => setMotion();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChange = () => setMotion();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibilityChange);
    motionQuery.addEventListener?.('change', motionChange);
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);
      resize();
      setMotion();
    } catch {
      host.classList.add('engineering-backdrop-fallback');
    }
    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibilityChange);
      motionQuery.removeEventListener?.('change', motionChange);
      disposables.forEach((item) => item.dispose?.());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="engineering-backdrop"
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
        background: 'radial-gradient(circle at 18% 18%, rgba(8, 104, 132, 0.2), transparent 34%), radial-gradient(circle at 82% 42%, rgba(20, 58, 140, 0.16), transparent 38%), linear-gradient(135deg, #071019 0%, #050912 65%, #071426 100%)',
      }}
    />
  );
}
