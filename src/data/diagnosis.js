// Rule-based symptom triage for the Diagnose view.
//
// This is NOT a language model and it does not read the vehicle. It maps a
// described symptom to a "family", asks a few yes / no / not-sure questions,
// and ranks catalogue parts with fixed, readable rules. Everything it names is
// resolved against the selected vehicle's own parts list in vehicles.js, so a
// part id the vehicle does not have can never be recommended.
//
// The percentage shown to the user is a "rule match": the points a part earned
// divided by the most points any candidate could have earned for that symptom,
// capped at 90%. Parts are ordered by the same points, so order and percentage
// always agree. It is not a probability of failure.

/**
 * Contract between the diagnosis flow and the 3D viewer.
 * @typedef {Object} PartInspectionRequest
 * @property {string} vehicleId
 * @property {string} targetPartId     catalogue id from vehicles.js
 * @property {number} [confidence]     0..1 rule match, not a probability
 * @property {string} [reason]
 * @property {'component'|'subsystem'|'assembly'} [inspectionLevel]
 * @property {string[]} [relatedPartIds]
 */

const MATCH_CAP = 0.9;
const MAX_CAUSES = 3;

// Checked before anything else. These are not DIY situations.
const STOP_RULES = [
  {
    id: 'fuel-leak',
    pattern: /\b(fuel|petrol|gas)\b.*\b(leak|leaking|dripping|smell)|\b(smell|smells)\b.*\b(fuel|petrol)\b|\b(leaking|dripping)\b.*\b(fuel|petrol)\b/,
    title: 'Possible fuel leak',
    message: 'Stop riding and switch the engine off. Keep away from sparks, flames and hot parts, and move the bike to open air. Do not start it again until a qualified technician has found the source of the fuel smell or leak.',
  },
  {
    id: 'smoke-fire',
    pattern: /\b(on fire|fire|flames?|smoking|thick smoke)\b/,
    title: 'Smoke or fire',
    message: 'Stop, switch the engine off and move away from the bike. If there are flames, do not try to fight them near the fuel tank. Call emergency services. Do not ride the bike again until it has been inspected.',
  },
  {
    id: 'brake-failure',
    pattern: /\b(no brakes?|brakes? (fail|failed|failing|not working|stopped working|gone)|lost (my )?brakes?|brakes? (feel )?(soft|spongy|weak))\b/,
    title: 'Braking problem',
    message: 'Do not ride the bike. Weak, soft or failing brakes are a safety-critical fault. Have it transported or inspected by a qualified mechanic before it goes on the road.',
  },
];

