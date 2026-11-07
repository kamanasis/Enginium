import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * KineticBackground - Master Deep Obsidian & Crimson Edition
 *
 * Implements deep, rich, cinematic color grading:
 * 1. BLACK: True ink-black obsidian void with velvety deep blood-crimson radial ambiances.
 * 2. GREY: Smoked titanium, forged carbon, and cold gunmetal grid with chrome highlights.
 * 3. RED: Saturated, rich blood-crimson and electric ruby sparks for the contact mesh node,
 *    telemetry lasers, and acoustic combustion harmonic waveforms.
 */
export default function KineticBackground({ opacity = 0.95 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    let isRunning = true;
    const disposables = [];

    const track = (resource) => {
      if (resource) disposables.push(resource);
      return resource;
    };

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // =========================================================================
    // DEEP COLOR PALETTE (Obsidian / Gunmetal / Blood Crimson)
    // =========================================================================
    const COLOR_GRID_MINOR = 0x242938;     // Deep smoked graphite
    const COLOR_GRID_MAJOR = 0x48516b;     // Structural cold steel
    const COLOR_GRID_EXT = 0x5e6885;       // Extended construction lines
    const COLOR_CHROME_SHARP = 0xc0c8d8;   // Radiant ruby-chrome tooth edges
    const COLOR_SILVER_RIM = 0xd8deeb;     // Polished silver rim loop
    const COLOR_TITANIUM = 0x6e7790;       // Titanium gear elements
    const COLOR_CARBON = 0x141620;         // Forged carbon translucent face

    const COLOR_RED_CORE = 0xff0033;       // Pure saturated supercar laser red
    const COLOR_RED_CRIMSON = 0xdc2626;    // Saturated deep crimson
    const COLOR_RED_WINE = 0x881337;       // Deep velvety wine red

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // 1. FULL-BACKGROUND SQUARE DRAFTING GRID (Deep Inky Steel with Crimson Accents)
    // =========================================================================
    const gridGroup = new THREE.Group();
    gridGroup.position.set(0, 0, -2.2);
    worldGroup.add(gridGroup);

    const xSpan = 24;
    const ySpan = 15;
    const cellStep = 0.65;
    const majorInterval = 4;

    const minorLines = [];
    const majorLines = [];
    const crossTicks = [];
    const extendedLines = [];
    const terminalDots = [];

    let colIndex = 0;
    for (let x = -xSpan; x <= xSpan + 0.001; x += cellStep) {
      const isMajor = colIndex % majorInterval === 0;
      if (isMajor) {
        majorLines.push(new THREE.Vector3(x, -ySpan, 0), new THREE.Vector3(x, ySpan, 0));
      } else {
        minorLines.push(new THREE.Vector3(x, -ySpan, 0), new THREE.Vector3(x, ySpan, 0));
      }
      colIndex++;
    }

    let rowIndex = 0;
    const accentRows = [-14, -8, -3, 3, 9, 14];

    for (let y = -ySpan; y <= ySpan + 0.001; y += cellStep) {
      const isMajor = rowIndex % majorInterval === 0;
      if (isMajor) {
        majorLines.push(new THREE.Vector3(-xSpan, y, 0), new THREE.Vector3(xSpan, y, 0));
      } else {
        minorLines.push(new THREE.Vector3(-xSpan, y, 0), new THREE.Vector3(xSpan, y, 0));
      }

      // Deep crimson crosshairs `+` at major intersections
      if (isMajor) {
        let ci = 0;
        for (let x = -xSpan; x <= xSpan + 0.001; x += cellStep) {
          if (ci % majorInterval === 0) {
            const cs = 0.055;
            crossTicks.push(
              new THREE.Vector3(x - cs, y, 0), new THREE.Vector3(x + cs, y, 0),
              new THREE.Vector3(x, y - cs, 0), new THREE.Vector3(x, y + cs, 0)
            );
          }
          ci++;
        }
      }

      // Extended lines with deep ruby terminal dots
      const rowOffset = Math.round(y / cellStep);
      if (accentRows.includes(rowOffset)) {
        const leftExt = xSpan + (1.2 + ((Math.abs(rowOffset) + 18) % 4) * 0.45);
        const rightExt = xSpan + (1.4 + ((Math.abs(rowOffset) + 15) % 4) * 0.55);

        extendedLines.push(new THREE.Vector3(-leftExt, y, 0), new THREE.Vector3(rightExt, y, 0));
        terminalDots.push(new THREE.Vector3(-leftExt, y, 0), new THREE.Vector3(rightExt, y, 0));
      }

      rowIndex++;
    }

    // Extended vertical lines matching sketch
    extendedLines.push(new THREE.Vector3(-cellStep * 5, -ySpan - 1.5, 0), new THREE.Vector3(-cellStep * 5, ySpan + 1.5, 0));
    terminalDots.push(new THREE.Vector3(-cellStep * 5, -ySpan - 1.5, 0), new THREE.Vector3(-cellStep * 5, ySpan + 1.5, 0));
    extendedLines.push(new THREE.Vector3(cellStep * 6, -ySpan - 1.5, 0), new THREE.Vector3(cellStep * 6, ySpan + 1.5, 0));
    terminalDots.push(new THREE.Vector3(cellStep * 6, -ySpan - 1.5, 0), new THREE.Vector3(cellStep * 6, ySpan + 1.5, 0));

    // Minor grid lines
    const minorGeo = track(new THREE.BufferGeometry().setFromPoints(minorLines));
    const minorMat = track(new THREE.LineBasicMaterial({
      color: COLOR_GRID_MINOR,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    }));
    gridGroup.add(new THREE.LineSegments(minorGeo, minorMat));

    // Major grid lines
    const majorGeo = track(new THREE.BufferGeometry().setFromPoints(majorLines));
    const majorMat = track(new THREE.LineBasicMaterial({
      color: COLOR_GRID_MAJOR,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    }));
    gridGroup.add(new THREE.LineSegments(majorGeo, majorMat));

    // Extended accent lines
    const extGeo = track(new THREE.BufferGeometry().setFromPoints(extendedLines));
    const extMat = track(new THREE.LineBasicMaterial({
      color: COLOR_GRID_EXT,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    }));
    gridGroup.add(new THREE.LineSegments(extGeo, extMat));

    // Terminal dots on extended lines (Electric Ruby Red)
    const dotsGeo = track(new THREE.BufferGeometry().setFromPoints(terminalDots));
    const dotsMat = track(new THREE.PointsMaterial({
      color: COLOR_RED_CORE,
      size: 0.09,
      transparent: true,
      opacity: 0.98,
      sizeAttenuation: true,
      depthWrite: false,
    }));
    gridGroup.add(new THREE.Points(dotsGeo, dotsMat));

    // Intersection crosshairs (Vibrant Ruby Crimson)
    const crossGeo = track(new THREE.BufferGeometry().setFromPoints(crossTicks));
    const crossMat = track(new THREE.LineBasicMaterial({
      color: 0xff1744,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    }));
    gridGroup.add(new THREE.LineSegments(crossGeo, crossMat));

    // Soft scanning sweep beam on grid plane (Deep Crimson)
    const scanLineGeo = track(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-xSpan, 0, 0.02),
      new THREE.Vector3(xSpan, 0, 0.02),
    ]));
    const scanLineMat = track(new THREE.LineBasicMaterial({
      color: COLOR_RED_CRIMSON,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }));
    const scanLine = new THREE.Line(scanLineGeo, scanLineMat);
    gridGroup.add(scanLine);

    // Traveling laser packets (High-Speed Ruby Laser)
    const laserPackets = [];
    accentRows.forEach((rIndex, idx) => {
      const y = rIndex * cellStep;
      const pGeo = track(new THREE.SphereGeometry(0.045, 8, 8));
      const pMat = track(new THREE.MeshBasicMaterial({ color: COLOR_RED_CORE, transparent: true, opacity: 0.98, depthWrite: false }));
      const pMesh = new THREE.Mesh(pGeo, pMat);
      gridGroup.add(pMesh);

      laserPackets.push({
        mesh: pMesh,
        y,
        minX: -xSpan - 1.2,
        maxX: xSpan + 1.2,
        speed: 0.35 + idx * 0.08,
        progress: (idx * 0.2) % 1.0,
      });
    });

    // =========================================================================
    // 2. PRECISION TAPERED GEAR TOOTH GEOMETRY
    // =========================================================================
    const createTaperedToothGeometry = (wBase, wTip, len, depth) => {
      const halfD = depth / 2;
      const vertices = new Float32Array([
        -wBase / 2, -len / 2, halfD,  wBase / 2, -len / 2, halfD,  wTip / 2, len / 2, halfD,
        -wBase / 2, -len / 2, halfD,  wTip / 2, len / 2, halfD, -wTip / 2, len / 2, halfD,
        wBase / 2, -len / 2, -halfD, -wBase / 2, -len / 2, -halfD, -wTip / 2, len / 2, -halfD,
        wBase / 2, -len / 2, -halfD, -wTip / 2, len / 2, -halfD,  wTip / 2, len / 2, -halfD,
        -wTip / 2, len / 2, halfD,  wTip / 2, len / 2, halfD,  wTip / 2, len / 2, -halfD,
        -wTip / 2, len / 2, halfD,  wTip / 2, len / 2, -halfD, -wTip / 2, len / 2, -halfD,
        -wBase / 2, -len / 2, -halfD,  wBase / 2, -len / 2, -halfD,  wBase / 2, -len / 2, halfD,
        -wBase / 2, -len / 2, -halfD,  wBase / 2, -len / 2, halfD, -wBase / 2, -len / 2, halfD,
        -wBase / 2, -len / 2, -halfD, -wBase / 2, -len / 2, halfD, -wTip / 2, len / 2, halfD,
        -wBase / 2, -len / 2, -halfD, -wTip / 2, len / 2, halfD, -wTip / 2, len / 2, -halfD,
        wBase / 2, -len / 2, halfD,  wBase / 2, -len / 2, -halfD,  wTip / 2, len / 2, -halfD,
        wBase / 2, -len / 2, halfD,  wTip / 2, len / 2, -halfD,  wTip / 2, len / 2, halfD,
      ]);
      const geo = track(new THREE.BufferGeometry());
      geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geo.computeVertexNormals();
      return geo;
    };

    // =========================================================================
    // 3. MECHANICAL GEAR FACTORY (Smoked Titanium & Ruby Bevels)
    // =========================================================================
    const createRefinedGear = ({
      radius = 1.75,
      rimWidth = 0.44,
      axialDepth = 0.18,
      teethCount = 24,
      toothLength = 0.24,
      toothBaseWidth = 0.17,
      toothTipWidth = 0.11,
      primaryColor = COLOR_TITANIUM,
      accentColor = COLOR_CHROME_SHARP,
      rimColor = COLOR_SILVER_RIM,
    }) => {
      const gearRoot = new THREE.Group();
      const outerR = radius;
      const innerR = radius - rimWidth;
      const halfDepth = axialDepth / 2;

      // Dual Rim Loops (Silver Chrome)
      const topOuter = [];
      const botOuter = [];
      const topInner = [];
      const botInner = [];
      const segments = 72;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        topOuter.push(new THREE.Vector3(cos * outerR, sin * outerR, halfDepth));
        botOuter.push(new THREE.Vector3(cos * outerR, sin * outerR, -halfDepth));
        topInner.push(new THREE.Vector3(cos * innerR, sin * innerR, halfDepth));
        botInner.push(new THREE.Vector3(cos * innerR, sin * innerR, -halfDepth));
      }

      const rimMat = track(new THREE.LineBasicMaterial({ color: rimColor, transparent: true, opacity: 0.95, depthWrite: false }));
      const rimSubMat = track(new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.7, depthWrite: false }));

      gearRoot.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(topOuter)), rimMat));
      gearRoot.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(botOuter)), rimSubMat));
      gearRoot.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(topInner)), rimSubMat));
      gearRoot.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(botInner)), rimSubMat));

      // Axial rim vertical connector struts
      const wallRibs = [];
      for (let w = 0; w < 16; w++) {
        const rad = (w / 16) * Math.PI * 2;
        wallRibs.push(
          new THREE.Vector3(Math.cos(rad) * outerR, Math.sin(rad) * outerR, halfDepth),
          new THREE.Vector3(Math.cos(rad) * outerR, Math.sin(rad) * outerR, -halfDepth),
          new THREE.Vector3(Math.cos(rad) * innerR, Math.sin(rad) * innerR, halfDepth),
          new THREE.Vector3(Math.cos(rad) * innerR, Math.sin(rad) * innerR, -halfDepth)
        );
      }
      const wallGeo = track(new THREE.BufferGeometry().setFromPoints(wallRibs));
      gearRoot.add(new THREE.LineSegments(wallGeo, track(new THREE.LineBasicMaterial({ color: COLOR_GRID_MAJOR, transparent: true, opacity: 0.35, depthWrite: false }))));

      // Translucent Ring Face Mesh (Carbon dark)
      const ringFaceGeo = track(new THREE.RingGeometry(innerR, outerR, 64));
      const ringFaceMat = track(new THREE.MeshBasicMaterial({
        color: COLOR_CARBON,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }));
      const topFace = new THREE.Mesh(ringFaceGeo, ringFaceMat);
      topFace.position.z = halfDepth;
      gearRoot.add(topFace);

      // Tapered Involute Gear Teeth with Ruby-Chrome Bevel Edges
      const toothGeo = createTaperedToothGeometry(toothBaseWidth, toothTipWidth, toothLength, axialDepth);
      const toothEdgeGeo = track(new THREE.EdgesGeometry(toothGeo));

      const toothMat = track(new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.28, depthWrite: false }));
      const toothEdgeMat = track(new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.95, depthWrite: false }));

      const teethGroup = new THREE.Group();
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const toothDistance = outerR + toothLength / 2;

        const tooth = new THREE.Mesh(toothGeo, toothMat);
        tooth.add(new THREE.LineSegments(toothEdgeGeo, toothEdgeMat));
        tooth.position.set(Math.cos(angle) * toothDistance, Math.sin(angle) * toothDistance, 0);
        tooth.rotation.z = angle - Math.PI / 2;

        teethGroup.add(tooth);
      }
      gearRoot.add(teethGroup);

      // Machined Lightening Pockets
      const holePocketsGroup = new THREE.Group();
      const holeRadius = rimWidth * 0.48;
      const holeCenterR = innerR - holeRadius - 0.06;
      const pocketRingGeo = track(new THREE.RingGeometry(holeRadius * 0.72, holeRadius, 24));
      const pocketRingMat = track(new THREE.MeshBasicMaterial({ color: rimColor, side: THREE.DoubleSide, transparent: true, opacity: 0.35, depthWrite: false }));

      for (let h = 0; h < 6; h++) {
        const ha = (h / 6) * Math.PI * 2;
        const pocket = new THREE.Mesh(pocketRingGeo, pocketRingMat);
        pocket.position.set(Math.cos(ha) * holeCenterR, Math.sin(ha) * holeCenterR, 0);
        holePocketsGroup.add(pocket);
      }
      gearRoot.add(holePocketsGroup);

      // Center Axle Hub with Ball Bearing Assembly
      const hubGroup = new THREE.Group();
      const hubOuterR = innerR * 0.36;
      const hubInnerR = innerR * 0.16;

      const hubRingsGeo = track(new THREE.RingGeometry(hubInnerR, hubOuterR, 32));
      const hubRingsMat = track(new THREE.MeshBasicMaterial({ color: primaryColor, side: THREE.DoubleSide, transparent: true, opacity: 0.38, depthWrite: false }));
      hubGroup.add(new THREE.Mesh(hubRingsGeo, hubRingsMat));

      const ballGeo = track(new THREE.SphereGeometry(0.035, 8, 8));
      const ballMat = track(new THREE.MeshBasicMaterial({ color: COLOR_SILVER_RIM, transparent: true, opacity: 0.98, depthWrite: false }));
      const bearingRaceR = (hubOuterR + hubInnerR) / 2;

      for (let b = 0; b < 8; b++) {
        const ba = (b / 8) * Math.PI * 2;
        const ball = new THREE.Mesh(ballGeo, ballMat);
        ball.position.set(Math.cos(ba) * bearingRaceR, Math.sin(ba) * bearingRaceR, 0);
        hubGroup.add(ball);
      }

      // 4 Structural web spokes
      const spokes = [];
      for (let s = 0; s < 4; s++) {
        const sa = (s * Math.PI) / 2;
        spokes.push(
          new THREE.Vector3(Math.cos(sa) * hubOuterR, Math.sin(sa) * hubOuterR, 0),
          new THREE.Vector3(Math.cos(sa) * innerR, Math.sin(sa) * innerR, 0)
        );
      }
      const spokeGeo = track(new THREE.BufferGeometry().setFromPoints(spokes));
      gearRoot.add(new THREE.LineSegments(spokeGeo, rimSubMat));
      gearRoot.add(hubGroup);

      return { root: gearRoot };
    };

    // =========================================================================
    // 4. FIXED ROTATION POINT & GEAR WHEEL ANCHORING
    // =========================================================================
    const fixedContactPoint = new THREE.Vector3(0.5, -0.4, 0);

    const wheel1Radius = 1.55;
    const wheel1Teeth = 24;
    const wheel1RotX = 1.22;
    const wheel1RotZ = -0.22;

    const gear1 = createRefinedGear({
      radius: wheel1Radius,
      rimWidth: 0.42,
      axialDepth: 0.18,
      teethCount: wheel1Teeth,
      toothLength: 0.22,
      toothBaseWidth: 0.15,
      toothTipWidth: 0.09,
      primaryColor: COLOR_TITANIUM,
      accentColor: COLOR_CHROME_SHARP,
      rimColor: COLOR_SILVER_RIM,
    });

    const wheel1OrientationGroup = new THREE.Group();
    wheel1OrientationGroup.rotation.set(wheel1RotX, 0, wheel1RotZ, 'XYZ');

    const localContact1 = new THREE.Vector3(wheel1Radius, 0, 0);
    const worldOffset1 = localContact1.clone().applyEuler(wheel1OrientationGroup.rotation);
    const wheel1Center = fixedContactPoint.clone().sub(worldOffset1);
    wheel1OrientationGroup.position.copy(wheel1Center);

    const wheel1SpinGroup = new THREE.Group();
    wheel1SpinGroup.add(gear1.root);
    wheel1OrientationGroup.add(wheel1SpinGroup);
    worldGroup.add(wheel1OrientationGroup);

    const wheel2Radius = 1.65;
    const wheel2Teeth = 24;
    const wheel2Euler = new THREE.Euler(0.26, -0.38, -0.84, 'XYZ');

    const gear2 = createRefinedGear({
      radius: wheel2Radius,
      rimWidth: 0.40,
      axialDepth: 0.18,
      teethCount: wheel2Teeth,
      toothLength: 0.22,
      toothBaseWidth: 0.15,
      toothTipWidth: 0.09,
      primaryColor: COLOR_TITANIUM,
      accentColor: COLOR_CHROME_SHARP,
      rimColor: COLOR_SILVER_RIM,
    });

    const wheel2OrientationGroup = new THREE.Group();
    wheel2OrientationGroup.rotation.copy(wheel2Euler);

    const localContact2 = new THREE.Vector3(0, -wheel2Radius, 0);
    const worldOffset2 = localContact2.clone().applyEuler(wheel2OrientationGroup.rotation);
    const wheel2Center = fixedContactPoint.clone().sub(worldOffset2);
    wheel2OrientationGroup.position.copy(wheel2Center);

    const wheel2SpinGroup = new THREE.Group();
    wheel2SpinGroup.rotation.z = Math.PI / wheel2Teeth;
    wheel2SpinGroup.add(gear2.root);
    wheel2OrientationGroup.add(wheel2SpinGroup);
    worldGroup.add(wheel2OrientationGroup);

    // =========================================================================
    // 5. HERO MESH CONTACT NODE & KINETIC PULSE RINGS (Deep Crimson Spark)
    // =========================================================================
    const meshNodeGroup = new THREE.Group();
    meshNodeGroup.position.copy(fixedContactPoint);
    worldGroup.add(meshNodeGroup);

    // Core glowing contact spark (Blazing Ruby Laser)
    const meshCoreGeo = track(new THREE.SphereGeometry(0.08, 16, 16));
    const meshCoreMat = track(new THREE.MeshBasicMaterial({ color: COLOR_RED_CORE, transparent: true, opacity: 0.98, depthWrite: false }));
    const meshCore = new THREE.Mesh(meshCoreGeo, meshCoreMat);
    meshNodeGroup.add(meshCore);

    // Dual counter-rotating vernier alignment rings (Deep Crimson & Wine)
    const ring1Geo = track(new THREE.RingGeometry(0.14, 0.18, 32));
    const ring1Mat = track(new THREE.MeshBasicMaterial({ color: COLOR_RED_CRIMSON, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false }));
    const meshRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    meshNodeGroup.add(meshRing1);

    const ring2Geo = track(new THREE.RingGeometry(0.25, 0.28, 32));
    const ring2Mat = track(new THREE.MeshBasicMaterial({ color: COLOR_RED_WINE, side: THREE.DoubleSide, transparent: true, opacity: 0.42, depthWrite: false }));
    const meshRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    meshNodeGroup.add(meshRing2);

    // Crosshair reticle ticks
    const reticlePoints = [
      new THREE.Vector3(-0.35, 0, 0), new THREE.Vector3(0.35, 0, 0),
      new THREE.Vector3(0, -0.35, 0), new THREE.Vector3(0, 0.35, 0),
    ];
    const reticleGeo = track(new THREE.BufferGeometry().setFromPoints(reticlePoints));
    const reticleMat = track(new THREE.LineBasicMaterial({ color: 0xff1744, transparent: true, opacity: 0.7, depthWrite: false }));
    meshNodeGroup.add(new THREE.LineSegments(reticleGeo, reticleMat));

    // Expanding kinetic shockwave pulses (Deep Crimson)
    const pulseCount = 3;
    const pulseRings = [];
    for (let k = 0; k < pulseCount; k++) {
      const pRingGeo = track(new THREE.RingGeometry(0.01, 0.035, 32));
      const pRingMat = track(new THREE.MeshBasicMaterial({
        color: COLOR_RED_CRIMSON,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }));
      const pRing = new THREE.Mesh(pRingGeo, pRingMat);
      meshNodeGroup.add(pRing);
      pulseRings.push({ mesh: pRing, phase: k / pulseCount });
    }

    // =========================================================================
    // 6. ATMOSPHERIC PARTICLES & ACOUSTIC HARMONIC WAVE
    // =========================================================================
    const particleCount = 95;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 24;
      particlePositions[p + 1] = (Math.random() - 0.5) * 16;
      particlePositions[p + 2] = (Math.random() - 0.5) * 7 - 1.8;
    }
    const particleGeo = track(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = track(new THREE.PointsMaterial({
      color: COLOR_SILVER_RIM,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    }));
    worldGroup.add(new THREE.Points(particleGeo, particleMat));

    // Acoustic Harmonic Telemetry Wave in the deep background (Deep Saturated Crimson)
    const wavePoints = [];
    const waveSegments = 140;
    for (let w = 0; w <= waveSegments; w++) {
      const wx = -12 + (w / waveSegments) * 24;
      wavePoints.push(new THREE.Vector3(wx, -3.0, -2.4));
    }
    const waveGeo = track(new THREE.BufferGeometry().setFromPoints(wavePoints));
    const waveMat = track(new THREE.LineBasicMaterial({ color: 0xff1744, transparent: true, opacity: 0.35, depthWrite: false }));
    const waveLine = new THREE.Line(waveGeo, waveMat);
    worldGroup.add(waveLine);

    // =========================================================================
    // 7. RESPONSIVE RESIZE HANDLER (Desktop & Mobile viewports)
    // =========================================================================
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;

      if (w < 768) {
        camera.position.z = 12.0;
        worldGroup.position.set(0.0, -0.65, 0);
      } else if (w < 1200) {
        camera.position.z = 9.4;
        worldGroup.position.set(0.35, 0.05, 0);
      } else {
        camera.position.z = 8.6;
        worldGroup.position.set(0.55, 0.0, 0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 8. ANIMATION LOOP
    // =========================================================================
    let lastTime = performance.now();
    let elapsed = 0;

    const animate = (now) => {
      if (!isRunning) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += delta;

      const gearSpeed = 0.20;
      wheel1SpinGroup.rotation.z = elapsed * gearSpeed;
      wheel2SpinGroup.rotation.z = (Math.PI / wheel2Teeth) - (elapsed * gearSpeed * (wheel1Teeth / wheel2Teeth));

      meshCore.scale.setScalar(1 + Math.sin(elapsed * 3.5) * 0.25);
      meshRing1.rotation.z = elapsed * 0.4;
      meshRing2.rotation.z = -elapsed * 0.25;

      pulseRings.forEach((p) => {
        p.phase = (p.phase + delta * 0.4) % 1.0;
        const scale = 0.2 + p.phase * 2.2;
        p.mesh.scale.set(scale, scale, 1);
        p.mesh.material.opacity = Math.sin((1 - p.phase) * Math.PI) * 0.42;
      });

      laserPackets.forEach((lp) => {
        lp.progress = (lp.progress + delta * (lp.speed / 12)) % 1.0;
        lp.mesh.position.x = lp.minX + lp.progress * (lp.maxX - lp.minX);
        lp.mesh.position.y = lp.y;
      });

      const scanPeriod = 16;
      const scanProgress = (elapsed % scanPeriod) / scanPeriod;
      scanLine.position.y = ySpan - scanProgress * (ySpan * 2);

      const wavePos = waveGeo.attributes.position;
      for (let w = 0; w <= waveSegments; w++) {
        const wx = wavePos.getX(w);
        const wy = -3.0 + Math.sin(wx * 0.5 - elapsed * 1.8) * 0.2 + Math.cos(wx * 1.2 + elapsed * 1.3) * 0.1;
        wavePos.setY(w, wy);
      }
      wavePos.needsUpdate = true;

      majorMat.opacity = 0.45 + Math.sin(elapsed * 1.0) * 0.06;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      disposables.forEach((item) => {
        if (item && typeof item.dispose === 'function') {
          item.dispose();
        }
      });

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="kinetic-bg-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.6s ease',
      }}
      aria-hidden="true"
    >
      {/* Deepest obsidian black void with velvety wine & blood-crimson radial aura */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 85% 65% at 50% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 65%),
            linear-gradient(180deg, #000000 0%, #040507 40%, #07080c 75%, #000000 100%)
          `,
        }}
      />

      {/* Hardware-accelerated Three.js WebGL canvas host */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Deep inky black ambient edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.92) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
