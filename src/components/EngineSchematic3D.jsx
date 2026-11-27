import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import EngineBlueprintAnimation from './EngineBlueprintAnimation';

/**
 * EngineSchematic3D - Interactive WebGL CAD Cutaway & Kinematic 4-Stroke Engine
 * Renders a translucent titanium & crimson wireframe/solid schematic engine with
 * synchronized crankshaft, con-rod, piston, cam gear, valves, and TDC ignition pulse.
 */
export default function EngineSchematic3D({ vehicleType = 'Motorcycle', onPhaseChange }) {
  const hostRef = useRef(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const phaseCallbackRef = useRef(onPhaseChange);

  useEffect(() => {
    phaseCallbackRef.current = onPhaseChange;
  }, [onPhaseChange]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return undefined;
    }

    const disposables = [];
    const track = (item) => {
      if (item) disposables.push(item);
      return item;
    };

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 380;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.cursor = 'grab';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0.3, 0.8, 7.6);
    camera.lookAt(0, 0.25, 0);

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xdbeafe, 0.65));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff2d4f, 1.6);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 0.85, 14);
    fillLight.position.set(3.5, -2, 4);
    scene.add(fillLight);

    // Materials (CAD Schematic Titanium + Translucent Cutaway + Crimson Highlights)
    const matShell = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.22,
        roughness: 0.35,
        metalness: 0.6,
        depthWrite: false,
      }),
    );
    const matMetalDark = track(
      new THREE.MeshStandardMaterial({
        color: 0x1e2433,
        roughness: 0.32,
        metalness: 0.82,
      }),
    );
    const matMetalBright = track(
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.25,
        metalness: 0.88,
      }),
    );
    const matCrimson = track(
      new THREE.MeshStandardMaterial({
        color: 0xff2247,
        emissive: 0x881337,
        emissiveIntensity: 0.6,
        roughness: 0.25,
        metalness: 0.7,
      }),
    );

    const edgeSteel = track(
      new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.55 }),
    );
    const edgeBright = track(
      new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.72 }),
    );
    const edgeCrimson = track(
      new THREE.LineBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.9 }),
    );

    const addEdges = (mesh, geo, edgeMat = edgeSteel) => {
      const eGeo = track(new THREE.EdgesGeometry(geo, 22));
      const lines = new THREE.LineSegments(eGeo, edgeMat);
      mesh.add(lines);
      return lines;
    };

    // Root Engine Group (tilted slightly for dramatic cutaway depth)
    const root = new THREE.Group();
    root.position.y = -0.15;
    root.rotation.y = -0.42;
    root.rotation.x = 0.14;
    scene.add(root);

    // -------------------------------------------------------------------------
    // 1. CAD CALIBRATION BASE RING & ORBITAL GRID
    // -------------------------------------------------------------------------
    const baseGroup = new THREE.Group();
    baseGroup.position.y = -1.75;
    root.add(baseGroup);

    const outerRingGeo = track(new THREE.RingGeometry(2.1, 2.15, 72));
    const outerRing = new THREE.Mesh(
      outerRingGeo,
      track(new THREE.MeshBasicMaterial({ color: 0xff2d4f, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })),
    );
    outerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(outerRing);

    const innerRingGeo = track(new THREE.RingGeometry(1.42, 1.45, 64));
    const innerRing = new THREE.Mesh(
      innerRingGeo,
      track(new THREE.MeshBasicMaterial({ color: 0x64748b, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })),
    );
    innerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(innerRing);

    const tickPts = [];
    for (let i = 0; i < 36; i += 1) {
      const a = (i / 36) * Math.PI * 2;
      const r0 = i % 3 === 0 ? 1.92 : 2.02;
      tickPts.push(
        new THREE.Vector3(Math.cos(a) * r0, 0, Math.sin(a) * r0),
        new THREE.Vector3(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1),
      );
    }
    const tickGeo = track(new THREE.BufferGeometry().setFromPoints(tickPts));
    baseGroup.add(new THREE.LineSegments(tickGeo, edgeSteel));

    // -------------------------------------------------------------------------
    // 2. CRANKCASE HOUSING & COOLING-FINNED CYLINDER BARREL (Translucent CAD)
    // -------------------------------------------------------------------------
    const crankcaseGeo = track(new THREE.CylinderGeometry(1.02, 1.02, 0.72, 28, 1, true));
    const crankcase = new THREE.Mesh(crankcaseGeo, matShell);
    crankcase.rotation.z = Math.PI / 2;
    crankcase.position.y = -0.95;
    addEdges(crankcase, crankcaseGeo, edgeSteel);
    root.add(crankcase);

    const cylinderGeo = track(new THREE.CylinderGeometry(0.68, 0.68, 1.65, 28, 1, true));
    const cylinder = new THREE.Mesh(cylinderGeo, matShell);
    cylinder.position.y = 0.42;
    addEdges(cylinder, cylinderGeo, edgeBright);
    root.add(cylinder);

    // 6 Precision Cooling Fins (Air-cooled profile) or Smooth Shroud (Scooter ESP)
    const finCount = vehicleType?.toLowerCase() === 'scooter' ? 4 : 6;
    const finGeo = track(new THREE.BoxGeometry(1.75, 0.04, 1.75));
    for (let f = 0; f < finCount; f += 1) {
      const fin = new THREE.Mesh(finGeo, matShell);
      fin.position.y = -0.15 + f * 0.22;
      addEdges(fin, finGeo, f === finCount - 1 ? edgeCrimson : edgeSteel);
      root.add(fin);
    }

    // Cylinder Head Block
    const headGeo = track(new THREE.BoxGeometry(1.68, 0.56, 1.56));
    const headMesh = new THREE.Mesh(headGeo, matShell);
    headMesh.position.y = 1.55;
    addEdges(headMesh, headGeo, edgeBright);
    root.add(headMesh);

    // -------------------------------------------------------------------------
    // 3. KINEMATIC CRANKSHAFT, FLYWHEEL & CON-ROD
    // -------------------------------------------------------------------------
    const crankCenterY = -0.95;
    const crankRadius = 0.44;
    const rodLength = 1.25;

    const crankGroup = new THREE.Group();
    crankGroup.position.set(0, crankCenterY, 0);
    root.add(crankGroup);

    // Twin Counterweight Webs
    const webGeo = track(new THREE.CylinderGeometry(0.64, 0.64, 0.14, 24, 1, false, -Math.PI * 0.55, Math.PI * 1.1));
    [-0.22, 0.22].forEach((zOffset) => {
      const web = new THREE.Mesh(webGeo, matMetalDark);
      web.rotation.x = Math.PI / 2;
      web.position.z = zOffset;
      addEdges(web, webGeo, edgeBright);
      crankGroup.add(web);
    });

    // Main Crank Shaft Axle
    const axleGeo = track(new THREE.CylinderGeometry(0.11, 0.11, 1.65, 16));
    const axle = new THREE.Mesh(axleGeo, matMetalBright);
    axle.rotation.x = Math.PI / 2;
    addEdges(axle, axleGeo, edgeSteel);
    crankGroup.add(axle);

    // Side Flywheel / Timing Drive Pulley
    const flywheelGeo = track(new THREE.CylinderGeometry(0.72, 0.72, 0.12, 32));
    const flywheel = new THREE.Mesh(flywheelGeo, matMetalDark);
    flywheel.rotation.x = Math.PI / 2;
    flywheel.position.z = 0.66;
    addEdges(flywheel, flywheelGeo, edgeCrimson);
    crankGroup.add(flywheel);

    // Crankpin Marker
    const pinGeo = track(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 16));
    const crankPin = new THREE.Mesh(pinGeo, matCrimson);
    crankPin.rotation.x = Math.PI / 2;
    crankPin.position.set(0, crankRadius, 0);
    crankGroup.add(crankPin);

    // Connecting Rod
    const conRodGroup = new THREE.Group();
    root.add(conRodGroup);
    const rodShaftGeo = track(new THREE.BoxGeometry(0.14, rodLength, 0.12));
    const rodShaft = new THREE.Mesh(rodShaftGeo, matMetalBright);
    rodShaft.position.y = rodLength / 2;
    addEdges(rodShaft, rodShaftGeo, edgeBright);
    conRodGroup.add(rodShaft);

    // -------------------------------------------------------------------------
    // 4. RECIPROCATING PISTON ASSEMBLY & RINGS
    // -------------------------------------------------------------------------
    const pistonGroup = new THREE.Group();
    root.add(pistonGroup);

    const pistonGeo = track(new THREE.CylinderGeometry(0.61, 0.61, 0.56, 28));
    const pistonMesh = new THREE.Mesh(pistonGeo, matMetalDark);
    addEdges(pistonMesh, pistonGeo, edgeBright);
    pistonGroup.add(pistonMesh);

    // Crimson Compression Rings
    const ringGeo = track(new THREE.TorusGeometry(0.62, 0.022, 8, 36));
    [0.18, 0.08].forEach((ry) => {
      const compRing = new THREE.Mesh(ringGeo, matCrimson);
      compRing.rotation.x = Math.PI / 2;
      compRing.position.y = ry;
      pistonGroup.add(compRing);
    });

    // Wrist Pin
    const wristGeo = track(new THREE.CylinderGeometry(0.085, 0.085, 1.16, 16));
    const wristPin = new THREE.Mesh(wristGeo, matMetalBright);
    wristPin.rotation.x = Math.PI / 2;
    wristPin.position.y = -0.08;
    pistonGroup.add(wristPin);

    // -------------------------------------------------------------------------
    // 5. OVERHEAD CAM SPROCKET, VALVES & SPARK PLUG IGNITION
    // -------------------------------------------------------------------------
    const camGearGeo = track(new THREE.CylinderGeometry(0.36, 0.36, 0.1, 20));
    const camGear = new THREE.Mesh(camGearGeo, matMetalDark);
    camGear.rotation.x = Math.PI / 2;
    camGear.position.set(0, 1.62, 0.66);
    addEdges(camGear, camGearGeo, edgeCrimson);
    root.add(camGear);

    // Intake & Exhaust Poppet Valves
    const valveGeo = track(new THREE.CylinderGeometry(0.035, 0.18, 0.42, 14));
    const intakeValve = new THREE.Mesh(valveGeo, matMetalBright);
    intakeValve.position.set(-0.28, 1.46, 0);
    intakeValve.rotation.z = 0.22;
    addEdges(intakeValve, valveGeo, edgeBright);
    root.add(intakeValve);

    const exhaustValve = new THREE.Mesh(valveGeo, matMetalBright);
    exhaustValve.position.set(0.28, 1.46, 0);
    exhaustValve.rotation.z = -0.22;
    addEdges(exhaustValve, valveGeo, edgeCrimson);
    root.add(exhaustValve);

    // Top Spark Plug
    const plugBodyGeo = track(new THREE.CylinderGeometry(0.09, 0.1, 0.48, 8));
    const sparkPlug = new THREE.Mesh(plugBodyGeo, matMetalBright);
    sparkPlug.position.set(0, 1.98, 0);
    addEdges(sparkPlug, plugBodyGeo, edgeCrimson);
    root.add(sparkPlug);

    // Ignition Spark Core + Expanding Shock Ring inside Combustion Chamber
    const sparkCoreGeo = track(new THREE.SphereGeometry(0.11, 16, 16));
    const sparkCoreMat = track(
      new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0 }),
    );
    const sparkCore = new THREE.Mesh(sparkCoreGeo, sparkCoreMat);
    sparkCore.position.set(0, 1.24, 0);
    root.add(sparkCore);

    const flameRingGeo = track(new THREE.RingGeometry(0.08, 0.56, 32));
    const flameRingMat = track(
      new THREE.MeshBasicMaterial({ color: 0xff2d4f, side: THREE.DoubleSide, transparent: true, opacity: 0 }),
    );
    const flameRing = new THREE.Mesh(flameRingGeo, flameRingMat);
    flameRing.rotation.x = -Math.PI / 2;
    flameRing.position.set(0, 1.18, 0);
    root.add(flameRing);

    // -------------------------------------------------------------------------
    // 6. POINTER DRAG-TO-ORBIT INTERACTION
    // -------------------------------------------------------------------------
    let isDragging = false;
    let lastPointer = { x: 0, y: 0 };
    let targetRotY = -0.42;
    let targetRotX = 0.14;

    const onPointerDown = (e) => {
      isDragging = true;
      lastPointer = { x: e.clientX, y: e.clientY };
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointer.x;
      const dy = e.clientY - lastPointer.y;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.55, Math.min(0.65, targetRotX + dy * 0.006));
      lastPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // -------------------------------------------------------------------------
    // 7. KINEMATIC 4-STROKE ANIMATION LOOP
    // -------------------------------------------------------------------------
    let animId = 0;
    let lastTime = performance.now();
    let crankAngle = 0;
    let lastStrokeLabel = '';
    const phases = ['INTAKE', 'COMPRESSION', 'POWER', 'EXHAUST'];

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Advance 720-degree 4-stroke cycle smoothly
      crankAngle = (crankAngle + dt * 4.4) % (Math.PI * 4);
      const twoPiAngle = crankAngle % (Math.PI * 2);

      // Crankpin coordinates in root space
      const pinX = Math.sin(crankAngle) * crankRadius;
      const pinY = crankCenterY + Math.cos(crankAngle) * crankRadius;

      // Rotate crankshaft & half-speed cam gear
      crankGroup.rotation.z = -crankAngle;
      camGear.rotation.z = -crankAngle * 0.5;

      // Exact slider-crank piston elevation
      const wristY = pinY + Math.sqrt(Math.max(0.01, rodLength * rodLength - pinX * pinX));
      pistonGroup.position.y = wristY + 0.08;

      // Orient connecting rod from pin to wrist pin
      conRodGroup.position.set(pinX, pinY, 0);
      conRodGroup.rotation.z = Math.atan2(pinX, wristY - pinY);

      // 4-stroke valve & spark events (0..4π)
      const strokeIdx = Math.floor(crankAngle / Math.PI) % 4;
      const strokeLabel = phases[strokeIdx];
      if (strokeLabel !== lastStrokeLabel) {
        lastStrokeLabel = strokeLabel;
        phaseCallbackRef.current?.(strokeLabel);
      }

      // Intake opens during stroke 0, Exhaust opens during stroke 3
      const intakeLift = strokeIdx === 0 ? Math.sin(twoPiAngle) * 0.14 : 0;
      const exhaustLift = strokeIdx === 3 ? Math.sin(twoPiAngle) * 0.14 : 0;
      intakeValve.position.y = 1.46 - intakeLift;
      exhaustValve.position.y = 1.46 - exhaustLift;

      // Spark ignition flash right at start of Power stroke (crankAngle around 2π)
      const distFromIgnition = Math.abs(crankAngle - Math.PI * 2);
      if (distFromIgnition < 0.48) {
        const intensity = 1 - distFromIgnition / 0.48;
        sparkCoreMat.opacity = Math.min(1, intensity * 1.2);
        sparkCore.scale.setScalar(0.8 + intensity * 0.9);
        flameRingMat.opacity = intensity * 0.65;
        flameRing.scale.setScalar(0.4 + (1 - intensity) * 1.0);
      } else {
        sparkCoreMat.opacity = 0;
        flameRingMat.opacity = 0;
      }

      // Smooth turntable rotation when not dragging
      if (!isDragging) {
        targetRotY += dt * 0.28;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.12;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.12;
      baseGroup.rotation.y -= dt * 0.12;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(handleResize)
      : null;
    if (resizeObserver) resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      disposables.forEach((d) => {
        if (d && typeof d.dispose === 'function') d.dispose();
      });
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [vehicleType]);

  if (webglUnavailable) {
    return <EngineBlueprintAnimation speed={0.025} />;
  }

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-label="Interactive 3D kinematic engine schematic"
    />
  );
}
