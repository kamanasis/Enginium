import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import EngineBlueprintAnimation from './EngineBlueprintAnimation';

/**
 * EngineSchematic3D - Enhanced Interactive WebGL 4-Stroke Engine Cutaway
 * Features:
 * - Dynamic RPM control (Idle -> Cruise -> Redline)
 * - Smooth Exploded Assembly view separation
 * - 4-stroke volumetric combustion chamber color shifts (Intake/Compression/Power/Exhaust)
 * - Articulated timing loop, cam sprocket, helical valve springs, intake & exhaust runners
 * - Drag-to-orbit + wheel zoom
 */
export default function EngineSchematic3D({
  vehicleType = 'Motorcycle',
  rpm = 1450,
  exploded = false,
  onPhaseChange,
}) {
  const hostRef = useRef(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const phaseCallbackRef = useRef(onPhaseChange);
  const rpmRef = useRef(rpm);
  const explodedRef = useRef(exploded);

  useEffect(() => {
    phaseCallbackRef.current = onPhaseChange;
  }, [onPhaseChange]);

  useEffect(() => {
    rpmRef.current = rpm;
  }, [rpm]);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

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

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.cursor = 'grab';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    let targetZoom = 7.9;
    camera.position.set(0.2, 0.7, targetZoom);
    camera.lookAt(0, 0.25, 0);

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xdbeafe, 0.72));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
    keyLight.position.set(4.5, 6.5, 5.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff2d4f, 1.8);
    rimLight.position.set(-5, 2.5, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 0.95, 16);
    fillLight.position.set(3.5, -1.5, 4.5);
    scene.add(fillLight);

    // Materials
    const matShell = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.2,
        roughness: 0.3,
        metalness: 0.65,
        depthWrite: false,
      }),
    );
    const matMetalDark = track(
      new THREE.MeshStandardMaterial({
        color: 0x1b2130,
        roughness: 0.3,
        metalness: 0.85,
      }),
    );
    const matMetalBright = track(
      new THREE.MeshStandardMaterial({
        color: 0xa3b3c6,
        roughness: 0.22,
        metalness: 0.9,
      }),
    );
    const matCrimson = track(
      new THREE.MeshStandardMaterial({
        color: 0xff2247,
        emissive: 0x9f1239,
        emissiveIntensity: 0.65,
        roughness: 0.24,
        metalness: 0.72,
      }),
    );
    const matCeramic = track(
      new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.35,
        metalness: 0.15,
      }),
    );

    const edgeSteel = track(
      new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.55 }),
    );
    const edgeBright = track(
      new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.78 }),
    );
    const edgeCrimson = track(
      new THREE.LineBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.92 }),
    );
    const edgeCyan = track(
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 }),
    );

    const addEdges = (mesh, geo, edgeMat = edgeSteel) => {
      const eGeo = track(new THREE.EdgesGeometry(geo, 22));
      const lines = new THREE.LineSegments(eGeo, edgeMat);
      mesh.add(lines);
      return lines;
    };

    const root = new THREE.Group();
    root.position.y = -0.18;
    root.rotation.y = -0.46;
    root.rotation.x = 0.16;
    scene.add(root);

    // -------------------------------------------------------------------------
    // 1. CALIBRATION BASEPLATE, LASER STROKE AXIS & TDC/BDC MARKERS
    // -------------------------------------------------------------------------
    const baseGroup = new THREE.Group();
    baseGroup.position.y = -1.85;
    root.add(baseGroup);

    const outerRing = new THREE.Mesh(
      track(new THREE.RingGeometry(2.15, 2.21, 72)),
      track(new THREE.MeshBasicMaterial({ color: 0xff2d4f, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })),
    );
    outerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(outerRing);

    const innerRing = new THREE.Mesh(
      track(new THREE.RingGeometry(1.42, 1.46, 64)),
      track(new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.25 })),
    );
    innerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(innerRing);

    const tickPts = [];
    for (let i = 0; i < 48; i += 1) {
      const a = (i / 48) * Math.PI * 2;
      const r0 = i % 4 === 0 ? 1.9 : 2.04;
      tickPts.push(
        new THREE.Vector3(Math.cos(a) * r0, 0, Math.sin(a) * r0),
        new THREE.Vector3(Math.cos(a) * 2.14, 0, Math.sin(a) * 2.14),
      );
    }
    baseGroup.add(new THREE.LineSegments(track(new THREE.BufferGeometry().setFromPoints(tickPts)), edgeSteel));

    // Vertical laser centerline axis
    const axisGeo = track(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -1.75, 0),
      new THREE.Vector3(0, 2.65, 0),
    ]));
    root.add(new THREE.Line(axisGeo, track(new THREE.LineBasicMaterial({ color: 0xff2d4f, transparent: true, opacity: 0.18 }))));

    // -------------------------------------------------------------------------
    // 2. EXPLODABLE LAYER GROUPS
    // -------------------------------------------------------------------------
    const crankcaseLayer = new THREE.Group();
    const barrelLayer = new THREE.Group();
    const headLayer = new THREE.Group();
    const plugLayer = new THREE.Group();
    root.add(crankcaseLayer, barrelLayer, headLayer, plugLayer);

    // Crankcase housing
    const crankcaseGeo = track(new THREE.CylinderGeometry(1.04, 1.04, 0.78, 32, 1, true));
    const crankcase = new THREE.Mesh(crankcaseGeo, matShell);
    crankcase.rotation.z = Math.PI / 2;
    crankcase.position.y = -0.95;
    addEdges(crankcase, crankcaseGeo, edgeSteel);
    crankcaseLayer.add(crankcase);

    // Cylinder barrel & cooling fins
    const cylinderGeo = track(new THREE.CylinderGeometry(0.68, 0.68, 1.65, 32, 1, true));
    const cylinder = new THREE.Mesh(cylinderGeo, matShell);
    cylinder.position.y = 0.42;
    addEdges(cylinder, cylinderGeo, edgeBright);
    barrelLayer.add(cylinder);

    const finCount = vehicleType?.toLowerCase() === 'scooter' ? 4 : 7;
    const finGeo = track(new THREE.BoxGeometry(1.78, 0.036, 1.78));
    for (let f = 0; f < finCount; f += 1) {
      const fin = new THREE.Mesh(finGeo, matShell);
      fin.position.y = -0.18 + f * 0.2;
      addEdges(fin, finGeo, f === finCount - 1 ? edgeCrimson : edgeSteel);
      barrelLayer.add(fin);
    }

    // Cylinder Head + Intake & Exhaust Runners
    const headGeo = track(new THREE.BoxGeometry(1.72, 0.54, 1.58));
    const headMesh = new THREE.Mesh(headGeo, matShell);
    headMesh.position.y = 1.54;
    addEdges(headMesh, headGeo, edgeBright);
    headLayer.add(headMesh);

    // Intake Runner (Left cool port)
    const intakeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.34, 1.48, 0),
      new THREE.Vector3(-0.95, 1.56, 0),
      new THREE.Vector3(-1.45, 1.42, -0.18),
    ]);
    const intakeTubeGeo = track(new THREE.TubeGeometry(intakeCurve, 20, 0.16, 14, false));
    const intakeRunner = new THREE.Mesh(intakeTubeGeo, matShell);
    const intakeEdges = addEdges(intakeRunner, intakeTubeGeo, edgeCyan);
    headLayer.add(intakeRunner);

    // Swept Exhaust Header Pipe (Right hot port)
    const exhaustCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.34, 1.48, 0),
      new THREE.Vector3(1.05, 1.42, 0.12),
      new THREE.Vector3(1.42, 0.85, 0.24),
      new THREE.Vector3(1.52, -0.45, 0.28),
    ]);
    const exhaustTubeGeo = track(new THREE.TubeGeometry(exhaustCurve, 24, 0.17, 14, false));
    const exhaustRunner = new THREE.Mesh(exhaustTubeGeo, matShell);
    const exhaustEdges = addEdges(exhaustRunner, exhaustTubeGeo, edgeCrimson);
    headLayer.add(exhaustRunner);

    // -------------------------------------------------------------------------
    // 3. TIMING CHAIN LOOP & SPROCKETS (Crank -> Cam)
    // -------------------------------------------------------------------------
    const timingPts = [];
    const crankSprocketR = 0.24;
    const camSprocketR = 0.36;
    const crankY = -0.95;
    const camY = 1.62;
    const chainZ = 0.66;
    for (let i = 0; i <= 20; i += 1) {
      const a = Math.PI + (i / 20) * Math.PI;
      timingPts.push(new THREE.Vector3(Math.cos(a) * crankSprocketR, crankY + Math.sin(a) * crankSprocketR, chainZ));
    }
    for (let i = 0; i <= 20; i += 1) {
      const a = (i / 20) * Math.PI;
      timingPts.push(new THREE.Vector3(Math.cos(a) * camSprocketR, camY + Math.sin(a) * camSprocketR, chainZ));
    }
    timingPts.push(timingPts[0].clone());
    const timingLoopGeo = track(new THREE.BufferGeometry().setFromPoints(timingPts));
    const timingLoopMat = track(new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.72 }));
    barrelLayer.add(new THREE.Line(timingLoopGeo, timingLoopMat));

    // -------------------------------------------------------------------------
    // 4. CRANKSHAFT, COUNTERWEIGHTS, FLYWHEEL & CON-ROD
    // -------------------------------------------------------------------------
    const crankRadius = 0.44;
    const rodLength = 1.25;

    const crankGroup = new THREE.Group();
    crankGroup.position.set(0, crankY, 0);
    crankcaseLayer.add(crankGroup);

    const webGeo = track(new THREE.CylinderGeometry(0.65, 0.65, 0.14, 24, 1, false, -Math.PI * 0.55, Math.PI * 1.1));
    [-0.22, 0.22].forEach((zOffset) => {
      const web = new THREE.Mesh(webGeo, matMetalDark);
      web.rotation.x = Math.PI / 2;
      web.position.z = zOffset;
      addEdges(web, webGeo, edgeBright);
      crankGroup.add(web);
    });

    const axleGeo = track(new THREE.CylinderGeometry(0.11, 0.11, 1.68, 16));
    const axle = new THREE.Mesh(axleGeo, matMetalBright);
    axle.rotation.x = Math.PI / 2;
    addEdges(axle, axleGeo, edgeSteel);
    crankGroup.add(axle);

    const flywheelGeo = track(new THREE.CylinderGeometry(0.74, 0.74, 0.12, 36));
    const flywheel = new THREE.Mesh(flywheelGeo, matMetalDark);
    flywheel.rotation.x = Math.PI / 2;
    flywheel.position.z = -0.66;
    addEdges(flywheel, flywheelGeo, edgeBright);
    crankGroup.add(flywheel);

    // Primary Timing Sprocket on Crankshaft front (+Z)
    const primarySprocketGeo = track(new THREE.CylinderGeometry(crankSprocketR, crankSprocketR, 0.08, 16));
    const primarySprocket = new THREE.Mesh(primarySprocketGeo, matMetalDark);
    primarySprocket.rotation.x = Math.PI / 2;
    primarySprocket.position.z = chainZ;
    addEdges(primarySprocket, primarySprocketGeo, edgeCrimson);
    crankGroup.add(primarySprocket);

    const crankPin = new THREE.Mesh(track(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 16)), matCrimson);
    crankPin.rotation.x = Math.PI / 2;
    crankPin.position.set(0, crankRadius, 0);
    crankGroup.add(crankPin);

    const conRodGroup = new THREE.Group();
    root.add(conRodGroup);
    const rodShaftGeo = track(new THREE.BoxGeometry(0.14, rodLength, 0.12));
    const rodShaft = new THREE.Mesh(rodShaftGeo, matMetalBright);
    rodShaft.position.y = rodLength / 2;
    addEdges(rodShaft, rodShaftGeo, edgeBright);
    conRodGroup.add(rodShaft);

    // -------------------------------------------------------------------------
    // 5. RECIPROCATING PISTON ASSEMBLY
    // -------------------------------------------------------------------------
    const pistonGroup = new THREE.Group();
    root.add(pistonGroup);

    const pistonGeo = track(new THREE.CylinderGeometry(0.61, 0.61, 0.56, 32));
    const pistonMesh = new THREE.Mesh(pistonGeo, matMetalDark);
    addEdges(pistonMesh, pistonGeo, edgeBright);
    pistonGroup.add(pistonMesh);

    const ringGeo = track(new THREE.TorusGeometry(0.62, 0.022, 8, 36));
    [0.18, 0.08].forEach((ry) => {
      const compRing = new THREE.Mesh(ringGeo, matCrimson);
      compRing.rotation.x = Math.PI / 2;
      compRing.position.y = ry;
      pistonGroup.add(compRing);
    });

    const wristPin = new THREE.Mesh(track(new THREE.CylinderGeometry(0.085, 0.085, 1.18, 16)), matMetalBright);
    wristPin.rotation.x = Math.PI / 2;
    wristPin.position.y = -0.08;
    pistonGroup.add(wristPin);

    // -------------------------------------------------------------------------
    // 6. OVERHEAD CAM SPROCKET, VALVES, VALVE SPRINGS & SPARK PLUG
    // -------------------------------------------------------------------------
    const camGearGeo = track(new THREE.CylinderGeometry(camSprocketR, camSprocketR, 0.09, 24));
    const camGear = new THREE.Mesh(camGearGeo, matMetalDark);
    camGear.rotation.x = Math.PI / 2;
    camGear.position.set(0, camY, chainZ);
    addEdges(camGear, camGearGeo, edgeCrimson);
    headLayer.add(camGear);

    // Valves + Coiled Spring Visuals
    const valveGeo = track(new THREE.CylinderGeometry(0.035, 0.18, 0.44, 16));
    const springRingGeo = track(new THREE.TorusGeometry(0.09, 0.015, 6, 18));

    const buildValveAssembly = (xPos, tilt, edgeMat) => {
      const grp = new THREE.Group();
      grp.position.set(xPos, 1.48, 0);
      grp.rotation.z = tilt;
      const valve = new THREE.Mesh(valveGeo, matMetalBright);
      addEdges(valve, valveGeo, edgeMat);
      grp.add(valve);

      const springGrp = new THREE.Group();
      for (let s = 0; s < 4; s += 1) {
        const coil = new THREE.Mesh(springRingGeo, matMetalBright);
        coil.rotation.x = Math.PI / 2;
        coil.position.y = 0.06 + s * 0.055;
        springGrp.add(coil);
      }
      grp.add(springGrp);
      headLayer.add(grp);
      return { grp, valve, springGrp };
    };

    const intakeAsm = buildValveAssembly(-0.29, 0.22, edgeCyan);
    const exhaustAsm = buildValveAssembly(0.29, -0.22, edgeCrimson);

    // Spark Plug (Hex body + Ceramic insulator + Terminal)
    const plugHexGeo = track(new THREE.CylinderGeometry(0.095, 0.095, 0.28, 6));
    const sparkPlugHex = new THREE.Mesh(plugHexGeo, matMetalBright);
    sparkPlugHex.position.set(0, 1.88, 0);
    addEdges(sparkPlugHex, plugHexGeo, edgeCrimson);
    plugLayer.add(sparkPlugHex);

    const plugCerGeo = track(new THREE.CylinderGeometry(0.065, 0.075, 0.34, 12));
    const sparkPlugCer = new THREE.Mesh(plugCerGeo, matCeramic);
    sparkPlugCer.position.set(0, 2.16, 0);
    plugLayer.add(sparkPlugCer);

    // Volumetric Combustion Chamber Cylinder (dynamic color & height between piston crown & head)
    const chamberGeo = track(new THREE.CylinderGeometry(0.58, 0.58, 1, 28));
    const chamberMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xff2d4f,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    );
    const chamberMesh = new THREE.Mesh(chamberGeo, chamberMat);
    root.add(chamberMesh);

    const sparkCoreMat = track(new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0 }));
    const sparkCore = new THREE.Mesh(track(new THREE.SphereGeometry(0.13, 16, 16)), sparkCoreMat);
    sparkCore.position.set(0, 1.24, 0);
    root.add(sparkCore);

    const flameRingMat = track(
      new THREE.MeshBasicMaterial({ color: 0xff2d4f, side: THREE.DoubleSide, transparent: true, opacity: 0 }),
    );
    const flameRing = new THREE.Mesh(track(new THREE.RingGeometry(0.08, 0.58, 32)), flameRingMat);
    flameRing.rotation.x = -Math.PI / 2;
    flameRing.position.set(0, 1.18, 0);
    root.add(flameRing);

    // -------------------------------------------------------------------------
    // 7. INTERACTION (ORBIT DRAG + SCROLL ZOOM)
    // -------------------------------------------------------------------------
    let isDragging = false;
    let lastPointer = { x: 0, y: 0 };
    let targetRotY = -0.46;
    let targetRotX = 0.16;

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
      targetRotX = Math.max(-0.55, Math.min(0.68, targetRotX + dy * 0.006));
      lastPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetZoom = Math.max(5.8, Math.min(10.5, targetZoom + e.deltaY * 0.004));
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // -------------------------------------------------------------------------
    // 8. ANIMATION LOOP (Dynamic RPM, Explode LERP, 4-Stroke Thermodynamics)
    // -------------------------------------------------------------------------
    let animId = 0;
    let lastTime = performance.now();
    let crankAngle = 0;
    let explodeFactor = 0;
    let lastStrokeLabel = '';
    const phases = ['INTAKE', 'COMPRESSION', 'POWER', 'EXHAUST'];
    const cIntake = new THREE.Color(0x38bdf8);
    const cCompress = new THREE.Color(0xf59e0b);
    const cPower = new THREE.Color(0xff2d4f);
    const cExhaust = new THREE.Color(0xf97316);

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Scale angular velocity visually from live RPM slider (smoothly capped for eye clarity)
      const currentRpm = rpmRef.current || 1450;
      const visualSpeed = 2.6 + (currentRpm / 8000) * 11.5;
      crankAngle = (crankAngle + dt * visualSpeed) % (Math.PI * 4);
      const twoPiAngle = crankAngle % (Math.PI * 2);

      // Smooth Explode transition
      const targetExplode = explodedRef.current ? 1 : 0;
      explodeFactor += (targetExplode - explodeFactor) * 0.1;

      crankcaseLayer.position.y = -explodeFactor * 0.42;
      barrelLayer.position.y = explodeFactor * 0.18;
      headLayer.position.y = explodeFactor * 0.72;
      plugLayer.position.y = explodeFactor * 1.15;

      // Slider-crank kinematics
      const pinX = Math.sin(crankAngle) * crankRadius;
      const pinY = crankY + Math.cos(crankAngle) * crankRadius;

      crankGroup.rotation.z = -crankAngle;
      camGear.rotation.z = -crankAngle * 0.5;

      const wristY = pinY + Math.sqrt(Math.max(0.01, rodLength * rodLength - pinX * pinX));
      pistonGroup.position.y = wristY + 0.08;

      conRodGroup.position.set(pinX, pinY, 0);
      conRodGroup.rotation.z = Math.atan2(pinX, wristY - pinY);

      // Stroke Phase & Volumetric Chamber Dynamics
      const strokeIdx = Math.floor(crankAngle / Math.PI) % 4;
      const strokeLabel = phases[strokeIdx];
      if (strokeLabel !== lastStrokeLabel) {
        lastStrokeLabel = strokeLabel;
        phaseCallbackRef.current?.(strokeLabel);
      }

      const pistonTopY = pistonGroup.position.y + 0.28;
      const headFloorY = 1.26 + explodeFactor * 0.72;
      const chamberH = Math.max(0.06, headFloorY - pistonTopY);
      chamberMesh.position.y = pistonTopY + chamberH * 0.5;
      chamberMesh.scale.y = chamberH;

      // Valve articulation & runner pulse
      const intakeLift = strokeIdx === 0 ? Math.sin(twoPiAngle) * 0.14 : 0;
      const exhaustLift = strokeIdx === 3 ? Math.sin(twoPiAngle) * 0.14 : 0;

      intakeAsm.valve.position.y = -intakeLift;
      intakeAsm.springGrp.scale.y = 1 - intakeLift * 1.8;
      exhaustAsm.valve.position.y = -exhaustLift;
      exhaustAsm.springGrp.scale.y = 1 - exhaustLift * 1.8;

      intakeEdges.opacity = strokeIdx === 0 ? 0.95 : 0.35;
      exhaustEdges.opacity = strokeIdx === 3 ? 0.98 : 0.45;

      if (strokeIdx === 0) {
        chamberMat.color.copy(cIntake);
        chamberMat.opacity = 0.12 + Math.sin(twoPiAngle) * 0.12;
      } else if (strokeIdx === 1) {
        chamberMat.color.copy(cCompress);
        chamberMat.opacity = 0.1 + ((crankAngle - Math.PI) / Math.PI) * 0.22;
      } else if (strokeIdx === 2) {
        chamberMat.color.copy(cPower);
        chamberMat.opacity = 0.34 - ((crankAngle - Math.PI * 2) / Math.PI) * 0.2;
      } else {
        chamberMat.color.copy(cExhaust);
        chamberMat.opacity = 0.18 * (1 - (crankAngle - Math.PI * 3) / Math.PI);
      }

      // Ignition spark at TDC Power transition
      const distFromIgnition = Math.abs(crankAngle - Math.PI * 2);
      if (distFromIgnition < 0.45) {
        const intensity = 1 - distFromIgnition / 0.45;
        sparkCoreMat.opacity = Math.min(1, intensity * 1.3);
        sparkCore.scale.setScalar(0.8 + intensity * 1.0);
        flameRingMat.opacity = intensity * 0.7;
        flameRing.scale.setScalar(0.45 + (1 - intensity) * 0.9);
      } else {
        sparkCoreMat.opacity = 0;
        flameRingMat.opacity = 0;
      }

      // Smooth orbit & zoom interpolation
      if (!isDragging) {
        targetRotY += dt * 0.25;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.1;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.1;
      camera.position.z += (targetZoom - camera.position.z) * 0.12;
      baseGroup.rotation.y -= dt * 0.12;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 400;
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
      renderer.domElement.removeEventListener('wheel', onWheel);
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
      aria-label="Interactive 3D kinematic engine cutaway"
    />
  );
}
