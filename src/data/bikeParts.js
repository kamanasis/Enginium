// Part registry for the blueprint viewer. Plain data, no three.js, so any
// screen can ask "does this part have 3D geometry?" without loading the viewer.
//
// IDs match the catalogue ids in vehicles.js. The geometry behind them
// (src/viewer/bikeGeometry.js) is a STYLISED PLACEHOLDER built from primitives:
// it is not Hero Splendor Plus CAD and its internals are not dimensionally
// accurate. A real separable model replaces it by providing the same ids.
//
// Coordinates: x forward, y up, z right-hand side (the default camera sees the
// right side). So the rider's LEFT side is -z and the RIGHT side is +z.
//
// Explosion rule (see src/viewer/bikeScene.js):
//   displacement(part) = offset * smoothstep((e - start) / (1 - start)) * boost
// where e (0..1) comes from camera distance. It is a pure function of e, so
// e = 0 is exactly the assembled pose and nothing can drift.
//
//   offset     full-explosion displacement [x, y, z]
//   start      explosion factor at which this part begins to move
//   group      subsystem; parts sharing the focused part's group separate further
//   placement  how well the SIDE / POSITION is backed up (see PLACEMENT_LEVELS)
//   source     where the placement comes from, in plain words

export const BIKE_MODEL = {
  id: 'placeholder-bike-v3',
  code: 'PLACEHOLDER_BIKE_V3',
  isPlaceholder: true,
  note: 'Stylised placeholder, not manufacturer CAD. Overall proportions follow the published Hero Splendor+ dimensions (BIKE_SPEC); left/right placement follows the Hero documents where they state it, see each part\'s placement level.',
};

// Published dimensions the geometry is scaled to. Source: Hero Splendor+ FI
// owner's manual (Dec 2021), specifications, pages 5 and 6 (checked against
// the 91Wheels listing for length, width, height, wheelbase, clearance, seat).
// These are for the fuel-injected (BS6, cast wheel, drum) variant. The
// catalogue in vehicles.js also lists carburettor-era parts, so confirm the
// exact variant before treating every number as that bike's.
export const BIKE_SPEC = {
  source: 'Hero Splendor+ FI owner\'s manual (Dec 2021), pp. 5-6',
  lengthMm: 2000,
  widthMm: 720,
  heightMm: 1052,
  wheelbaseMm: 1236,
  seatHeightMm: 785,
  groundClearanceMm: 165,
  casterDeg: 26,
  trailMm: 80,
  tyreWidthMm: 80,
  tyreAspectPercent: 100, // 80/100-18: sidewall height = 100% of the 80 mm width
  rimInch: 18,
  frontBrakeDrumMm: 130,
  rearBrakeDrumMm: 130,
  finalDriveTeeth: { front: 14, rear: 44 }, // 44/14 = 3.143 (manual); catalogue lists the same sprockets
  engineCc: 97.2,
  boreStrokeMm: [50.0, 49.5],
};

export const PLACEMENT_LEVELS = {
  manual: 'Side or position stated in a Hero document: the Splendor+ owner\'s manuals (FI era, 2020 to 2023), the Splendor PRO owner\'s manual (carburettor era) or the Splendor PRO parts catalogue (Feb 2017).',
  inferred: 'Not stated outright; follows from a manual procedure or standard layout of this bike class.',
  approximate: 'Not stated in the manuals I could read. Indicative only: check the real bike.',
};

const M = 'manual';
const I = 'inferred';
const A = 'approximate';

