import * as THREE from 'three';

// STYLISED PLACEHOLDER geometry for the blueprint viewer. Every part is built
// from primitives and converted to edge lines (the "blueprint" look). Nothing
// here is manufacturer CAD. Coordinates: x forward, y up, z right-hand side;
// wheels are 0.62 above the ground plane at x = +/-1.3.
//
// Each builder returns a flat array of line-segment vertex pairs in the
// ASSEMBLED pose. The scene moves whole parts by an offset, never the vertices.

const UP = new THREE.Vector3(0, 1, 0);
const v3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
const mat = (p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1]) => new THREE.Matrix4().compose(
  v3(p),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(r[0], r[1], r[2])),
  v3(s),
);

const HALF_PI = Math.PI / 2;
const ALONG_Z = [HALF_PI, 0, 0]; // rotates a Y-axis cylinder onto the Z axis
const ALONG_X = [0, 0, HALF_PI]; // rotates a Y-axis cylinder onto the X axis

function flatten(geometry, matrix) {
  geometry.applyMatrix4(matrix);
  const out = Array.from(geometry.attributes.position.array);
  geometry.dispose();
  return out;
}

// Shape helpers: each returns an array of numbers (pairs of 3D points).
const edges = (geo, m, threshold = 30) => flatten(new THREE.EdgesGeometry(geo, threshold), m);
const wire = (geo, m) => flatten(new THREE.WireframeGeometry(geo), m);
const box = (w, h, d, p, r, base) => edges(new THREE.BoxGeometry(w, h, d), withBase(mat(p, r), base));
const cyl = (rt, rb, h, p, r, seg = 10, base) => edges(new THREE.CylinderGeometry(rt, rb, h, seg), withBase(mat(p, r), base));
const lines = (pairs) => pairs.flatMap(([a, b]) => [...a, ...b]);

function withBase(m, base) {
  return base ? base.clone().multiply(m) : m;
}

function between(a, b, radius, seg = 6) {
  const A = v3(a);
  const B = v3(b);
  const dir = B.clone().sub(A);
  const length = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize());
  const m = new THREE.Matrix4().compose(A.clone().add(B).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1));
  return edges(new THREE.CylinderGeometry(radius, radius, length, seg), m);
}

function tubeAlong(points, radius, segments = 48, radial = 5, closed = false) {
  const curve = new THREE.CatmullRomCurve3(points.map(v3), closed);
  return edges(new THREE.TubeGeometry(curve, segments, radius, radial, closed), new THREE.Matrix4(), 40);
}

function circlePoints(cx, cy, cz, radius, count = 48) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    const b = ((i + 1) / count) * Math.PI * 2;
    out.push([[cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, cz], [cx + Math.cos(b) * radius, cy + Math.sin(b) * radius, cz]]);
  }
  return out;
}

function arcPoints(cx, cy, cz, radius, from, to, count = 12) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const a = from + ((to - from) * i) / count;
    const b = from + ((to - from) * (i + 1)) / count;
    out.push([[cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, cz], [cx + Math.cos(b) * radius, cy + Math.sin(b) * radius, cz]]);
  }
  return out;
}

function wheelParts(cx, cy) {
  const tyre = wire(new THREE.TorusGeometry(0.5, 0.12, 6, 30), mat([cx, cy, 0]));
  const rim = wire(new THREE.TorusGeometry(0.38, 0.012, 4, 30), mat([cx, cy, 0]));
  const hub = cyl(0.07, 0.07, 0.3, [cx, cy, 0], ALONG_Z, 10);
  const spokes = [];
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    spokes.push([[cx + Math.cos(a) * 0.07, cy + Math.sin(a) * 0.07, 0], [cx + Math.cos(a) * 0.38, cy + Math.sin(a) * 0.38, 0]]);
  }
  return [...tyre, ...rim, ...hub, ...lines(spokes)];
}

// Cylinder bank: tilted forward about the crankcase top.
const CYL_BASE = mat([0.22, 0.8, 0], [0, 0, -0.26]);

