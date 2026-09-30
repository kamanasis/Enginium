export const vehiclesData = [
  {
    id: "splendor",
    name: "Hero Splendor Plus",
    make: "Hero",
    model: "Splendor Plus",
    type: "Motorcycle",
    engine: "97.2cc, Air-cooled, Single Cylinder",
    power: "8.02 PS @ 8000 rpm",
    specs: {
      oilType: "10W-30 MA2",
      oilCapacity: "0.9 Litres",
      sparkPlugGap: "0.7 mm",
      tirePressureFront: "25 psi",
      tirePressureRear: "32 psi (Solo) / 36 psi (Pillion)"
    },
    legacyMilestones: [
      { id: "m1", title: "The Family Handover", desc: "Handed down from Father to Son after college graduation. A family heirloom since 2012.", date: "2024-06-15" },
      { id: "m2", title: "Ladakh Ride Achievement", desc: "Completed a 500km rural tour across hilly terrains without a single breakdown.", date: "2025-10-12" }
    ],
    parts: [
      {
        id: "spark-plug",
        name: "Spark Plug",
        icon: "Zap",
        function: "Ignites the air-fuel mixture inside the cylinder head to produce engine power.",
        failures: "Carbon fouling, electrode wear, incorrect gap sizing.",
        symptoms: "Engine misfire, starting trouble, poor acceleration, low mileage.",
        interval: "Inspect every 4,000 km, replace at 12,000 km.",
        cost: "₹120 - ₹180",
        difficulty: "Green",
        safety: "Ensure engine is cold before removing to avoid damage to cylinder head threads.",
        diySteps: [
          "Locate the spark plug on the right side of the engine cylinder head.",
          "Disconnect the spark plug cap (black rubber boot) by pulling it firmly.",
          "Use a 16mm spark plug box spanner to rotate counter-clockwise and unscrew.",
          "Inspect electrode tip. If black/sooty, clean using brass wire brush & sandpaper.",
          "Check electrode gap using a feeler gauge (recommended: 0.6 - 0.7mm).",
          "Re-thread by hand first (clockwise) to avoid cross-threading, then tighten using spanner (1/8th turn after seating).",
          "Reinstall the spark plug cap firmly until you hear a click."
        ],
        tools: ["16mm Spark Plug Spanner", "Wire Brush", "0.7mm Feeler Gauge"]
      },
      {
        id: "clutch-cable",
        name: "Clutch Cable",
        icon: "HelpCircle",
        function: "Transfers the pulling motion from the clutch lever to release the clutch plates inside the gearbox.",
        failures: "Inner wire fraying, outer sleeve cracking, cable binding due to lack of lubrication.",
        symptoms: "Stiff clutch lever, gear shifting difficulty, motorcycle creeping forward when clutch lever is fully pulled.",
        interval: "Lubricate every 3,000 km, replace if frayed or sticking.",
        cost: "₹110 - ₹150",
        difficulty: "Yellow",
        safety: "Improper slack adjustment can burn the clutch plates or prevent full disengagement, causing sudden acceleration.",
        diySteps: [
          "Park vehicle on center stand. Locate the lower end of the clutch cable near the engine right cover.",
          "Loosen the lock nut on the bracket using a 12mm open wrench.",
          "Pull the cable out from the clutch release arm.",
          "At the handlebar, align the slots on the adjuster dial and lock ring, then pull the inner cable out of the lever.",
          "Route the new cable along the frame EXACTLY like the old one.",
          "Attach cable to handlebar lever, then pull lower end and hook to the engine release arm.",
          "Adjust nuts until lever free-play is 10-15mm. Tighten lock nuts.",
          "Turn handlebar fully left/right to ensure the clutch does not engage/disengage on its own."
        ],
        tools: ["12mm Wrench", "10mm Wrench", "WD-40 / Cable Lube Tool"]
      },
      {
        id: "chain",
        name: "Drive Chain & Sprockets",
        icon: "RefreshCw",
        function: "Transfers rotational energy from the gearbox output shaft to the rear wheel.",
        failures: "Elongation, rusted links, worn sprocket teeth (hooked teeth).",
        symptoms: "Clanking sounds, jerky acceleration, chain slipping under load, sluggish pickup.",
        interval: "Clean & lubricate every 500 km. Adjust slack every 1,000 km.",
        cost: "₹850 - ₹1,200 (Full Kit)",
        difficulty: "Green",
        safety: "NEVER clean or lubricate the chain with the engine running or bike in gear. Fingers can get caught in sprocket.",
        diySteps: [
          "Put motorcycle on center stand. Remove the chain guard/cover (usually four 10mm bolts).",
          "Spray chain cleaner (or kerosene) and scrub using a 3-sided chain brush.",
          "Wipe clean with a lint-free cloth.",
          "Measure chain slack at the center of the bottom run (standard: 25-30mm of vertical play).",
          "If loose, loosen the rear axle nut (19mm). Adjust chain adjusters equally on both sides (align notches).",
          "Tighten axle nut. Re-check slack. Lubricate chain with dedicated chain lube while rotating rear wheel manually.",
          "Reinstall the chain guard."
        ],
        tools: ["19mm Socket", "12mm Wrench", "Chain Brush", "Chain Lube & Cleaner"]
      },
      {
        id: "air-filter",
        name: "Air Filter",
        icon: "Wind",
        function: "Filters dust, dirt, and impurities from the intake air before it enters the carburetor/combustion chamber.",
        failures: "Clogging, tearing of paper filter, oil saturation.",
        symptoms: "Heavy fuel consumption, black exhaust smoke, poor throttle response, starting issues.",
        interval: "Clean every 2,000 km, replace every 12,000 km.",
        cost: "₹90 - ₹150",
        difficulty: "Green",
        safety: "Never run the engine without the air filter; dirt will enter and permanently score the piston cylinder walls.",
        diySteps: [
          "Remove the right-side body panel using the ignition key or screwdriver.",
          "Remove the 4 screws of the air filter box cover.",
          "Pull out the polyurethane foam/paper element.",
          "If foam: wash in kerosene, squeeze out excess (do not wring), apply a few drops of clean engine oil and squeeze to distribute.",
          "If paper/cartridge: tap gently to remove dust or use low-pressure compressed air from inside out. Replace if heavily soiled.",
          "Clean the inside of the air filter box with a clean damp cloth.",
          "Re-insert the filter and tightly fasten the filter cover screws."
        ],
        tools: ["Star/Philips Screwdriver", "Kerosene (for washing foam filters)", "Clean engine oil"]
      },
      {
        id: "battery",
        name: "Battery",
        icon: "BatteryCharging",
        function: "Provides electrical current to start the engine and powers lights, horn, and indicators when the alternator is off.",
        failures: "Sulfation, voltage drop, dead cells, loose or corroded terminals.",
        symptoms: "Weak horn sound, dim headlight at idle, self-start fails with clicking sound, console resets.",
        interval: "Check terminal voltage every 3 months. Clean terminals every 6 months.",
        cost: "₹1,200 - ₹1,800",
        difficulty: "Green",
        safety: "Disconnect negative terminal (-) first to avoid short circuits. Wear gloves. Keep sparks/flames away.",
        diySteps: [
          "Remove left-side panel using ignition key. Locate the battery band/bracket.",
          "Unscrew the battery clamp/holder bracket.",
          "Disconnect the NEGATIVE (-) terminal first (black cap/wire).",
          "Disconnect the POSITIVE (+) terminal (red cap/wire).",
          "Slide battery out. Clean terminals with wire brush and a paste of baking soda/water if white powder/corrosion is present.",
          "Test voltage with multimeter (healthy: >12.4V resting, >13.8V when engine is running).",
          "Apply petroleum jelly/vaseline to terminals to prevent future rusting.",
          "Reinstall: Connect POSITIVE (+) terminal first, then NEGATIVE (-) terminal."
        ],
        tools: ["Philips Screwdriver", "8mm Spanner", "Wire Brush", "Multimeter"]
      }
    ],
    symptomMap: {
      "slow-starting": {
        cause: "Spark plug fouled/clogged or Weak Battery.",
        diy: "Green",
        confidence: "85%",
        repairTime: "15 mins",
        partCost: "₹120 - ₹1,500",
        laborCost: "₹50 - ₹100",
        canDrive: "Yes, but avoid turning off engine in heavy traffic.",
        warning: "Repeated self-start attempts when battery is weak can burn out the starter motor armature.",
        solutionId: "spark-plug"
      },
      "self-start-failure": {
        cause: "Dead battery or faulty starter relay.",
        diy: "Green",
        confidence: "95%",
        repairTime: "20 mins",
        partCost: "₹1,200 - ₹1,800",
        laborCost: "₹50",
        canDrive: "Yes, can be kick-started.",
        warning: "If battery is completely dead, console lights might flicker and indicator flashers won't work, which is unsafe for night riding.",
        solutionId: "battery"
      },
      "poor-pickup": {
        cause: "Clogged Air Filter or slipping clutch due to loose/incorrectly adjusted clutch cable.",
        diy: "Yellow",
        confidence: "80%",
        repairTime: "30 mins",
        partCost: "₹110 - ₹250",
        laborCost: "₹80 - ₹120",
        canDrive: "Yes, but fuel consumption will increase dramatically.",
        warning: "Continuous riding with a slipping clutch will overheat and burn the clutch friction plates, requiring an expensive engine work.",
        solutionId: "clutch-cable"
      },
      "chain-noise": {
        cause: "Loose or unlubricated drive chain.",
        diy: "Green",
        confidence: "90%",
        repairTime: "25 mins",
        partCost: "₹200 (chain lube/cleaner)",
        laborCost: "₹50",
        canDrive: "Yes, but riding with a very loose chain can cause it to derail from the sprocket, locking up the rear wheel.",
        warning: "Risk of wheel lock-up at high speeds is high if chain drops.",
        solutionId: "chain"
      }
    },
    emergencyGuides: [
      {
        id: "stall",
        title: "Engine Stall & Won't Start",
        steps: [
          "Safely pull over to the side of the road. Switch on hazard indicators if available.",
          "Check fuel level. Shake bike to hear fuel sound in tank. Open fuel cap to check level, switch to RESERVE on fuel tap if available.",
          "Ensure kill switch (if present) is in RUN mode. Put gear in neutral.",
          "Remove spark plug boot, clean terminal of mud/water, and put it back firmly.",
          "If self-start fails, use the kick-starter with throttle slightly cracked open."
        ]
      },
      {
        id: "puncture",
        title: "Rear Tyre Puncture",
        steps: [
          "Do not brake hard. Hold handlebar firmly, throttle down, and guide the bike to a safe shoulder.",
          "Put bike on main stand to lift the flat tire off the ground.",
          "Do not ride on flat tire; doing so will ruin the tube, damage the alloy rim, and make riding highly unstable.",
          "Use a tubeless repair kit (if tubeless) to plug the hole, or find the nearest puncture repair shop within pushing distance."
        ]
      }
    ]
  },
  {
    id: "activa",
    name: "Honda Activa 6G",
    make: "Honda",
    model: "Activa 6G",
    type: "Scooter",
    engine: "109.5cc, Fan-cooled, 4-stroke, ESP Engine",
    power: "7.79 PS @ 8000 rpm",
    specs: {
      oilType: "10W-30 MB (Scooter Spec)",
      oilCapacity: "0.8 Litres",
      sparkPlugGap: "0.8 mm",
      tirePressureFront: "22 psi",
      tirePressureRear: "29 psi (Solo) / 36 psi (Pillion)"
    },
    legacyMilestones: [
      { id: "m1", title: "Daily Grocery & School runs", desc: "Originally bought by Mom, now used by the son for daily errands. The absolute workhorse.", date: "2020-02-10" }
    ],
    parts: [
      {
        id: "spark-plug",
        name: "Spark Plug",
        icon: "Zap",
        function: "Ignites the fuel-air charge in the engine cylinder.",
        failures: "Carbon deposits, worn electrode, wet fouling.",
        symptoms: "Scooter sputtering, refusal to start, engine hiccups.",
        interval: "Inspect every 4,000 km, replace at 12,000 km.",
        cost: "₹130 - ₹190",
        difficulty: "Yellow",
        safety: "Access requires removing the under-seat luggage box (4 bolts). Take care not to drop screws into the engine bay.",
        diySteps: [
          "Open the seat lock, remove the 4 main bolts of the under-seat trunk using a 10mm T-spanner.",
          "Lift out the plastic luggage trunk to reveal the engine area below.",
          "Locate the spark plug cover/cap on the cylinder head.",
          "Pull the cap off, then use standard plug spanner to unscrew the plug counter-clockwise.",
          "Clean carbon with sandpaper, check gap, then screw back with fingers first before final wrenching.",
          "Put back boot, test starting, and reinstall the trunk box."
        ],
        tools: ["10mm Socket/T-spanner", "16mm Plug Wrench", "Sandpaper"]
      },
      {
        id: "air-filter",
        name: "Viscous Paper Air Filter",
        icon: "Wind",
        function: "Filters dust. Activa uses a viscous paper filter coated with oil to capture ultra-fine particles.",
        failures: "Clogging. Viscous filters cannot be blown with air or washed; they must be replaced.",
        symptoms: "Severe pickup drop, low mileage (under 35 kmpl), exhaust smells of unburnt petrol.",
        interval: "Replace every 15,000 km. (No intermediate cleaning recommended).",
        cost: "₹220 - ₹280",
        difficulty: "Green",
        safety: "Never clean with compressed air, as this blows away the sticky oil layer and ruins filtration capabilities.",
        diySteps: [
          "Locate the air filter box on the left side of the rear wheel.",
          "Remove the 5 philips screws holding the cover.",
          "Pull the cover open and slide out the rectangular viscous filter element.",
          "Wipe dust from filter casing using clean wet cloth.",
          "Slide in the new genuine Honda viscous filter (avoid touching the oily paper surface directly).",
          "Reinstall the cover and tighten all screws evenly."
        ],
        tools: ["Philips Screwdriver", "Wiping cloth"]
      },
      {
        id: "battery",
        name: "Battery (Maintenance Free)",
        icon: "BatteryCharging",
        function: "Powers starter motor, digital display, and LED headlamps.",
        failures: "Low charge, voltage degradation.",
        symptoms: "LED headlamp flickering, horn sounds thin/feeble, starter motor clicks but doesn't crank.",
        interval: "Check charge annually, replace every 3-4 years.",
        cost: "₹1,300 - ₹1,700",
        difficulty: "Green",
        safety: "Always isolate negative (-) pole first. Be careful not to drop the terminal nuts into the nose cover.",
        diySteps: [
          "Locate the battery in the front nose shield/apron.",
          "Remove the 2 screws on the front indicator cover / service cover.",
          "Pop open the clips of the front panel to reveal the battery compartment.",
          "Remove rubber band holding battery.",
          "Unscrew black (-) screw first, then red (+) screw.",
          "Take battery out, replace, then connect red first, then black."
        ],
        tools: ["Philips Screwdriver"]
      }
    ],
    symptomMap: {
      "slow-starting": {
        cause: "Viscous air filter clogged or Spark Plug fouled.",
        diy: "Green",
        confidence: "80%",
        repairTime: "15 mins",
        partCost: "₹220 - ₹280",
        laborCost: "₹60",
        canDrive: "Yes",
        warning: "A heavily clogged filter will cause engine running rich, which ruins the catalytic converter over time.",
        solutionId: "air-filter"
      },
      "self-start-failure": {
        cause: "Weak battery or blown fuse.",
        diy: "Green",
        confidence: "90%",
        repairTime: "10 mins",
        partCost: "₹1,400",
        laborCost: "₹0 (DIY)",
        canDrive: "Yes, use kick start.",
        warning: "Check the fuse box (located next to the battery) before buying a new battery. A ₹5 fuse could be the culprit.",
        solutionId: "battery"
      }
    },
    emergencyGuides: [
      {
        id: "stall",
        title: "Scooter Stall In Rain",
        steps: [
          "Pull over to the side. Water might have entered the spark plug cap.",
          "Remove the service cover/apron or reach from the side to unplug the rubber spark plug cap.",
          "Dry the inside of the cap with a dry cloth or blow hard into it.",
          "Wipe the exposed ceramic part of the spark plug dry.",
          "Reconnect cap tightly, then try starting with the kick starter."
        ]
      }
    ]
  },
  {
    id: "pulsar",
    name: "Bajaj Pulsar 150",
    make: "Bajaj",
    model: "Pulsar 150",
    type: "Motorcycle",
    engine: "149.5cc, DTS-i Twin Spark, Air-cooled",
    power: "14 PS @ 8500 rpm",
    specs: {
      oilType: "20W-50 MA2",
      oilCapacity: "1.15 Litres",
      sparkPlugGap: "0.7 - 0.8 mm",
      tirePressureFront: "28 psi",
      tirePressureRear: "32 psi (Solo) / 38 psi (Pillion)"
    },
    legacyMilestones: [
      { id: "m1", title: "College Legend", desc: "Purchased second-hand. Restored the carburetion and paint by son and father together in the backyard.", date: "2023-08-25" }
    ],
    parts: [
      {
        id: "spark-plug",
        name: "Twin Spark Plugs (DTS-i)",
        icon: "Zap",
        function: "Pulsar uses TWO spark plugs inside the cylinder head to enable faster and more complete combustion.",
        failures: "Inequal fouling, carbon bridge, worn electrode.",
        symptoms: "Engine vibration, poor pickup, backfiring noises, uneven idling.",
        interval: "Clean every 5,000 km, replace both every 10,000 km.",
        cost: "₹260 - ₹340 (Pair)",
        difficulty: "Green",
        safety: "Replace BOTH spark plugs together. Do not mix old and new plugs as it causes ignition imbalances.",
        diySteps: [
          "Locate Spark Plug 1 on left side of cylinder, Spark Plug 2 on the right side.",
          "Pull off both spark plug caps.",
          "Unscrew left plug, clean and inspect. Repeat for right plug.",
          "Verify gaps match. Screw back both plugs firmly."
        ],
        tools: ["16mm Plug Wrench", "Feeler Gauge", "Sandpaper"]
      },
      {
        id: "chain",
        name: "O-Ring Drive Chain",
        icon: "RefreshCw",
        function: "Transfers raw engine torque to the rear wheel. Feature rubber O-rings containing sealed grease.",
        failures: "Seized links, rubber O-ring blowout due to petrol wash.",
        symptoms: "Loud whirring noise, loss of power transmission, chain jumping out.",
        interval: "Clean & Lube every 400 km. Use O-ring safe lubes only.",
        cost: "₹1,200 - ₹1,600",
        difficulty: "Yellow",
        safety: "NEVER use petrol or diesel to clean O-ring chains. Kerosene or specialized cleaner is safe. Diesel degrades the rubber O-rings.",
        diySteps: [
          "Park on center stand. Clean with kerosene and nylon chain brush.",
          "Dry completely with a clean cloth.",
          "Adjust chain slack to 25-30mm using adjustment marks on the swingarm.",
          "Spray specialized chain lube on inner link rollers while hand-spinning wheel."
        ],
        tools: ["22mm axle ring spanner", "12mm adjusters", "Kerosene", "O-ring Safe Lube"]
      }
    ],
    symptomMap: {
      "poor-pickup": {
        cause: "Worn out clutch plates or clogged air filter.",
        diy: "Yellow",
        confidence: "85%",
        repairTime: "40 mins",
        partCost: "₹250 - ₹1,200",
        laborCost: "₹150",
        canDrive: "Yes, carefully.",
        warning: "If clutch is slipping in high gears, overtaking can be dangerous as speed will not increase with throttle.",
        solutionId: "chain"
      }
    },
    emergencyGuides: []
  },
  {
    id: "classic350",
    name: "Royal Enfield Classic 350",
    make: "Royal Enfield",
    model: "Classic 350",
    type: "Motorcycle",
    engine: "349cc, J-Series Single Cylinder, Air-Oil Cooled",
    power: "20.2 BHP @ 6100 rpm",
    specs: {
      oilType: "15W-50 API SL (Semi Synthetic)",
      oilCapacity: "1.9 Litres",
      sparkPlugGap: "0.8 mm",
      tirePressureFront: "22 psi",
      tirePressureRear: "32 psi"
    },
    legacyMilestones: [
      { id: "m1", title: "Passing down the Thump", desc: "Passed down from dad who bought it in 2015. Retains the signature thump and retro look.", date: "2024-01-01" }
    ],
    parts: [
      {
        id: "spark-plug",
        name: "Spark Plug (Bosch/NGK)",
        icon: "Zap",
        function: "Ignites the heavy cylinder fuel charge.",
        failures: "Soot build-up, carbon coating.",
        symptoms: "Starting lag, cold engine stalling, engine heavy thumping but not starting.",
        interval: "Clean every 3,000 km, replace at 10,000 km.",
        cost: "₹180 - ₹250",
        difficulty: "Green",
        safety: "The Classic 350 cylinder head gets exceptionally hot. Wait at least 1 hour after riding before touching.",
        diySteps: [
          "Locate plug on the left hand side of the engine block.",
          "Pull out the heavy spark plug cap.",
          "Use the tool-kit spanner to unscrew.",
          "Clean with wire brush and measure gap. Replace if electrode is rounded."
        ],
        tools: ["Spark Plug Tool from OE kit", "Wire brush"]
      },
      {
        id: "engine-oil",
        name: "Engine Oil & Oil Filter",
        icon: "Droplet",
        function: "Lubricates the internal piston, crankshaft, and transmission gears.",
        failures: "Viscosity loss, sludge accumulation.",
        symptoms: "Heavy engine heating, loud metallic tappet noises, stiff gear shifts.",
        interval: "Replace oil and filter every 10,000 km (check and top up every 2,500 km).",
        cost: "₹1,200 - ₹1,500 (Oil + Filter)",
        difficulty: "Yellow",
        safety: "Hot engine oil can cause third-degree burns. Wear heat-resistant gloves.",
        diySteps: [
          "Warm up engine for 5 mins, then turn off.",
          "Place oil drain pan under engine. Remove drain bolt (17mm or 8mm Allen key) at the bottom.",
          "Let oil drain fully. Remove the 3 nuts of the oil filter cap on the right-side cover.",
          "Pull out the paper oil filter. Clean filter housing with a clean cloth.",
          "Insert new filter with rubber seal facing inwards. Fasten filter cap.",
          "Reinstall bottom drain bolt with a new crush washer (tighten to 20Nm).",
          "Fill 1.9 Litres of 15W-50 oil through filler cap. Check level via window glass."
        ],
        tools: ["17mm Socket", "8mm Allen Key", "Drain Pan", "Funnel", "New Crush Washer"]
      }
    ],
    symptomMap: {
      "slow-starting": {
        cause: "Weak battery or cold engine lubrication issues.",
        diy: "Green",
        confidence: "80%",
        repairTime: "15 mins",
        partCost: "₹1,500",
        laborCost: "₹50",
        canDrive: "Yes, use kick/push start.",
        warning: "J-Series engine relies heavily on battery voltage for the fuel injection pump. Charge immediately.",
        solutionId: "spark-plug"
      }
    },
    emergencyGuides: []
  },
  {
    id: "continental-gt-650",
    name: "Royal Enfield Continental GT 650",
    make: "Royal Enfield",
    model: "Continental GT 650 (Twin)",
    type: "Motorcycle",
    engine: "648cc, Parallel-Twin, 4-Stroke, SOHC, Air/Oil-Cooled, 270° Crank",
    power: "47.0 BHP @ 7250 rpm",
    specs: {
      oilType: "10W-50 Fully Synthetic (JASO MA2)",
      oilCapacity: "3.1 Litres",
      sparkPlugGap: "0.7 - 0.8 mm (Twin NGK CR8E)",
      tirePressureFront: "32 psi",
      tirePressureRear: "36 psi (Solo) / 39 psi (Pillion)"
    },
    legacyMilestones: [
      { id: "m1", title: "Cafe Racer Delivery", desc: "First 650cc twin in the garage. Took delivery at the flagship showroom.", date: "2024-03-18" },
      { id: "m2", title: "Goa Coastal Cruise", desc: "1,200 km highway coastal tour with zero issues. Unmatched twin-cylinder rumble.", date: "2025-11-20" }
    ],
    parts: [
      {
        id: "spark-plug",
        name: "Twin NGK Spark Plugs",
        icon: "Zap",
        function: "Ignites the twin cylinder combustion chambers synchronized with 270-degree firing order.",
        failures: "Carbon accumulation, gap erosion.",
        symptoms: "Unbalanced twin exhaust note, idle fluctuation, loss of top-end power.",
        interval: "Inspect every 5,000 km, replace at 15,000 km.",
        cost: "₹650 (Pair)",
        difficulty: "Green",
        safety: "Allow parallel twin block to cool completely before wrenching.",
        diySteps: [
          "Remove seat and unbolt rear fuel tank mounting to tilt slightly.",
          "Disconnect both high-tension spark plug boots.",
          "Use 16mm deep thin-wall spark plug socket to remove both plugs.",
          "Check electrode gap (0.7-0.8mm) using feeler gauge.",
          "Torque plugs to 14 Nm to prevent stripping aluminum threads."
        ],
        tools: ["16mm Thin-Wall Plug Socket", "Torque Wrench", "Feeler Gauge"]
      },
      {
        id: "engine-oil",
        name: "Full Synthetic 10W-50 & Filter",
        icon: "Droplet",
        function: "Lubricates the parallel-twin cylinders, 6-speed gearbox, and slip-assist clutch.",
        failures: "Thermal breakdown, clutch drag if wrong friction modifier used.",
        symptoms: "Stiff gear shifts, heavy engine heat radiating on rider's legs, clanking tappet noise.",
        interval: "Change every 10,000 km or 12 months.",
        cost: "₹2,800 - ₹3,400 (3.1L Oil + Spin-on Filter)",
        difficulty: "Yellow",
        safety: "Engine holds over 3 litres of hot oil. Ensure drain pan has sufficient capacity (min 4L).",
        diySteps: [
          "Run bike for 3 minutes to warm oil. Place 5L pan under sump.",
          "Loosen 8mm Allen drain bolt and remove secondary strainer plate.",
          "Use oil filter band wrench to unscrew the spin-on oil filter.",
          "Lubricate the rubber gasket of the new filter with clean engine oil and hand tighten 3/4 turn after contact.",
          "Reinstall drain bolt with new copper crush washer (25 Nm).",
          "Fill with 3.1 litres of 10W-50 JASO MA2 fully synthetic oil and verify level in sight glass."
        ],
        tools: ["8mm Allen Key", "Oil Filter Wrench", "5L Drain Basin", "Funnel"]
      }
    ],
    symptomMap: {
      "slow-starting": {
        cause: "Weak 12V 14Ah VRLA battery or clutch switch sensor misaligned.",
        diy: "Green",
        confidence: "88%",
        repairTime: "15 mins",
        partCost: "₹2,400",
        laborCost: "₹0",
        canDrive: "Yes, bump start possible.",
        warning: "Twin cylinder starter motor draws high surge current (approx 80A). Weak battery will click relay rapidly.",
        solutionId: "battery"
      }
    },
    emergencyGuides: []
  },
  {
    id: "hunter-350",
    name: "Royal Enfield Hunter 350",
    make: "Royal Enfield",
    model: "Hunter 350 (Metro)",
    type: "Motorcycle",
    engine: "349cc, Single Cylinder, 4-Stroke, Air-Oil Cooled J-Series",
    power: "20.2 BHP @ 6100 rpm",
    specs: {
      oilType: "15W-50 Semi-Synthetic",
      oilCapacity: "1.9 Litres",
      sparkPlugGap: "0.8 mm",
      tirePressureFront: "29 psi",
      tirePressureRear: "32 psi (Solo) / 36 psi (Pillion)"
    },
    legacyMilestones: [
      { id: "m1", title: "City Commuter First Service", desc: "First 500 km break-in service completed at authorized service centre.", date: "2024-08-10" }
    ],
    parts: [
      {
        id: "chain",
        name: "Open Drive Chain",
        icon: "RefreshCw",
        function: "Transfers punchy low-end torque to the 17-inch rear alloy wheel.",
        failures: "Slack enlargement, road grime buildup.",
        symptoms: "Loud chain slap on swingarm rubber pad, snatchy throttle response in 1st/2nd gear.",
        interval: "Clean & lube every 500 km.",
        cost: "₹1,400",
        difficulty: "Green",
        safety: "Keep bike on paddock stand (Hunter lacks main stand by default).",
        diySteps: [
          "Mount bike onto rear paddock stand.",
          "Spray chain cleaner and brush thoroughly with grunge brush.",
          "Measure vertical slack midway (spec: 25 - 30mm).",
          "Adjust axle adjusters evenly on both sides and torque axle to 70 Nm.",
          "Apply synthetic chain lube to inside of O-rings."
        ],
        tools: ["24mm Axle Socket", "12mm Wrench", "Chain Cleaner & Lube", "Paddock Stand"]
      }
    ],
    symptomMap: {
      "chain-noise": {
        cause: "Loose chain slapping the swingarm guide.",
        diy: "Green",
        confidence: "95%",
        repairTime: "20 mins",
        partCost: "₹250",
        laborCost: "₹50",
        canDrive: "Yes, ride gently.",
        warning: "Excess slack can cause chain derailment and lockup.",
        solutionId: "chain"
      }
    },
    emergencyGuides: []
  }
];