export const BIKE_PARTS = [
  // Chassis: the frame stays put as the reference everything separates from.
  { id: 'main-chassis', group: 'chassis', offset: [0, 0, 0], start: 0, placement: I, source: 'Centre-line diamond/cradle frame.' },
  { id: 'seat', group: 'chassis', offset: [-0.2, 1.0, 0], start: 0.05, selectable: false, placement: I, source: 'Centre-line, above the rear frame.' },
  { id: 'swingarm', group: 'chassis', offset: [-0.8, -0.5, 0], start: 0.25, placement: I, source: 'Both sides of the rear wheel (manual: chain adjusters on both sides of the swing arm; catalogue lists adjusters R and L). Pivot position is an estimate.' },
  { id: 'rear-shock-absorbers', group: 'chassis', offset: [-0.4, 1.0, 0], start: 0.2, placement: I, source: 'Twin rear shocks, one each side.' },
  { id: 'telescopic-forks', group: 'chassis', offset: [0.9, 0, 0], start: 0.2, placement: I, source: 'Twin telescopic fork legs, one each side.' },
  { id: 'switchgear-throttle', group: 'chassis', offset: [-0.3, 0.9, 0], start: 0.2, placement: M, source: 'Handlebar: clutch lever and clutch switch are on the left handlebar controls.' },
  { id: 'utility-box', group: 'chassis', offset: [-0.3, 0.5, 0.9], start: 0.3, selectable: false, placement: M, source: 'Right side view lists the utility box; the tool kit is stored in it.' },
  { id: 'side-stand', group: 'chassis', offset: [0, -0.3, -0.8], start: 0.3, selectable: false, placement: M, source: 'Left side view lists the side stand and its switch.' },
  { id: 'main-stand', group: 'chassis', offset: [-0.1, -0.4, 0], start: 0.3, selectable: false, placement: M, source: 'Left side view lists the main stand.' },

  // Fuel and intake
  { id: 'fuel-tank', group: 'fuel', offset: [0.1, 1.1, 0], start: 0, placement: M, source: 'Right side view lists the fuel tank; cap is in the top view.' },
  { id: 'fuel-cock', group: 'fuel', offset: [0.3, -0.55, -0.7], start: 0.4, placement: M, source: 'Splendor PRO owner\'s manual (carburettor model): "The three way fuel valve is on the left side of the carburetor", and it is listed in the left side view. The FI Splendor+ has no fuel cock.' },
  { id: 'carburetor', group: 'fuel', offset: [-0.4, 0.55, -0.4], start: 0.3, placement: M, source: 'Splendor PRO owner\'s manual lists the carburettor in the left side view beside the fuel valve; the FI Splendor+ manual lists its throttle body there too. Fore-aft position (behind the cylinder head) follows from the intake path to the air cleaner.' },
  { id: 'air-filter', group: 'fuel', offset: [-1.0, 0.6, -0.9], start: 0.25, placement: M, source: 'Splendor+ Xtec owner\'s manual (May 2024, p. 51): the air cleaner element is reached by removing the left side cover.' },
  { id: 'exhaust-muffler', group: 'fuel', offset: [-0.3, -0.65, 0.9], start: 0.2, placement: M, source: 'Right side view lists the exhaust muffler.' },

  // Engine
  { id: 'crankcase', group: 'engine', offset: [0, -0.25, 0], start: 0.1, selectable: false, placement: I, source: 'Centre of the bike, low.' },
  { id: 'cylinder-block', group: 'engine', offset: [0.25, 1.0, 0], start: 0.1, placement: I, source: 'Single cylinder, tilted forward above the crankcase.' },
  { id: 'spark-plug', group: 'engine', offset: [0.3, 1.15, 0.7], start: 0.4, placement: A, source: 'No Hero document read (FI manual 2021, Splendor PRO manual, parts catalogue) says which side of the head the plug is on. The head has a side cover on both sides. Right side kept from the app\'s own catalogue text: check the real bike.' },
  { id: 'valves-tappets', group: 'engine', offset: [0.35, 1.0, -0.8], start: 0.5, placement: M, source: 'Parts catalogue lists both "COVER,R CYLINDER HEAD SIDE" and "COVER,L CYLINDER HEAD SIDE"; the FI manual checks valve clearance through the LEFT cover.' },
  { id: 'camshaft-timing', group: 'engine', offset: [0.3, 1.6, 0], start: 0.5, placement: I, source: 'Timing mark is read on the LEFT crankcase cover; drive end on the left.' },
  { id: 'crankshaft', group: 'engine', offset: [-0.1, -0.9, -0.4], start: 0.5, placement: I, source: 'Across the crankcase.' },
  { id: 'clutch-assembly', group: 'engine', offset: [-0.2, -0.25, 1.1], start: 0.4, placement: M, source: 'Parts catalogue lists "COVER COMP.R CRANK CASE" (right crankcase cover); the manual adjusts clutch free play at the right and the kick starter is on the right.' },
  { id: 'stator-magneto', group: 'engine', offset: [0, -0.1, -1.2], start: 0.4, placement: M, source: 'Splendor PRO parts catalogue (group E-7) lists the A.C. generator under "COVER L CRANKCASE"; the manual puts the timing mark on the left crankcase cover.' },
  { id: 'gearbox', group: 'engine', offset: [-0.4, -0.95, 0.2], start: 0.55, placement: I, source: 'Inside the crankcase, behind the crankshaft.' },
  { id: 'starter-motor', group: 'engine', offset: [0.4, -0.1, 1.0], start: 0.5, placement: M, source: 'Right side view lists the starter motor.' },

  // Electrical
  { id: 'battery', group: 'electrical', offset: [-0.5, -0.3, 1.0], start: 0.3, placement: M, source: 'Manual: "The battery is located behind the right side cover."' },
  { id: 'ignition-coil', group: 'electrical', offset: [0.2, 0.8, -0.9], start: 0.5, placement: A, source: 'Not located in any Hero document read. The catalogue groups coil, CDI (carburettor models), regulator-rectifier, battery and harness on one plate with no sides. Drawn under the tank, left of centre.' },
  { id: 'regulator-rectifier', group: 'electrical', offset: [-1.0, 0.5, -1.0], start: 0.4, placement: A, source: 'Not located in the manuals.' },
  { id: 'wiring-harness', group: 'electrical', offset: [0, 0.3, -1.1], start: 0.4, placement: I, source: 'Runs the length of the frame; ECU and fuse boxes are on the battery clamp / left side.' },
  { id: 'headlight-assembly', group: 'electrical', offset: [0.9, 0.3, 0], start: 0.1, placement: I, source: 'Front, centre-line, above the front wheel.' },
  { id: 'instrument-cluster', group: 'electrical', offset: [0.3, 1.0, 0], start: 0.15, placement: I, source: 'Handlebar centre, above the headlamp.' },

  // Drive and controls
  { id: 'chain', group: 'drive', offset: [-0.2, -0.55, -1.2], start: 0.35, placement: I, source: 'No document states the side outright. Catalogue lists "COVER REAR LEFT CRANKCASE" and upper and lower drive chain case halves; clutch and kick starter are on the right, so the 14T sprocket and chain are on the left.' },
  { id: 'clutch-cable', group: 'drive', offset: [0, 0.6, 1.1], start: 0.45, placement: I, source: 'Lever on the left handlebar; cable runs to the clutch cover.' },
  { id: 'kick-starter', group: 'drive', offset: [0, -0.3, 1.0], start: 0.4, selectable: false, placement: M, source: 'Right side view lists the kick starter pedal.' },
  { id: 'brake-pedal', group: 'drive', offset: [0.1, -0.4, 1.0], start: 0.4, selectable: false, placement: M, source: 'Right side view lists the rear brake pedal.' },

  // Wheels and brakes. Both brakes are 130 mm internal-expanding DRUMS.
  { id: 'front-tyre', group: 'wheels', offset: [1.7, 0, 0], start: 0.3, placement: I, source: 'Front wheel on the fork.' },
  { id: 'front-brake-disc', group: 'wheels', offset: [1.7, 0, 1.0], start: 0.45, placement: M, source: 'Catalogue id says disc, but the owner\'s manual lists a 130 mm internal-expanding DRUM front brake, so a drum is drawn. Which side the brake arm sits on is not stated.' },
  { id: 'brake-pads', group: 'wheels', offset: [1.7, 0.35, 1.5], start: 0.5, placement: M, source: 'Shown as the two brake shoes inside the 130 mm front drum (catalogue id kept).' },
  { id: 'wheel-bearings', group: 'wheels', offset: [1.7, 0, -0.9], start: 0.5, placement: I, source: 'At the front hub.' },
  { id: 'rear-tyre', group: 'wheels', offset: [-1.7, 0, 0], start: 0.3, placement: I, source: 'Rear wheel on the swingarm.' },
  { id: 'rear-brake-drum', group: 'wheels', offset: [-1.7, 0, 1.0], start: 0.45, placement: M, source: '130 mm drum; the rear brake pedal is on the right, so the drum is on the right.' },
];

