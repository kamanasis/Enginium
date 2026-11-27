import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import EngineBlueprintAnimation from './EngineBlueprintAnimation';

/**
 * EngineSchematic3D - Authentic SOHC 4-Stroke Motorcycle Engine Cutaway
 * Inspired by real air-cooled single-cylinder commuter & sport engines:
 * - Sculpted pork-chop counterweight crankshaft webs + crankpin
 * - Tapered I-beam connecting rod with big-end & small-end bosses
 * - Stepped cutaway piston with valve-relief pockets & dual compression + oil rings
 * - Copper-wound stator magneto coils & slotted wet clutch basket assembly
 * - Half-speed SOHC camshaft with eccentric lobes + pivoting rocker arms
 * - Helical valve springs, intake carburetor bellmouth & swept exhaust header
 * - 4-rib ceramic spark plug + real-time 4-stroke volumetric combustion glow
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
    let targetZoom = 8.15;
    camera.position.set(0.25, 0.72, targetZoom);
    camera.lookAt(0, 0.22, 0);

    // Three-point studio lighting
    scene.add(new THREE.AmbientLight(0xdbeafe, 0.75));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(4.5, 7, 5.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff2d4f, 1.85);
    rimLight.position.set(-5.5, 2.5, -4.5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 0.9, 16);
    fillLight.position.set(3.8, -1.5, 4.2);
    scene.add(fillLight);

    // Materials
    const matShell = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.18,
        roughness: 0.28,
        metalness: 0.65,
        depthWrite: false,
      }),
    );
    const matCastAlloy = track(
      new THREE.MeshStandardMaterial({
        color: 0x262e40,
        roughness: 0.42,
        metalness: 0.78,
      }),
    );
    const matForgedSteel = track(
      new THREE.MeshStandardMaterial({
        color: 0xa3b3c6,
        roughness: 0.22,
        metalness: 0.92,
      }),
    );
    const matDarkSteel = track(
      new THREE.MeshStandardMaterial({
        color: 0x161b26,
        roughness: 0.34,
        metalness: 0.86,
      }),
    );
    const matCopperCoil = track(
      new THREE.MeshStandardMaterial({
        color: 0xd97706,
        emissive: 0x78350f,
        emissiveIntensity: 0.28,
        roughness: 0.32,
        metalness: 0.85,
      }),
    );
    const matCrimson = track(
      new THREE.MeshStandardMaterial({
        color: 0xff2247,
        emissive: 0x9f1239,
        emissiveIntensity: 0.6,
        roughness: 0.24,
        metalness: 0.72,
      }),
    );
    const matCeramic = track(
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.3,
        metalness: 0.1,
      }),
    );

    const edgeSteel = track(
      new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.52 }),
    );
    const edgeBright = track(
      new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.76 }),
    );
    const edgeCrimson = track(
      new THREE.LineBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.9 }),
    );
    const edgeCyan = track(
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72 }),
    );

    const addEdges = (mesh, geo, edgeMat = edgeSteel) => {
      const eGeo = track(new THREE.EdgesGeometry(geo, 22));
      const lines = new THREE.LineSegments(eGeo, edgeMat);
      mesh.add(lines);
      return lines;
    };

    const root = new THREE.Group();
    root.position.y = -0.2;
    root.rotation.y = -0.48;
    root.rotation.x = 0.16;
    scene.add(root);

    // -------------------------------------------------------------------------
    // 1. CALIBRATION BASEPLATE & STROKE AXIS
    // -------------------------------------------------------------------------
    const baseGroup = new THREE.Group();
    baseGroup.position.y = -1.92;
    root.add(baseGroup);

    const outerRing = new THREE.Mesh(
      track(new THREE.RingGeometry(2.2, 2.26, 72)),
      track(new THREE.MeshBasicMaterial({ color: 0xff2d4f, side: THREE.DoubleSide, transparent: true, opacity: 0.38 })),
    );
    outerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(outerRing);

    const innerRing = new THREE.Mesh(
      track(new THREE.RingGeometry(1.48, 1.52, 64)),
      track(new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.25 })),
    );
    innerRing.rotation.x = -Math.PI / 2;
    baseGroup.add(innerRing);

    const tickPts = [];
    for (let i = 0; i < 48; i += 1) {
      const a = (i / 48) * Math.PI * 2;
      const r0 = i % 4 === 0 ? 1.96 : 2.09;
      tickPts.push(
        new THREE.Vector3(Math.cos(a) * r0, 0, Math.sin(a) * r0),
        new THREE.Vector3(Math.cos(a) * 2.19, 0, Math.sin(a) * 2.19),
      );
    }
    baseGroup.add(new THREE.LineSegments(track(new THREE.BufferGeometry().setFromPoints(tickPts)), edgeSteel));

    const axisGeo = track(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0, 2.75, 0),
    ]));
    root.add(new THREE.Line(axisGeo, track(new THREE.LineBasicMaterial({ color: 0xff2d4f, transparent: true, opacity: 0.18 }))));

    // -------------------------------------------------------------------------
    // 2. EXPLODABLE LAYERS
    // -------------------------------------------------------------------------
    const crankcaseLayer = new THREE.Group();
    const barrelLayer = new THREE.Group();
    const headLayer = new THREE.Group();
    const plugLayer = new THREE.Group();
    root.add(crankcaseLayer, barrelLayer, headLayer, plugLayer);

    // Lower Die-Cast Crankcase Cutaway + Sump Fins
    const crankcaseGeo = track(new THREE.CylinderGeometry(1.06, 1.06, 0.86, 32, 1, true));
    const crankcase = new THREE.Mesh(crankcaseGeo, matShell);
    crankcase.rotation.z = Math.PI / 2;
    crankcase.position.y = -0.95;
    addEdges(crankcase, crankcaseGeo, edgeSteel);
    crankcaseLayer.add(crankcase);

    // Oil Sump Base Pan with Cooling Ribs
    const sumpGeo = track(new THREE.BoxGeometry(1.5, 0.22, 1.38));
    const sump = new THREE.Mesh(sumpGeo, matShell);
    sump.position.y = -1.66;
    addEdges(sump, sumpGeo, edgeSteel);
    crankcaseLayer.add(sump);

    // Slotted Wet Clutch / CVT Variator Basket (offset beside crank)
    const isScooter = vehicleType?.toLowerCase() === 'scooter';
    const clutchGroup = new THREE.Group();
    clutchGroup.position.set(1.08, -1.02, 0.34);
    crankcaseLayer.add(clutchGroup);

    const basketGeo = track(new THREE.CylinderGeometry(0.46, 0.46, 0.28, 12, 1, true));
    const basket = new THREE.Mesh(basketGeo, matCastAlloy);
    basket.rotation.x = Math.PI / 2;
    addEdges(basket, basketGeo, edgeBright);
    clutchGroup.add(basket);

    const clutchPlateGeo = track(new THREE.CylinderGeometry(0.39, 0.39, 0.22, 24));
    const clutchPlate = new THREE.Mesh(clutchPlateGeo, matCrimson);
    clutchPlate.rotation.x = Math.PI / 2;
    addEdges(clutchPlate, clutchPlateGeo, edgeCrimson);
    clutchGroup.add(clutchPlate);

    // Cylinder Liner & Layered Cooling Fins
    const cylinderGeo = track(new THREE.CylinderGeometry(0.68, 0.68, 1.65, 32, 1, true));
    const cylinder = new THREE.Mesh(cylinderGeo, matShell);
    cylinder.position.y = 0.42;
    addEdges(cylinder, cylinderGeo, edgeBright);
    barrelLayer.add(cylinder);

    const finCount = isScooter ? 4 : 7;
    const finGeo = track(new THREE.BoxGeometry(1.82, 0.032, 1.76));
    for (let f = 0; f < finCount; f += 1) {
      const fin = new THREE.Mesh(finGeo, matShell);
      fin.position.y = -0.18 + f * 0.2;
      addEdges(fin, finGeo, f === finCount - 1 ? edgeCrimson : edgeSteel);
      barrelLayer.add(fin);
    }

    // Finned Cylinder Head & Valve Rocker Cover
    const headGeo = track(new THREE.BoxGeometry(1.76, 0.54, 1.6));
    const headMesh = new THREE.Mesh(headGeo, matShell);
    headMesh.position.y = 1.54;
    addEdges(headMesh, headGeo, edgeBright);
    headLayer.add(headMesh);

    const rockerCoverGeo = track(new THREE.BoxGeometry(1.56, 0.24, 1.38));
    const rockerCover = new THREE.Mesh(rockerCoverGeo, matShell);
    rockerCover.position.y = 1.94;
    addEdges(rockerCover, rockerCoverGeo, edgeSteel);
    headLayer.add(rockerCover);

    // Left Intake Port + Sculpted Carburetor / Throttle Venturi Bellmouth
    const intakeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.34, 1.48, 0),
      new THREE.Vector3(-0.96, 1.56, 0),
      new THREE.Vector3(-1.42, 1.48, -0.14),
    ]);
    const intakeTubeGeo = track(new THREE.TubeGeometry(intakeCurve, 20, 0.15, 16, false));
    const intakeRunner = new THREE.Mesh(intakeTubeGeo, matShell);
    const intakeEdges = addEdges(intakeRunner, intakeTubeGeo, edgeCyan);
    headLayer.add(intakeRunner);

    // Venturi Velocity Trumpet (LatheGeometry)
    const bellPts = [
      new THREE.Vector2(0.14, 0),
      new THREE.Vector2(0.16, 0.18),
      new THREE.Vector2(0.26, 0.34),
      new THREE.Vector2(0.32, 0.38),
    ];
    const bellGeo = track(new THREE.LatheGeometry(bellPts, 24));
    const bellMesh = new THREE.Mesh(bellGeo, matCastAlloy);
    bellMesh.position.set(-1.42, 1.48, -0.14);
    bellMesh.rotation.z = Math.PI / 2;
    addEdges(bellMesh, bellGeo, edgeCyan);
    headLayer.add(bellMesh);

    // Swept Exhaust Header Pipe + Copper Exhaust Flange Ring
    const exhaustFlange = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.21, 0.035, 10, 24)),
      matCopperCoil,
    );
    exhaustFlange.position.set(0.86, 1.45, 0.06);
    exhaustFlange.rotation.y = Math.PI / 2;
    headLayer.add(exhaustFlange);

    const exhaustCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.34, 1.48, 0),
      new THREE.Vector3(1.06, 1.44, 0.1),
      new THREE.Vector3(1.48, 0.85, 0.22),
      new THREE.Vector3(1.56, -0.52, 0.26),
    ]);
    const exhaustTubeGeo = track(new THREE.TubeGeometry(exhaustCurve, 26, 0.17, 16, false));
    const exhaustRunner = new THREE.Mesh(exhaustTubeGeo, matShell);
    const exhaustEdges = addEdges(exhaustRunner, exhaustTubeGeo, edgeCrimson);
    headLayer.add(exhaustRunner);

    // -------------------------------------------------------------------------
    // 3. TIMING CHAIN LOOP & CURVED TENSIONER GUIDE BLADE
    // -------------------------------------------------------------------------
    const timingPts = [];
    const crankSprocketR = 0.24;
    const camSprocketR = 0.36;
    const crankY = -0.95;
    const camY = 1.64;
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
    barrelLayer.add(new THREE.Line(timingLoopGeo, track(new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.78 }))));

    // Curved Nylon Timing Chain Tensioner Guide
    const tensionerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.34, -0.6, chainZ),
      new THREE.Vector3(-0.42, 0.35, chainZ),
      new THREE.Vector3(-0.4, 1.32, chainZ),
    ]);
    const tensionerGeo = track(new THREE.TubeGeometry(tensionerCurve, 14, 0.032, 8, false));
    const tensionerMesh = new THREE.Mesh(tensionerGeo, matCrimson);
    barrelLayer.add(tensionerMesh);

    // -------------------------------------------------------------------------
    // 4. FORGED PORK-CHOP CRANKSHAFT, COPPER STATOR MAGNETO & I-BEAM ROD
    // -------------------------------------------------------------------------
    const crankRadius = 0.44;
    const rodLength = 1.25;

    const crankGroup = new THREE.Group();
    crankGroup.position.set(0, crankY, 0);
    crankcaseLayer.add(crankGroup);

    // Teardrop / Pork-Chop Forged Counterweight Webs
    const webShape = new THREE.Shape();
    webShape.moveTo(-0.18, 0.48);
    webShape.quadraticCurveTo(0, 0.62, 0.18, 0.48);
    webShape.lineTo(0.58, -0.15);
    webShape.absarc(0, -0.15, 0.62, 0, Math.PI, true);
    webShape.lineTo(-0.18, 0.48);

    const webGeo = track(new THREE.ExtrudeGeometry(webShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    }));
    webGeo.translate(0, 0, -0.06);

    [-0.22, 0.22].forEach((zOffset) => {
      const web = new THREE.Mesh(webGeo, matDarkSteel);
      web.position.z = zOffset;
      addEdges(web, webGeo, edgeBright);
      crankGroup.add(web);
    });

    const axle = new THREE.Mesh(track(new THREE.CylinderGeometry(0.11, 0.11, 1.72, 16)), matForgedSteel);
    axle.rotation.x = Math.PI / 2;
    addEdges(axle, axle.geometry, edgeSteel);
    crankGroup.add(axle);

    // Left-side Stator Magneto Rotor Cup & 8 Copper Stator Windings
    const magnetoCupGeo = track(new THREE.CylinderGeometry(0.76, 0.76, 0.18, 32, 1, true));
    const magnetoCup = new THREE.Mesh(magnetoCupGeo, matDarkSteel);
    magnetoCup.rotation.x = Math.PI / 2;
    magnetoCup.position.z = -0.68;
    addEdges(magnetoCup, magnetoCupGeo, edgeBright);
    crankGroup.add(magnetoCup);

    const statorGroup = new THREE.Group();
    statorGroup.position.set(0, crankY, -0.66);
    crankcaseLayer.add(statorGroup);
    const coilGeo = track(new THREE.BoxGeometry(0.15, 0.22, 0.12));
    for (let c = 0; c < 8; c += 1) {
      const a = (c / 8) * Math.PI * 2;
      const coil = new THREE.Mesh(coilGeo, matCopperCoil);
      coil.position.set(Math.cos(a) * 0.46, Math.sin(a) * 0.46, 0);
      coil.rotation.z = a - Math.PI / 2;
      statorGroup.add(coil);
    }

    // Primary Drive Gear & Timing Sprocket
    const primaryGearGeo = track(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 16));
    const primaryGear = new THREE.Mesh(primaryGearGeo, matForgedSteel);
    primaryGear.rotation.x = Math.PI / 2;
    primaryGear.position.z = 0.42;
    addEdges(primaryGear, primaryGearGeo, edgeSteel);
    crankGroup.add(primaryGear);

    const primarySprocketGeo = track(new THREE.CylinderGeometry(crankSprocketR, crankSprocketR, 0.08, 16));
    const primarySprocket = new THREE.Mesh(primarySprocketGeo, matDarkSteel);
    primarySprocket.rotation.x = Math.PI / 2;
    primarySprocket.position.z = chainZ;
    addEdges(primarySprocket, primarySprocketGeo, edgeCrimson);
    crankGroup.add(primarySprocket);

    const crankPin = new THREE.Mesh(track(new THREE.CylinderGeometry(0.095, 0.095, 0.44, 16)), matCrimson);
    crankPin.rotation.x = Math.PI / 2;
    crankPin.position.set(0, crankRadius, 0);
    crankGroup.add(crankPin);

    // Tapered I-Beam Connecting Rod
    const conRodGroup = new THREE.Group();
    root.add(conRodGroup);

    const bigEndGeo = track(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 20));
    const bigEnd = new THREE.Mesh(bigEndGeo, matForgedSteel);
    bigEnd.rotation.x = Math.PI / 2;
    addEdges(bigEnd, bigEndGeo, edgeBright);
    conRodGroup.add(bigEnd);

    const smallEndGeo = track(new THREE.CylinderGeometry(0.13, 0.13, 0.14, 18));
    const smallEnd = new THREE.Mesh(smallEndGeo, matForgedSteel);
    smallEnd.rotation.x = Math.PI / 2;
    smallEnd.position.y = rodLength;
    addEdges(smallEnd, smallEndGeo, edgeBright);
    conRodGroup.add(smallEnd);

    const rodShape = new THREE.Shape();
    rodShape.moveTo(-0.11, 0.12);
    rodShape.lineTo(0.11, 0.12);
    rodShape.lineTo(0.065, rodLength - 0.1);
    rodShape.lineTo(-0.065, rodLength - 0.1);
    rodShape.closePath();

    const rodBeamGeo = track(new THREE.ExtrudeGeometry(rodShape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015 }));
    rodBeamGeo.translate(0, 0, -0.045);
    const rodBeam = new THREE.Mesh(rodBeamGeo, matForgedSteel);
    addEdges(rodBeam, rodBeamGeo, edgeBright);
    conRodGroup.add(rodBeam);

    // -------------------------------------------------------------------------
    // 5. SCULPTED PISTON WITH CROWN, RINGS & OIL SCRAPER
    // -------------------------------------------------------------------------
    const pistonGroup = new THREE.Group();
    root.add(pistonGroup);

    const pistonCrownGeo = track(new THREE.CylinderGeometry(0.61, 0.61, 0.44, 32));
    const pistonCrown = new THREE.Mesh(pistonCrownGeo, matDarkSteel);
    pistonCrown.position.y = 0.06;
    addEdges(pistonCrown, pistonCrownGeo, edgeBright);
    pistonGroup.add(pistonCrown);

    // Lower cutaway piston skirt
    const skirtGeo = track(new THREE.CylinderGeometry(0.6, 0.6, 0.24, 28, 1, true, -Math.PI * 0.35, Math.PI * 0.7));
    const skirtFront = new THREE.Mesh(skirtGeo, matCastAlloy);
    skirtFront.position.y = -0.22;
    addEdges(skirtFront, skirtGeo, edgeSteel);
    pistonGroup.add(skirtFront);

    const skirtBack = new THREE.Mesh(skirtGeo, matCastAlloy);
    skirtBack.rotation.y = Math.PI;
    skirtBack.position.y = -0.22;
    addEdges(skirtBack, skirtGeo, edgeSteel);
    pistonGroup.add(skirtBack);

    // 2 Compression Rings + 1 Oil Control Ring
    const ringGeo = track(new THREE.TorusGeometry(0.62, 0.019, 8, 36));
    [0.2, 0.11, 0.02].forEach((ry, idx) => {
      const compRing = new THREE.Mesh(ringGeo, idx === 2 ? matCopperCoil : matCrimson);
      compRing.rotation.x = Math.PI / 2;
      compRing.position.y = ry;
      pistonGroup.add(compRing);
    });

    const wristPin = new THREE.Mesh(track(new THREE.CylinderGeometry(0.088, 0.088, 1.18, 16)), matForgedSteel);
    wristPin.rotation.x = Math.PI / 2;
    wristPin.position.y = -0.08;
    pistonGroup.add(wristPin);

    // -------------------------------------------------------------------------
    // 6. SOHC CAMSHAFT LOBES, PIVOTING ROCKER ARMS, VALVES & RIBBED PLUG
    // -------------------------------------------------------------------------
    const camGearGeo = track(new THREE.CylinderGeometry(camSprocketR, camSprocketR, 0.09, 24));
    const camGear = new THREE.Mesh(camGearGeo, matDarkSteel);
    camGear.rotation.x = Math.PI / 2;
    camGear.position.set(0, camY, chainZ);
    addEdges(camGear, camGearGeo, edgeCrimson);
    headLayer.add(camGear);

    // SOHC Camshaft & Egg-shaped Lobes
    const camShaft = new THREE.Mesh(track(new THREE.CylinderGeometry(0.08, 0.08, 1.35, 14)), matForgedSteel);
    camShaft.rotation.x = Math.PI / 2;
    camShaft.position.set(0, camY, 0);
    headLayer.add(camShaft);

    const lobeShape = new THREE.Shape();
    lobeShape.absarc(0, 0, 0.13, 0, Math.PI, true);
    lobeShape.quadraticCurveTo(0.11, 0.25, 0, 0.26);
    lobeShape.quadraticCurveTo(-0.11, 0.25, -0.13, 0);
    const lobeGeo = track(new THREE.ExtrudeGeometry(lobeShape, { depth: 0.12, bevelEnabled: false }));
    lobeGeo.translate(0, 0, -0.06);

    const intakeLobe = new THREE.Mesh(lobeGeo, matForgedSteel);
    intakeLobe.position.set(0, camY, -0.2);
    addEdges(intakeLobe, lobeGeo, edgeCyan);
    headLayer.add(intakeLobe);

    const exhaustLobe = new THREE.Mesh(lobeGeo, matForgedSteel);
    exhaustLobe.position.set(0, camY, 0.2);
    addEdges(exhaustLobe, lobeGeo, edgeCrimson);
    headLayer.add(exhaustLobe);

    // Pivoting Forged Rocker Arms
    const rockerGeo = track(new THREE.BoxGeometry(0.46, 0.065, 0.09));
    const intakeRocker = new THREE.Group();
    intakeRocker.position.set(-0.12, 1.76, -0.2);
    const intakeRockerMesh = new THREE.Mesh(rockerGeo, matForgedSteel);
    intakeRockerMesh.position.x = -0.14;
    addEdges(intakeRockerMesh, rockerGeo, edgeCyan);
    intakeRocker.add(intakeRockerMesh);
    headLayer.add(intakeRocker);

    const exhaustRocker = new THREE.Group();
    exhaustRocker.position.set(0.12, 1.76, 0.2);
    const exhaustRockerMesh = new THREE.Mesh(rockerGeo, matForgedSteel);
    exhaustRockerMesh.position.x = 0.14;
    addEdges(exhaustRockerMesh, rockerGeo, edgeCrimson);
    exhaustRocker.add(exhaustRockerMesh);
    headLayer.add(exhaustRocker);

    // Poppet Valves + Helical Springs
    const valveGeo = track(new THREE.CylinderGeometry(0.035, 0.18, 0.44, 16));
    const springRingGeo = track(new THREE.TorusGeometry(0.09, 0.015, 6, 18));

    const buildValveAssembly = (xPos, tilt, edgeMat) => {
      const grp = new THREE.Group();
      grp.position.set(xPos, 1.48, 0);
      grp.rotation.z = tilt;
      const valve = new THREE.Mesh(valveGeo, matForgedSteel);
      addEdges(valve, valveGeo, edgeMat);
      grp.add(valve);

      const springGrp = new THREE.Group();
      for (let s = 0; s < 4; s += 1) {
        const coil = new THREE.Mesh(springRingGeo, matForgedSteel);
        coil.rotation.x = Math.PI / 2;
        coil.position.y = 0.06 + s * 0.055;
        springGrp.add(coil);
      }
      grp.add(springGrp);
      headLayer.add(grp);
      return { grp, valve, springGrp };
    };

    const intakeAsm = buildValveAssembly(-0.3, 0.22, edgeCyan);
    const exhaustAsm = buildValveAssembly(0.3, -0.22, edgeCrimson);

    // 4-Rib Ceramic Spark Plug (LatheGeometry) + Hex Shell
    const plugHexGeo = track(new THREE.CylinderGeometry(0.1, 0.1, 0.26, 6));
    const sparkPlugHex = new THREE.Mesh(plugHexGeo, matForgedSteel);
    sparkPlugHex.position.set(0, 1.92, 0);
    addEdges(sparkPlugHex, plugHexGeo, edgeCrimson);
    plugLayer.add(sparkPlugHex);

    const cerPts = [
      new THREE.Vector2(0.072, 0),
      new THREE.Vector2(0.072, 0.07),
      new THREE.Vector2(0.088, 0.1),
      new THREE.Vector2(0.065, 0.13),
      new THREE.Vector2(0.088, 0.16),
      new THREE.Vector2(0.065, 0.19),
      new THREE.Vector2(0.088, 0.22),
      new THREE.Vector2(0.065, 0.25),
      new THREE.Vector2(0.088, 0.28),
      new THREE.Vector2(0.055, 0.34),
      new THREE.Vector2(0.032, 0.42),
    ];
    const plugCerGeo = track(new THREE.LatheGeometry(cerPts, 18));
    const sparkPlugCer = new THREE.Mesh(plugCerGeo, matCeramic);
    sparkPlugCer.position.set(0, 2.05, 0);
    plugLayer.add(sparkPlugCer);

    // Volumetric Combustion Chamber Cylinder
    const chamberMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xff2d4f,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    );
    const chamberMesh = new THREE.Mesh(track(new THREE.CylinderGeometry(0.58, 0.58, 1, 28)), chamberMat);
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
    // 7. POINTER ORBIT + WHEEL ZOOM
    // -------------------------------------------------------------------------
    let isDragging = false;
    let lastPointer = { x: 0, y: 0 };
    let targetRotY = -0.48;
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
      targetZoom = Math.max(5.8, Math.min(10.8, targetZoom + e.deltaY * 0.004));
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // -------------------------------------------------------------------------
    // 8. REAL 4-STROKE KINEMATIC LOOP
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

      const currentRpm = rpmRef.current || 1450;
      const visualSpeed = 2.6 + (currentRpm / 8000) * 11.5;
      crankAngle = (crankAngle + dt * visualSpeed) % (Math.PI * 4);
      const twoPiAngle = crankAngle % (Math.PI * 2);

      // Explode layer interpolation
      const targetExplode = explodedRef.current ? 1 : 0;
      explodeFactor += (targetExplode - explodeFactor) * 0.1;

      crankcaseLayer.position.y = -explodeFactor * 0.44;
      barrelLayer.position.y = explodeFactor * 0.18;
      headLayer.position.y = explodeFactor * 0.76;
      plugLayer.position.y = explodeFactor * 1.25;

      // Crankshaft, flywheel, clutch & half-speed camshaft rotation
      const pinX = Math.sin(crankAngle) * crankRadius;
      const pinY = crankY + Math.cos(crankAngle) * crankRadius;

      crankGroup.rotation.z = -crankAngle;
      clutchGroup.rotation.z = crankAngle * 0.45;
      camGear.rotation.z = -crankAngle * 0.5;
      intakeLobe.rotation.z = -crankAngle * 0.5 + Math.PI * 0.25;
      exhaustLobe.rotation.z = -crankAngle * 0.5 - Math.PI * 0.25;

      // Exact slider-crank piston elevation
      const wristY = pinY + Math.sqrt(Math.max(0.01, rodLength * rodLength - pinX * pinX));
      pistonGroup.position.y = wristY + 0.08;

      conRodGroup.position.set(pinX, pinY, 0);
      conRodGroup.rotation.z = Math.atan2(pinX, wristY - pinY);

      // Stroke detection
      const strokeIdx = ((Math.floor(crankAngle / Math.PI) % 4) + 4) % 4;
      const strokeLabel = phases[strokeIdx] || 'POWER';
      if (strokeLabel !== lastStrokeLabel) {
        lastStrokeLabel = strokeLabel;
        phaseCallbackRef.current?.(strokeLabel);
      }

      const pistonTopY = pistonGroup.position.y + 0.28;
      const headFloorY = 1.26 + explodeFactor * 0.76;
      const chamberH = Math.max(0.06, headFloorY - pistonTopY);
      chamberMesh.position.y = pistonTopY + chamberH * 0.5;
      chamberMesh.scale.y = chamberH;

      // Rocker arm tilt + valve stem lift + helical spring compression
      const intakeLift = strokeIdx === 0 ? Math.sin(twoPiAngle) * 0.14 : 0;
      const exhaustLift = strokeIdx === 3 ? Math.sin(twoPiAngle) * 0.14 : 0;

      intakeRocker.rotation.z = intakeLift * 1.65;
      exhaustRocker.rotation.z = -exhaustLift * 1.65;

      intakeAsm.valve.position.y = -intakeLift;
      intakeAsm.springGrp.scale.y = 1 - intakeLift * 1.8;
      exhaustAsm.valve.position.y = -exhaustLift;
      exhaustAsm.springGrp.scale.y = 1 - exhaustLift * 1.8;

      intakeEdges.opacity = strokeIdx === 0 ? 0.96 : 0.35;
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

      // TDC Ignition Spark & Flame Front
      const distFromIgnition = Math.abs(crankAngle - Math.PI * 2);
      if (distFromIgnition < 0.45) {
        const intensity = 1 - distFromIgnition / 0.45;
        sparkCoreMat.opacity = Math.min(1, intensity * 1.35);
        sparkCore.scale.setScalar(0.8 + intensity * 1.0);
        flameRingMat.opacity = intensity * 0.72;
        flameRing.scale.setScalar(0.45 + (1 - intensity) * 0.9);
      } else {
        sparkCoreMat.opacity = 0;
        flameRingMat.opacity = 0;
      }

      if (!isDragging) {
        targetRotY += dt * 0.22;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.1;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.1;
      camera.position.z += (targetZoom - camera.position.z) * 0.12;
      baseGroup.rotation.y -= dt * 0.1;

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
      aria-label="Interactive 3D SOHC motorcycle engine cutaway"
    />
  );
}