const BUILDERS = {
  'main-chassis': () => [
    ...between([0.9, 1.55, 0], [-0.95, 1.28, 0], 0.03),
    ...between([0.9, 1.5, 0], [0.42, 0.55, 0], 0.035),
    ...between([0.42, 0.55, 0], [-0.5, 0.5, 0], 0.03),
    ...between([-0.5, 0.5, 0], [-0.95, 1.28, 0], 0.03),
    ...between([0.86, 1.62, 0], [1.0, 1.38, 0], 0.05, 8),
    ...[1, -1].flatMap((s) => [
      ...between([-0.3, 1.3, 0.17 * s], [-1.2, 1.15, 0.17 * s], 0.025),
      ...between([-0.5, 0.55, 0.17 * s], [-1.0, 1.15, 0.17 * s], 0.025),
    ]),
    ...between([-1.2, 1.15, 0.17], [-1.2, 1.15, -0.17], 0.02),
  ],

  seat: () => [
    ...box(0.85, 0.1, 0.32, [-0.55, 1.42, 0], [0, 0, 0.05]),
    ...box(0.3, 0.08, 0.2, [-0.05, 1.46, 0], [0, 0, 0.1]),
  ],

  swingarm: () => [
    ...[1, -1].flatMap((s) => between([-0.5, 0.52, 0.17 * s], [-1.3, 0.62, 0.2 * s], 0.03)),
    ...between([-0.55, 0.52, 0.17], [-0.55, 0.52, -0.17], 0.025),
    ...cyl(0.045, 0.045, 0.42, [-0.5, 0.52, 0], ALONG_Z, 8),
  ],

  'rear-shock-absorbers': () => [1, -1].flatMap((s) => [
    ...between([-0.82, 1.2, 0.21 * s], [-1.18, 0.7, 0.23 * s], 0.02),
    ...between([-0.88, 1.12, 0.21 * s], [-1.12, 0.79, 0.23 * s], 0.05, 8),
  ]),

  'telescopic-forks': () => [1, -1].flatMap((s) => [
    ...between([0.98, 1.6, 0.11 * s], [1.22, 0.95, 0.11 * s], 0.028),
    ...between([1.22, 0.95, 0.11 * s], [1.3, 0.62, 0.11 * s], 0.045, 8),
  ]),

  'switchgear-throttle': () => [
    ...between([0.88, 1.7, -0.46], [0.88, 1.7, 0.46], 0.018),
    ...cyl(0.03, 0.03, 0.12, [0.88, 1.7, 0.4], ALONG_Z, 8),
    ...cyl(0.03, 0.03, 0.12, [0.88, 1.7, -0.4], ALONG_Z, 8),
    ...between([0.9, 1.68, 0.36], [1.05, 1.62, 0.5], 0.01),
    ...between([0.9, 1.68, -0.36], [1.05, 1.62, -0.5], 0.01),
  ],

  // Added in v2 from the owner's manual side views (not catalogue parts).
  'utility-box': () => [
    ...box(0.26, 0.2, 0.1, [-0.95, 0.92, 0.2]),
    ...box(0.2, 0.12, 0.012, [-0.95, 0.92, 0.256]),
  ],

  'side-stand': () => [
    ...between([0.2, 0.5, -0.2], [0.02, 0.04, -0.42], 0.018),
    ...between([0.02, 0.04, -0.42], [0.02, 0.04, -0.52], 0.03, 6),
  ],

  'main-stand': () => [
    ...[1, -1].flatMap((s) => between([-0.15, 0.5, 0.17 * s], [-0.42, 0.04, 0.2 * s], 0.018)),
    ...between([-0.42, 0.04, 0.2], [-0.42, 0.04, -0.2], 0.018),
  ],

  'kick-starter': () => [
    ...between([-0.05, 0.5, 0.3], [-0.2, 0.28, 0.4], 0.02),
    ...box(0.08, 0.04, 0.07, [-0.22, 0.26, 0.42]),
  ],

  'brake-pedal': () => [
    ...between([-0.5, 0.42, 0.2], [-0.05, 0.3, 0.32], 0.016),
    ...box(0.1, 0.03, 0.07, [-0.02, 0.29, 0.34]),
  ],

  'headlight-assembly': () => [
    ...edges(new THREE.SphereGeometry(0.17, 10, 7), mat([1.22, 1.52, 0], [0, 0, 0], [0.8, 1, 1]), 20),
    ...between([1.08, 1.52, 0], [0.98, 1.45, 0], 0.02),
  ],

  'instrument-cluster': () => box(0.14, 0.1, 0.22, [0.93, 1.76, 0], [0, 0, -0.3]),

  'fuel-tank': () => edges(new THREE.CapsuleGeometry(0.2, 0.5, 3, 10), mat([0.42, 1.62, 0], [0, 0, HALF_PI], [1, 1, 0.85]), 20),

  'fuel-cock': () => [
    ...between([0.5, 1.45, -0.1], [0.5, 1.34, -0.1], 0.03, 8),
    ...between([0.5, 1.34, -0.1], [0.56, 1.3, -0.2], 0.012),
    ...tubeAlong([[0.5, 1.34, -0.12], [0.3, 1.2, -0.14], [0.03, 1.12, -0.1]], 0.01, 24, 4),
  ],

  carburetor: () => [
    ...cyl(0.06, 0.06, 0.3, [0.03, 1.18, 0], ALONG_X, 10),
    ...cyl(0.08, 0.08, 0.1, [0.03, 1.05, 0], [0, 0, 0], 10),
    ...between([0.1, 1.24, 0], [0.1, 1.36, 0.0], 0.012),
  ],

  'air-filter': () => [
    ...box(0.42, 0.26, 0.2, [-0.6, 1.1, -0.2]),
    ...between([-0.12, 1.18, 0], [-0.42, 1.12, -0.12], 0.04, 8),
  ],

  'exhaust-muffler': () => [
    ...tubeAlong([[0.4, 1.05, 0.16], [0.5, 0.7, 0.24], [0.3, 0.4, 0.27], [-0.2, 0.38, 0.28], [-0.6, 0.45, 0.29]], 0.035, 40, 6),
    ...between([-0.6, 0.45, 0.29], [-1.4, 0.62, 0.29], 0.09, 10),
    ...cyl(0.07, 0.07, 0.04, [-1.42, 0.625, 0.29], [0, 0, HALF_PI + 0.2], 10),
  ],

  crankcase: () => [
    ...box(0.75, 0.45, 0.5, [0.0, 0.62, 0]),
    ...box(0.5, 0.3, 0.52, [-0.4, 0.52, 0]),
  ],

  'cylinder-block': () => [
    ...cyl(0.17, 0.17, 0.45, [0, 0.3, 0], [0, 0, 0], 12, CYL_BASE),
    ...[0, 1, 2, 3, 4, 5].flatMap((i) => cyl(0.235, 0.235, 0.025, [0, 0.12 + i * 0.07, 0], [0, 0, 0], 12, CYL_BASE)),
    ...box(0.4, 0.2, 0.42, [0, 0.62, 0], [0, 0, 0], CYL_BASE),
  ],

  'spark-plug': () => [
    ...between([0.38, 1.4, 0.21], [0.38, 1.5, 0.4], 0.025, 8),
    ...between([0.38, 1.41, 0.215], [0.38, 1.43, 0.26], 0.04, 6),
    ...between([0.38, 1.5, 0.4], [0.38, 1.58, 0.56], 0.04, 8),
  ],

  'valves-tappets': () => [
    ...cyl(0.03, 0.03, 0.16, [0.3, 1.4, 0], [0, 0, 0], 8),
    ...cyl(0.03, 0.03, 0.16, [0.46, 1.4, 0], [0, 0, 0], 8),
    ...between([0.3, 1.32, 0], [0.3, 1.16, 0], 0.01, 4),
    ...between([0.46, 1.32, 0], [0.46, 1.16, 0], 0.01, 4),
    ...between([0.3, 1.5, -0.12], [0.3, 1.5, 0.12], 0.012, 4),
    ...between([0.46, 1.5, -0.12], [0.46, 1.5, 0.12], 0.012, 4),
  ],

  'camshaft-timing': () => [
    ...cyl(0.025, 0.025, 0.36, [0.38, 1.5, 0], ALONG_Z, 8),
    ...cyl(0.1, 0.1, 0.03, [0.38, 1.5, -0.2], ALONG_Z, 14),
    ...box(0.05, 0.06, 0.05, [0.38, 1.54, 0.05]),
    ...box(0.05, 0.06, 0.05, [0.38, 1.54, -0.05]),
  ],

  crankshaft: () => [
    ...cyl(0.05, 0.05, 0.5, [0, 0.62, 0], ALONG_Z, 8),
    ...cyl(0.16, 0.16, 0.04, [0, 0.62, 0.1], ALONG_Z, 14),
    ...cyl(0.16, 0.16, 0.04, [0, 0.62, -0.1], ALONG_Z, 14),
    ...between([0.0, 0.62, 0], [0.2, 1.0, 0], 0.03, 6),
  ],

  'clutch-assembly': () => [
    ...cyl(0.21, 0.21, 0.04, [-0.18, 0.62, 0.27], ALONG_Z, 16),
    ...[0.13, 0.16, 0.19, 0.22].flatMap((z) => cyl(0.18, 0.18, 0.012, [-0.18, 0.62, z], ALONG_Z, 16)),
  ],

  'stator-magneto': () => [
    ...cyl(0.18, 0.18, 0.05, [0.1, 0.62, -0.27], ALONG_Z, 16),
    ...wire(new THREE.TorusGeometry(0.12, 0.015, 4, 20), mat([0.1, 0.62, -0.3])),
  ],

  gearbox: () => [
    ...cyl(0.03, 0.03, 0.4, [-0.12, 0.52, 0], ALONG_Z, 8),
    ...cyl(0.03, 0.03, 0.4, [-0.26, 0.7, 0], ALONG_Z, 8),
    ...cyl(0.1, 0.1, 0.02, [-0.12, 0.52, 0.1], ALONG_Z, 12),
    ...cyl(0.08, 0.08, 0.02, [-0.26, 0.7, 0.1], ALONG_Z, 12),
    ...cyl(0.07, 0.07, 0.02, [-0.12, 0.52, -0.1], ALONG_Z, 12),
  ],

  'starter-motor': () => [
    ...cyl(0.06, 0.06, 0.24, [0.18, 0.78, 0.12], ALONG_Z, 10),
    ...box(0.04, 0.04, 0.05, [0.18, 0.84, 0.26]),
  ],

  battery: () => [
    ...box(0.2, 0.3, 0.13, [-0.55, 0.85, 0.19]),
    ...cyl(0.015, 0.015, 0.04, [-0.6, 1.02, 0.19], [0, 0, 0], 6),
    ...cyl(0.015, 0.015, 0.04, [-0.5, 1.02, 0.19], [0, 0, 0], 6),
  ],

  'ignition-coil': () => [
    ...box(0.1, 0.08, 0.08, [0.15, 1.38, -0.16]),
    ...tubeAlong([[0.15, 1.38, -0.16], [0.2, 1.62, -0.05], [0.36, 1.64, 0.3], [0.38, 1.56, 0.5]], 0.008, 40, 4),
  ],

  'regulator-rectifier': () => box(0.16, 0.1, 0.05, [-0.9, 0.95, -0.2]),

  'wiring-harness': () => tubeAlong(
    [[1.15, 1.5, 0], [0.85, 1.55, -0.07], [0.3, 1.5, -0.2], [-0.3, 1.0, -0.22], [-0.6, 0.88, -0.22], [-1.0, 0.95, -0.2], [-1.4, 1.05, -0.1]],
    0.01, 60, 4,
  ),

  chain: () => [
    ...tubeAlong(
      [[-0.32, 0.64, -0.15], [-0.8, 0.69, -0.15], [-1.3, 0.74, -0.15], [-1.42, 0.62, -0.15], [-1.3, 0.5, -0.15], [-0.8, 0.51, -0.15], [-0.32, 0.52, -0.15], [-0.24, 0.58, -0.15]],
      0.012, 80, 4, true,
    ),
    ...wire(new THREE.TorusGeometry(0.12, 0.01, 3, 20), mat([-1.3, 0.62, -0.15])),
    ...wire(new THREE.TorusGeometry(0.06, 0.01, 3, 14), mat([-0.32, 0.58, -0.15])),
  ],

  'clutch-cable': () => tubeAlong(
    [[0.92, 1.68, 0.38], [0.8, 1.45, 0.28], [0.35, 0.9, 0.3], [-0.1, 0.7, 0.3], [-0.18, 0.64, 0.29]],
    0.01, 40, 4,
  ),

  'front-tyre': () => wheelParts(1.3, 0.62),
  'rear-tyre': () => wheelParts(-1.3, 0.62),

  // The owner's manual lists a 130 mm internal-expanding DRUM at the front, so the
  // catalogue's "disc" id is drawn as a drum and "brake pads" as the two shoes.
  'front-brake-disc': () => [
    ...cyl(0.2, 0.2, 0.1, [1.3, 0.62, 0.06], ALONG_Z, 18),
    ...circlePoints(1.3, 0.62, 0.115, 0.16, 24).flatMap(([a, b]) => [...a, ...b]),
    ...between([1.3, 0.62, 0.1], [1.3, 0.62, 0.17], 0.035, 8),
    ...between([1.3, 0.82, 0.1], [1.12, 1.2, 0.12], 0.008, 4),
  ],

  'brake-pads': () => [
    ...arcPoints(1.3, 0.62, 0.075, 0.15, 0.35, 2.8, 14).flatMap(([a, b]) => [...a, ...b]),
    ...arcPoints(1.3, 0.62, 0.075, 0.15, 3.5, 5.95, 14).flatMap(([a, b]) => [...a, ...b]),
    ...arcPoints(1.3, 0.62, 0.075, 0.12, 0.35, 2.8, 14).flatMap(([a, b]) => [...a, ...b]),
    ...arcPoints(1.3, 0.62, 0.075, 0.12, 3.5, 5.95, 14).flatMap(([a, b]) => [...a, ...b]),
  ],

  'wheel-bearings': () => [
    ...cyl(0.06, 0.06, 0.04, [1.3, 0.62, -0.06], ALONG_Z, 10),
    ...wire(new THREE.TorusGeometry(0.045, 0.008, 3, 14), mat([1.3, 0.62, -0.06])),
  ],

  'rear-brake-drum': () => [
    ...cyl(0.22, 0.22, 0.1, [-1.3, 0.62, 0.06], ALONG_Z, 16),
    ...circlePoints(-1.3, 0.62, 0.115, 0.17, 24).flatMap(([a, b]) => [...a, ...b]),
    ...between([-1.3, 0.62, 0.1], [-1.3, 0.62, 0.2], 0.04, 8),
  ],
};

// Ground rings under the wheels, like the concentric rings in the reference.
export function groundRingSegments() {
  const out = [];
  for (const cx of [1.3, -1.3]) {
    for (const r of [0.85, 1.05]) {
      for (let i = 0; i < 64; i += 1) {
        const a = (i / 64) * Math.PI * 2;
        const b = ((i + 1) / 64) * Math.PI * 2;
        out.push(cx + Math.cos(a) * r, 0.004, Math.sin(a) * r * 0.55, cx + Math.cos(b) * r, 0.004, Math.sin(b) * r * 0.55);
      }
    }
  }
  return out;
}

/** @returns {Map<string, Float32Array>} id -> line-segment positions (assembled pose) */
export function buildBikeSegments() {
  const result = new Map();
  for (const [id, build] of Object.entries(BUILDERS)) {
    result.set(id, new Float32Array(build()));
  }
  return result;
}