/** Catalogue ids that can be selected, targeted and marked in the viewer. */
export const BIKE_PART_IDS = new Set(
  BIKE_PARTS.filter((part) => part.selectable !== false).map((part) => part.id),
);

/**
 * Universal cross-model translation table connecting vehicle catalogue parts
 * to their respective physical wireframe nodes in the 3D blueprint viewer.
 */
export const VEHICLE_PART_TO_3D = {
  // Wheels, Rims & Tyres
  'front-wheel': 'front-tyre',
  'front-tyre': 'front-tyre',
  'rear-wheel': 'rear-tyre',
  'rear-tyre': 'rear-tyre',
  'wheel-bearings': 'wheel-bearings',
  'steering-bearings': 'wheel-bearings',

  // Brakes, Shoes & CBS Equalizer
  'front-drum-brake': 'front-brake-disc',
  'front-brake-disc': 'front-brake-disc',
  'rear-drum-brake': 'rear-brake-drum',
  'rear-brake-drum': 'rear-brake-drum',
  'brake-pads': 'brake-pads',
  'cbs-equalizer': 'brake-pads',
  'brake-rod-linkage': 'rear-brake-drum',
  'brake-cable-rod': 'rear-brake-drum',
  'cush-drive': 'rear-brake-drum',

  // Suspension & Swingarm
  'front-telescopic-forks': 'telescopic-forks',
  'telescopic-forks': 'telescopic-forks',
  'rear-shock-absorber': 'rear-shock-absorbers',
  'rear-shock-absorbers': 'rear-shock-absorbers',
  'rear-nitrox-shocks': 'rear-shock-absorbers',
  'swingarm': 'swingarm',

  // Frame, Chassis & Stands
  'chassis-frame': 'main-chassis',
  'main-chassis': 'main-chassis',
  'center-side-stand': 'main-chassis',
  'stands-footpegs': 'main-chassis',
  'side-stand': 'main-chassis',
  'main-stand': 'main-chassis',
  'seat': 'main-chassis',
  'utility-box': 'main-chassis',

  // Cockpit, Lights & Switches
  'led-headlight': 'headlight-assembly',
  'headlight-assembly': 'headlight-assembly',
  'instrument-cluster': 'instrument-cluster',
  'multi-switchgear': 'switchgear-throttle',
  'switchgear-throttle': 'switchgear-throttle',

  // Electrical, Starter & Regulators
  'battery': 'battery',
  'wiring-harness': 'wiring-harness',
  'acg-starter': 'starter-motor',
  'starter-motor': 'starter-motor',
  'stator-magneto': 'stator-magneto',
  'cooling-fan': 'stator-magneto',
  'ecu-module': 'regulator-rectifier',
  'cdi-unit': 'regulator-rectifier',
  'cdi-bcu': 'regulator-rectifier',
  'regulator-rectifier': 'regulator-rectifier',
  'ignition-coil': 'ignition-coil',

  // Engine, Valves & Lubrication
  'spark-plug': 'spark-plug',
  'cylinder-block': 'cylinder-block',
  'piston-rings': 'cylinder-block',
  'valves-tappets': 'valves-tappets',
  'camshaft-timing': 'camshaft-timing',
  'crankcase': 'cylinder-block',
  'crankshaft': 'crankshaft',
  'variator-rollers': 'crankshaft',
  'engine-oil': 'cylinder-block',
  'oil-filter': 'cylinder-block',

  // Fuel Induction & Exhaust
  'fuel-tank': 'fuel-tank',
  'fuel-pump': 'fuel-cock',
  'fuel-cock': 'fuel-cock',
  'throttle-body': 'carburetor',
  'carburetor-fi': 'carburetor',
  'carburetor': 'carburetor',
  'air-filter': 'air-filter',
  'exhaust-muffler': 'exhaust-muffler',
  'oxygen-sensor': 'exhaust-muffler',
  'catalytic-converter': 'exhaust-muffler',

  // Drive, Belt, Gearbox & Clutch
  'v-belt': 'chain',
  'chain': 'chain',
  'centrifugal-clutch': 'clutch-assembly',
  'clutch-bell': 'clutch-assembly',
  'clutch-assembly': 'clutch-assembly',
  'clutch-cable': 'clutch-cable',
  'final-gearbox': 'gearbox',
  'gearbox': 'gearbox',
};