const FAMILIES = [
  {
    id: 'hard-start',
    label: 'Starting trouble',
    keywords: ['start', 'crank', 'kick', 'turn over', 'cold', 'morning', 'dead'],
    base: { battery: 2, 'spark-plug': 2, carburetor: 2, 'fuel-cock': 1, 'air-filter': 1, 'starter-motor': 1 },
    why: {
      battery: 'A weak battery or poor terminal contact is a common reason an engine cranks slowly or not at all.',
      'spark-plug': 'A worn, fouled or wet spark plug can make the mixture hard to light, especially on a cold or damp start.',
      carburetor: 'A carburetted engine relies on a correct cold-start mixture, so gummed or badly set fuel metering shows up first as hard starting.',
      'fuel-cock': 'If the fuel tap is off or blocked, fuel may never reach the engine. It is the quickest thing to rule out.',
      'air-filter': 'A heavily clogged air filter can starve the engine of air and make starting harder.',
      'starter-motor': 'If the starter does not turn the engine at all, the starter motor or its supply may be at fault.',
    },
    questions: [
      { id: 'cranks', text: 'When you use the starter (button or kick), does the engine turn over at a normal speed?', yes: { 'spark-plug': 1, carburetor: 1, 'fuel-cock': 1, 'air-filter': 1 }, no: { battery: 3, 'starter-motor': 2 } },
      { id: 'cold', text: 'Is it mainly hard to start when the engine is cold, such as in the morning?', yes: { carburetor: 2, 'spark-plug': 1 }, no: { battery: 1 } },
      { id: 'fuel', text: 'Have you confirmed there is fuel in the tank and the fuel tap (if your bike has one) is turned on?', yes: { 'fuel-cock': -1 }, no: { 'fuel-cock': 4 } },
    ],
    warning: 'Do not spray starter fluid into a hot engine, and keep fuel away from sparks. Let the engine cool before touching exhaust or engine parts.',
  },
  {
    id: 'poor-pickup',
    label: 'Poor pickup or misfire',
    keywords: ['pickup', 'pick up', 'acceleration', 'accelerat', 'misfire', 'jerk', 'hesitat', 'sluggish', 'power', 'mileage', 'stall'],
    base: { 'spark-plug': 2, 'air-filter': 2, carburetor: 2, 'ignition-coil': 1 },
    why: {
      'spark-plug': 'A tired plug or a wrong gap can cause weak or missed sparks under load, which feels like hesitation.',
      'air-filter': 'A dirty air filter limits airflow and typically costs pickup and fuel economy.',
      carburetor: 'Worn or dirty fuel metering can lean out or flood the mixture and cause a jerky response.',
      'ignition-coil': 'A weak coil or cap can give an intermittent spark, which can feel like a misfire.',
    },
    questions: [
      { id: 'load', text: 'Does it get worse when you open the throttle hard or ride uphill?', yes: { carburetor: 1, 'air-filter': 1, 'spark-plug': 1 }, no: { 'ignition-coil': 1 } },
      { id: 'filter', text: 'Do you know that the air filter was cleaned or replaced recently?', yes: { 'air-filter': -1 }, no: { 'air-filter': 3 } },
      { id: 'plug', text: 'Do you know that the spark plug was checked or replaced within its service interval?', yes: { 'spark-plug': -1 }, no: { 'spark-plug': 3 } },
    ],
    warning: 'Let the engine cool before inspecting. Stop riding if the engine cuts out unpredictably in traffic.',
  },
  {
    id: 'rattle',
    label: 'Metallic rattle or tapping',
    keywords: ['rattle', 'metallic', 'tick', 'tap', 'knock', 'clatter', 'clink', 'rasp', 'noise', 'sound'],
    base: { 'valves-tappets': 2, 'camshaft-timing': 2, chain: 2, 'exhaust-muffler': 1 },
    why: {
      'valves-tappets': 'A light ticking that follows engine speed is often valve clearance that has drifted from its setting.',
      'camshaft-timing': 'A slack timing chain or worn tensioner can produce a rattle from the top of the engine.',
      chain: 'A dry or stretched drive chain rattles with road speed rather than engine speed.',
      'exhaust-muffler': 'A loose heat shield or muffler bracket is a common source of a harmless-sounding but irritating rattle.',
    },
    questions: [
      { id: 'revs', text: 'With the bike stationary, does the sound speed up and slow down with the engine revs?', yes: { 'valves-tappets': 3, 'camshaft-timing': 2 }, no: { chain: 3, 'exhaust-muffler': 1 } },
      { id: 'cold', text: 'Is it loudest when the engine is cold and quieter once it warms up?', yes: { 'valves-tappets': 2 }, no: { 'camshaft-timing': 1 } },
      { id: 'exhaust', text: 'Does the sound seem to come from the exhaust or its heat shield, near the silencer?', yes: { 'exhaust-muffler': 3 }, no: {} },
    ],
    warning: 'Heavy knocking from inside the engine, an oil warning light, or a sudden loss of power means stop riding and have the engine inspected. Do not touch a hot exhaust.',
  },
  {
    id: 'clutch',
    label: 'Clutch or gear shifting',
    keywords: ['clutch', 'gear', 'shift', 'slip', 'neutral', 'creep'],
    base: { 'clutch-cable': 3, 'clutch-assembly': 2, gearbox: 1 },
    why: {
      'clutch-cable': 'A stiff, frayed or badly adjusted cable stops the clutch releasing fully, which makes gears hard to select.',
      'clutch-assembly': 'Worn plates or weak springs let the clutch slip, so the revs rise without the bike speeding up.',
      gearbox: 'If gears will not select even with the clutch fully released, the fault may be inside the gearbox.',
    },
    questions: [
      { id: 'lever', text: 'Is the clutch lever unusually stiff, or does it have no free play at all?', yes: { 'clutch-cable': 3 }, no: {} },
      { id: 'slip', text: 'When you accelerate, do the revs rise without the bike speeding up to match?', yes: { 'clutch-assembly': 3, 'clutch-cable': 1 }, no: {} },
      { id: 'jump', text: 'Does it jump out of gear, or refuse to select a gear, even with the clutch fully pulled in?', yes: { gearbox: 3, 'clutch-assembly': 1 }, no: {} },
    ],
    warning: 'Wrong clutch adjustment can cause the bike to move off unexpectedly. Keep the bike in neutral on its stand and the engine off while you inspect.',
  },
  {
    id: 'brakes',
    label: 'Braking concern',
    keywords: ['brake', 'braking', 'squeal', 'squeak', 'grinding', 'stopping'],
    safetyCritical: true,
    base: { 'brake-pads': 3, 'front-brake-disc': 1, 'rear-brake-drum': 1, 'brake-cable-rod': 1 },
    why: {
      'brake-pads': 'Worn pads are the most common cause of squealing, grinding or reduced braking.',
      'front-brake-disc': 'A scored or warped disc can cause noise or a pulsing lever.',
      'rear-brake-drum': 'Worn shoes or a dirty drum can reduce rear braking or cause noise.',
      'brake-cable-rod': 'A stretched or poorly adjusted cable or rod lets the lever or pedal travel too far before the brake bites.',
    },
    questions: [
      { id: 'travel', text: 'Does the lever or pedal move further than usual before the brake starts to bite?', yes: { 'brake-cable-rod': 2, 'brake-pads': 1 }, no: {} },
      { id: 'noise', text: 'Is there a metallic grinding or a loud squeal when you brake?', yes: { 'brake-pads': 3, 'front-brake-disc': 1 }, no: {} },
    ],
    warning: 'Brakes are safety-critical. Do not ride if braking feels weak, soft or uneven. Have a qualified technician inspect the system and do any brake work.',
  },
  {
    id: 'electrical',
    label: 'Lights or electrical',
    keywords: ['light', 'headlight', 'dim', 'flicker', 'horn', 'charging', 'indicator', 'electrical'],
    base: { battery: 2, 'regulator-rectifier': 2, 'wiring-harness': 2, 'stator-magneto': 1, 'headlight-assembly': 1 },
    why: {
      battery: 'A weak battery gives dim lights and poor starting, especially at idle.',
      'regulator-rectifier': 'If the charging output is wrong, the lights can be dim or overly bright and the battery drains.',
      'wiring-harness': 'A loose or corroded connector can make lights flicker or drop out, often over bumps.',
      'stator-magneto': 'A weak charging coil gives low output at idle that improves as the revs rise.',
      'headlight-assembly': 'A failing bulb holder or connector in the headlight can cause dim or flickering light.',
    },
    questions: [
      { id: 'revs', text: 'Do the lights get noticeably brighter when you raise the engine revs?', yes: { 'stator-magneto': 2, 'regulator-rectifier': 1, battery: 1 }, no: { 'wiring-harness': 2, 'headlight-assembly': 2 } },
      { id: 'bumps', text: 'Do the lights or indicators flicker or cut out when you ride over bumps?', yes: { 'wiring-harness': 3 }, no: {} },
    ],
    warning: 'Switch the ignition off and disconnect the battery before touching wiring. Never bridge a fuse or bypass a safety switch.',
  },
];

