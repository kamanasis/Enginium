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
  id: 'placeholder-bike-v2',
  code: 'PLACEHOLDER_BIKE_V2',
  isPlaceholder: true,
  note: 'Stylised placeholder, not manufacturer CAD. Left/right placement follows the Hero owner\'s manuals where they state it; see each part\'s placement level.',
};

export const PLACEMENT_LEVELS = {
  manual: 'Side or position stated in the Hero Splendor+ owner\'s manual (FI-era manuals, 2020 to 2023).',
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
  { id: 'swingarm', group: 'chassis', offset: [-0.8, -0.5, 0], start: 0.25, placement: I, source: 'Both sides of the rear wheel (manual: chain adjusters act on both sides of the swing arm).' },
  { id: 'rear-shock-absorbers', group: 'chassis', offset: [-0.4, 1.0, 0], start: 0.2, placement: I, source: 'Twin rear shocks, one each side.' },
  { id: 'telescopic-forks', group: 'chassis', offset: [0.9, 0, 0], start: 0.2, placement: I, source: 'Twin telescopic fork legs, one each side.' },
  { id: 'switchgear-throttle', group: 'chassis', offset: [-0.3, 0.9, 0], start: 0.2, placement: M, source: 'Handlebar: clutch lever and clutch switch are on the left handlebar controls.' },
  { id: 'utility-box', group: 'chassis', offset: [-0.3, 0.5, 0.9], start: 0.3, selectable: false, placement: M, source: 'Right side view lists the utility box; the tool kit is stored in it.' },
  { id: 'side-stand', group: 'chassis', offset: [0, -0.3, -0.8], start: 0.3, selectable: false, placement: M, source: 'Left side view lists the side stand and its switch.' },
  { id: 'main-stand', group: 'chassis', offset: [-0.1, -0.4, 0], start: 0.3, selectable: false, placement: M, source: 'Left side view lists the main stand.' },

  // Fuel and intake
  { id: 'fuel-tank', group: 'fuel', offset: [0.1, 1.1, 0], start: 0, placement: M, source: 'Right side view lists the fuel tank; cap is in the top view.' },
  { id: 'fuel-cock', group: 'fuel', offset: [0.3, -0.55, -0.7], start: 0.4, placement: A, source: 'The FI manuals have no fuel cock. Carburetted bikes usually carry it low on the tank, left side.' },
  { id: 'carburetor', group: 'fuel', offset: [-0.4, 0.55, -0.4], start: 0.3, placement: A, source: 'Manuals are fuel-injected: throttle body is on the left side view. Carburetted layout assumed similar, behind the cylinder.' },
  { id: 'air-filter', group: 'fuel', offset: [-1.0, 0.6, -0.9], start: 0.25, placement: I, source: 'Element is serviced by removing the LEFT side cover.' },
  { id: 'exhaust-muffler', group: 'fuel', offset: [-0.3, -0.65, 0.9], start: 0.2, placement: M, source: 'Right side view lists the exhaust muffler.' },

  // Engine
  { id: 'crankcase', group: 'engine', offset: [0, -0.25, 0], start: 0.1, selectable: false, placement: I, source: 'Centre of the bike, low.' },
  { id: 'cylinder-block', group: 'engine', offset: [0.25, 1.0, 0], start: 0.1, placement: I, source: 'Single cylinder, tilted forward above the crankcase.' },
  { id: 'spark-plug', group: 'engine', offset: [0.3, 1.15, 0.7], start: 0.4, placement: A, source: 'Side is not stated in the manuals; kept on the right as in the app\'s own catalogue text.' },
  { id: 'valves-tappets', group: 'engine', offset: [0.35, 1.0, -0.8], start: 0.5, placement: M, source: 'Valve clearance is checked by removing the cylinder head LEFT side cover.' },
  { id: 'camshaft-timing', group: 'engine', offset: [0.3, 1.6, 0], start: 0.5, placement: I, source: 'Timing mark is read on the LEFT crankcase cover; drive end on the left.' },
  { id: 'crankshaft', group: 'engine', offset: [-0.1, -0.9, -0.4], start: 0.5, placement: I, source: 'Across the crankcase.' },
  { id: 'clutch-assembly', group: 'engine', offset: [-0.2, -0.25, 1.1], start: 0.4, placement: M, source: 'Clutch free play is adjusted via the RIGHT side; right crankcase cover holds the centrifugal filter.' },
  { id: 'stator-magneto', group: 'engine', offset: [0, -0.1, -1.2], start: 0.4, placement: I, source: 'Timing mark sits on the LEFT crankcase cover, which also carries the alternator.' },
  { id: 'gearbox', group: 'engine', offset: [-0.4, -0.95, 0.2], start: 0.55, placement: I, source: 'Inside the crankcase, behind the crankshaft.' },
  { id: 'starter-motor', group: 'engine', offset: [0.4, -0.1, 1.0], start: 0.5, placement: M, source: 'Right side view lists the starter motor.' },

  // Electrical
  { id: 'battery', group: 'electrical', offset: [-0.5, -0.3, 1.0], start: 0.3, placement: M, source: 'Manual: "The battery is located behind the right side cover."' },
  { id: 'ignition-coil', group: 'electrical', offset: [0.2, 0.8, -0.9], start: 0.5, placement: A, source: 'Not located in the manuals; under the tank, left of centre.' },
  { id: 'regulator-rectifier', group: 'electrical', offset: [-1.0, 0.5, -1.0], start: 0.4, placement: A, source: 'Not located in the manuals.' },
  { id: 'wiring-harness', group: 'electrical', offset: [0, 0.3, -1.1], start: 0.4, placement: I, source: 'Runs the length of the frame; ECU and fuse boxes are on the battery clamp / left side.' },
  { id: 'headlight-assembly', group: 'electrical', offset: [0.9, 0.3, 0], start: 0.1, placement: I, source: 'Front, centre-line, above the front wheel.' },
  { id: 'instrument-cluster', group: 'electrical', offset: [0.3, 1.0, 0], start: 0.15, placement: I, source: 'Handlebar centre, above the headlamp.' },

  // Drive and controls
  { id: 'chain', group: 'drive', offset: [-0.2, -0.55, -1.2], start: 0.35, placement: I, source: 'Manual does not give the side. Kick starter and clutch are on the right, so the sprocket and chain are on the left.' },
  { id: 'clutch-cable', group: 'drive', offset: [0, 0.6, 1.1], start: 0.45, placement: I, source: 'Lever on the left handlebar; cable runs to the clutch cover.' },
  { id: 'kick-starter', group: 'drive', offset: [0, -0.3, 1.0], start: 0.4, selectable: false, placement: M, source: 'Right side view lists the kick starter pedal.' },
  { id: 'brake-pedal', group: 'drive', offset: [0.1, -0.4, 1.0], start: 0.4, selectable: false, placement: M, source: 'Right side view lists the rear brake pedal.' },

  // Wheels and brakes. Both brakes are 130 mm internal-expanding DRUMS.
  { id: 'front-tyre', group: 'wheels', offset: [1.7, 0, 0], start: 0.3, placement: I, source: 'Front wheel on the fork.' },
  { id: 'front-brake-disc', group: 'wheels', offset: [1.7, 0, 1.0], start: 0.45, placement: M, source: 'Catalogue calls this a disc, but the owner\'s manual lists a 130 mm DRUM front brake, so a drum is drawn.' },
  { id: 'brake-pads', group: 'wheels', offset: [1.7, 0.35, 1.5], start: 0.5, placement: M, source: 'Shown as the two brake shoes inside the 130 mm front drum (catalogue id kept).' },
  { id: 'wheel-bearings', group: 'wheels', offset: [1.7, 0, -0.9], start: 0.5, placement: I, source: 'At the front hub.' },
  { id: 'rear-tyre', group: 'wheels', offset: [-1.7, 0, 0], start: 0.3, placement: I, source: 'Rear wheel on the swingarm.' },
  { id: 'rear-brake-drum', group: 'wheels', offset: [-1.7, 0, 1.0], start: 0.45, placement: M, source: '130 mm drum; the rear brake pedal is on the right, so the drum is on the right.' },
];

/** Catalogue ids that can be selected, targeted and marked in the viewer. */
export const BIKE_PART_IDS = new Set(
  BIKE_PARTS.filter((part) => part.selectable !== false).map((part) => part.id),
);