export const D3_TO_VEHICLE_PARTS = {
  'front-tyre': ['front-tyre', 'front-wheel'],
  'rear-tyre': ['rear-tyre', 'rear-wheel'],
  'main-chassis': ['main-chassis', 'chassis-frame', 'center-side-stand', 'stands-footpegs'],
  'telescopic-forks': ['telescopic-forks', 'front-telescopic-forks'],
  'rear-shock-absorbers': ['rear-shock-absorbers', 'rear-shock-absorber', 'rear-nitrox-shocks'],
  'front-brake-disc': ['front-brake-disc', 'front-drum-brake', 'brake-pads'],
  'rear-brake-drum': ['rear-brake-drum', 'rear-drum-brake', 'cush-drive', 'brake-rod-linkage', 'brake-cable-rod'],
  'brake-pads': ['brake-pads', 'front-drum-brake', 'cbs-equalizer'],
  'wheel-bearings': ['wheel-bearings', 'steering-bearings'],
  'headlight-assembly': ['headlight-assembly', 'led-headlight'],
  'switchgear-throttle': ['switchgear-throttle', 'multi-switchgear'],
  'instrument-cluster': ['instrument-cluster', 'multi-switchgear'],
  'fuel-tank': ['fuel-tank'],
  'fuel-cock': ['fuel-cock', 'fuel-pump'],
  'carburetor': ['carburetor', 'throttle-body', 'carburetor-fi'],
  'air-filter': ['air-filter'],
  'exhaust-muffler': ['exhaust-muffler', 'oxygen-sensor', 'catalytic-converter'],
  'cylinder-block': ['cylinder-block', 'piston-rings', 'engine-oil'],
  'spark-plug': ['spark-plug'],
  'valves-tappets': ['valves-tappets'],
  'camshaft-timing': ['camshaft-timing'],
  'crankshaft': ['crankshaft', 'variator-rollers'],
  'clutch-assembly': ['clutch-assembly', 'centrifugal-clutch', 'clutch-bell'],
  'gearbox': ['gearbox', 'final-gearbox'],
  'stator-magneto': ['stator-magneto', 'cooling-fan', 'acg-starter'],
  'starter-motor': ['starter-motor', 'acg-starter'],
  'battery': ['battery'],
  'ignition-coil': ['ignition-coil', 'spark-plug', 'wiring-harness'],
  'regulator-rectifier': ['regulator-rectifier', 'ecu-module', 'cdi-unit', 'cdi-bcu'],
  'wiring-harness': ['wiring-harness'],
  'chain': ['chain', 'v-belt'],
  'clutch-cable': ['clutch-cable', 'cbs-equalizer', 'rear-drum-brake', 'centrifugal-clutch'],
  'swingarm': ['swingarm', 'rear-shock-absorber', 'rear-nitrox-shocks', 'rear-wheel'],
};

