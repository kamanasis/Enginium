import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeEngineViewer({ selectedPartId, onSelectPart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // Keep the rest of the learning screen usable when WebGL is unavailable.
      if (container) container.dataset.webglUnavailable = 'true';
      return undefined;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 0.3);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Engine Assembly Parts Group
    const group = new THREE.Group();
    scene.add(group);

    // Lightweight orbital HUD background: decorative objects live outside the
    // selectable engine group so they never interfere with raycasting.
    const hudGroup = new THREE.Group();
    scene.add(hudGroup);
    const hudMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.22,
    });
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.008, 6, 96);
    const ring = new THREE.LineSegments(new THREE.EdgesGeometry(ringGeometry), hudMaterial);
    ring.rotation.x = Math.PI / 2.4;
    hudGroup.add(ring);

    const innerRing = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.TorusGeometry(2.25, 0.006, 6, 80)),
      hudMaterial.clone(),
    );
    innerRing.rotation.x = Math.PI / 2.1;
    innerRing.rotation.z = Math.PI / 5;
    innerRing.material.opacity = 0.16;
    hudGroup.add(innerRing);

    const tickGeometry = new THREE.BufferGeometry();
    const tickPositions = [];
    for (let i = 0; i < 24; i += 1) {
      const angle = (i / 24) * Math.PI * 2;
      const radius = i % 3 === 0 ? 2.95 : 2.82;
      tickPositions.push(
        Math.cos(angle) * radius, Math.sin(angle) * radius, 0,
        Math.cos(angle) * 3.08, Math.sin(angle) * 3.08, 0,
      );
    }
    tickGeometry.setAttribute('position', new THREE.Float32BufferAttribute(tickPositions, 3));
    const ticks = new THREE.LineSegments(tickGeometry, hudMaterial.clone());
    ticks.rotation.x = Math.PI / 2;
    ticks.material.opacity = 0.14;
    hudGroup.add(ticks);

    const particlePositions = new Float32Array(54);
    for (let i = 0; i < particlePositions.length; i += 3) {
      const angle = (i / particlePositions.length) * Math.PI * 10;
      const radius = 2.4 + ((i * 17) % 11) / 10;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = Math.sin(angle) * radius;
      particlePositions[i + 2] = ((i * 13) % 9) / 10 - 0.45;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.035, transparent: true, opacity: 0.55 }),
    );
    hudGroup.add(particles);

    // Object map for raycasting
    const partsMap = {};

    const createPartMaterial = (id) => {
      const isSelected = selectedPartId === id;
      return new THREE.MeshPhongMaterial({
        color: isSelected ? 0x06b6d4 : 0x334155,
        wireframe: true,
        transparent: true,
        opacity: isSelected ? 0.95 : 0.45,
        shininess: 100,
      });
    };

    // 1. Spark Plug (At the top)
    const plugGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16);
    const plugMat = createPartMaterial('spark-plug');
    const sparkPlug = new THREE.Mesh(plugGeo, plugMat);
    sparkPlug.position.set(0, 1.8, 0);
    sparkPlug.userData = { id: 'spark-plug' };
    group.add(sparkPlug);
    partsMap['spark-plug'] = sparkPlug;

    // 2. Cylinder Block / Engine Core
    const cylGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.6, 16, 4, true);
    const cylMat = createPartMaterial('cylinder');
    const cylinder = new THREE.Mesh(cylGeo, cylMat);
    cylinder.position.set(0, 0.4, 0);
    cylinder.userData = { id: 'cylinder' };
    group.add(cylinder);
    partsMap['cylinder'] = cylinder;

    // 3. Air Filter (Side box)
    const filterGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const filterMat = createPartMaterial('air-filter');
    const airFilter = new THREE.Mesh(filterGeo, filterMat);
    airFilter.position.set(-1.6, 0.6, 0);
    airFilter.userData = { id: 'air-filter' };
    group.add(airFilter);
    partsMap['air-filter'] = airFilter;

    // 4. Battery Box
    const batteryGeo = new THREE.BoxGeometry(0.8, 0.8, 0.5);
    const batteryMat = createPartMaterial('battery');
    const battery = new THREE.Mesh(batteryGeo, batteryMat);
    battery.position.set(1.6, 0.6, 0);
    battery.userData = { id: 'battery' };
    group.add(battery);
    partsMap['battery'] = battery;

    // 5. Drive Chain (Bottom Loop)
    const chainGeo = new THREE.TorusGeometry(1.2, 0.08, 8, 32);
    const chainMat = createPartMaterial('chain');
    const chain = new THREE.Mesh(chainGeo, chainMat);
    chain.position.set(0, -1.5, 0);
    chain.rotation.x = Math.PI / 2;
    chain.userData = { id: 'chain' };
    group.add(chain);
    partsMap['chain'] = chain;

    // Raycaster for user selections
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children);

      if (intersects.length > 0) {
        // Find top level intersection with user data
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.id) {
          onSelectPart(hit.userData.id);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Simple Drag/Rotate Interaction Variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseMove = (e) => {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      if (isDragging) {
        group.rotation.y += deltaMove.x * 0.005;
        group.rotation.x += deltaMove.y * 0.005;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (!isDragging) {
        group.rotation.y += 0.005;
      }

      hudGroup.rotation.z -= 0.0015;
      ring.rotation.y += 0.001;
      innerRing.rotation.y -= 0.0018;
      particles.rotation.z += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      ringGeometry.dispose();
      tickGeometry.dispose();
      particleGeometry.dispose();
      hudMaterial.dispose();
      ring.material.dispose();
      innerRing.material.dispose();
      ticks.material.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, [selectedPartId]);

  return (
    <div className="engineering-surface relative w-full h-full min-h-[300px] flex items-center justify-center bg-black/30 rounded-2xl border border-zinc-800 overflow-hidden cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      
      {/* 3D View Helper Hint */}
      <div className="absolute bottom-3 left-3 bg-zinc-950/70 border border-zinc-800 rounded px-2.5 py-1 text-[9px] text-zinc-400 pointer-events-none uppercase tracking-wider font-mono">
        Drag to rotate engine assembly • Click components
      </div>
    </div>
  );
}