export const UNKNOWN_SYMPTOM_HELP = 'I could not match that to a symptom I can work with yet. Try describing a starting problem, poor pickup or misfire, a metallic rattle, a clutch or gear issue, a braking concern, or dim or flickering lights.';

/**
 * Decide what a free-text description is about.
 * @returns {{type:'stop', stop:object} | {type:'family', family:object} | {type:'unknown'}}
 */
export function classifySymptom(text) {
  const lowered = text.toLowerCase();

  const stop = STOP_RULES.find((rule) => rule.pattern.test(lowered));
  if (stop) return { type: 'stop', stop };

  let best = null;
  let bestHits = 0;
  for (const family of FAMILIES) {
    const hits = family.keywords.filter((keyword) => new RegExp(`\\b${keyword}`).test(lowered)).length;
    if (hits > bestHits) {
      best = family;
      bestHits = hits;
    }
  }
  return best ? { type: 'family', family: best } : { type: 'unknown' };
}

function rankCauses(family, answers, vehicle) {
  const available = new Set(vehicle.parts.map((part) => part.id));

  const scored = Object.keys(family.base)
    .filter((partId) => available.has(partId))
    .map((partId) => {
      let score = family.base[partId];
      let max = family.base[partId];
      for (const question of family.questions) {
        const yes = question.yes[partId] ?? 0;
        const no = question.no[partId] ?? 0;
        // true = yes, false = no, null/undefined = "not sure" (no change)
        if (answers[question.id] === true) score += yes;
        else if (answers[question.id] === false) score += no;
        max += Math.max(0, yes, no);
      }
      return { partId, score: Math.max(0, score), max };
    });

  const ceiling = Math.max(1, ...scored.map((row) => row.max));
  return scored
    .filter((row) => row.score > 0)
    .map((row) => ({ partId: row.partId, score: row.score, match: Math.min(MATCH_CAP, row.score / ceiling) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CAUSES);
}

/**
 * Build the result object the Diagnose view renders, plus a
 * PartInspectionRequest for the 3D viewer. Returns null when the vehicle has
 * none of the parts this symptom could involve.
 */
export function buildDiagnosis(family, answers, vehicle) {
  const ranked = rankCauses(family, answers, vehicle);
  if (ranked.length === 0) return null;

  const partsById = new Map(vehicle.parts.map((part) => [part.id, part]));
  const top = partsById.get(ranked[0].partId);

  /** @type {PartInspectionRequest} */
  const inspectionRequest = {
    vehicleId: vehicle.id,
    targetPartId: top.id,
    confidence: ranked[0].match,
    reason: family.why[top.id],
    inspectionLevel: 'component',
    relatedPartIds: ranked.slice(1).map((row) => row.partId),
  };

  const safetyCritical = Boolean(family.safetyCritical);

  return {
    familyLabel: family.label,
    cause: `Start with: ${top.name}`,
    confidenceList: ranked.map((row) => ({
      partId: row.partId,
      name: partsById.get(row.partId).name,
      confidence: `${Math.round(row.match * 100)}%`,
      reason: family.why[row.partId],
    })),
    difficulty: safetyCritical ? 'Professional inspection' : top.difficulty,
    partCost: top.cost,
    canDrive: safetyCritical
      ? 'Do not ride until the brakes have been inspected.'
      : 'Not assessed. Stop riding if the symptom worsens or you notice smoke, a fuel smell or loss of control.',
    warning: [family.warning, safetyCritical ? '' : top.safety].filter(Boolean).join(' '),
    diySteps: safetyCritical
      ? [
        'Park on level ground and do not ride until the brakes have been checked.',
        'Use Locate in 3D to see where the part sits and what to point out to the mechanic.',
        'Ask a qualified technician to inspect pads, discs or drums, cables and fluid, and to do any repair.',
      ]
      : top.diySteps,
    tools: safetyCritical ? ['None: professional inspection recommended'] : top.tools,
    inspectionRequest,
  };
}

/** Result shown for stop conditions: no parts, no DIY steps, no 3D handoff. */
export function buildStopResult(stop) {
  return {
    familyLabel: 'Stop condition',
    cause: stop.title,
    confidenceList: [],
    difficulty: 'Professional inspection',
    canDrive: 'Do not ride.',
    warning: stop.message,
    diySteps: [
      'Do not ride or start the bike.',
      'Arrange a qualified technician to inspect it.',
      'Tell them exactly what you noticed and when it started.',
    ],
    tools: ['None: professional inspection required'],
  };
}