/**
 * Resolves a vehicle part ID to its corresponding 3D blueprint node ID.
 * @param {string|null} vehiclePartId
 * @returns {string|null}
 */
export function resolveBlueprintPartId(vehiclePartId) {
  if (!vehiclePartId) return null;
  if (BIKE_PART_IDS.has(vehiclePartId)) return vehiclePartId;
  const mapped = VEHICLE_PART_TO_3D[vehiclePartId];
  if (mapped && BIKE_PART_IDS.has(mapped)) return mapped;
  return null;
}

/**
 * Resolves a 3D blueprint node ID to the matching catalogue part in the selected vehicle.
 * @param {string|null} d3Id
 * @param {Array<Object>} vehicleParts
 * @returns {Object|null}
 */
export function resolveVehiclePart(d3Id, vehicleParts) {
  if (!d3Id || !Array.isArray(vehicleParts) || vehicleParts.length === 0) return null;
  // 1. Direct ID match
  const direct = vehicleParts.find((p) => p.id === d3Id);
  if (direct) return direct;
  // 2. Candidate mapping match
  const candidates = D3_TO_VEHICLE_PARTS[d3Id] || [];
  for (const cId of candidates) {
    const match = vehicleParts.find((p) => p.id === cId);
    if (match) return match;
  }
  return null;
}

/**
 * Generates an ID-to-display-name map so 3D blueprint nodes display the active vehicle's authentic part names.
 * @param {Array<Object>} vehicleParts
 * @returns {Record<string, string>}
 */
export function getVehicleBlueprintNames(vehicleParts) {
  const names = {};
  if (!Array.isArray(vehicleParts)) return names;
  for (const p of vehicleParts) {
    names[p.id] = p.name;
    const d3Id = VEHICLE_PART_TO_3D[p.id];
    if (d3Id && !names[d3Id]) names[d3Id] = p.name;
  }
  for (const part of BIKE_PARTS) {
    if (!names[part.id]) {
      const vPart = resolveVehiclePart(part.id, vehicleParts);
      if (vPart) names[part.id] = vPart.name;
    }
  }
  return names;
}

