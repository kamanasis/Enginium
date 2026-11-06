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
        category: "Engine",
        icon: "Zap",
        image: "/images/parts/spark-plug.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Ignites the air-fuel mixture inside the cylinder head to produce engine power.",
        failures: "Carbon fouling, electrode wear, incorrect gap sizing.",
        symptoms: "Engine misfire, starting trouble, poor acceleration, low mileage.",
        interval: "Inspect every 4,000 km, replace at 12,000 km.",
        cost: "₹120 - ₹180",
        difficulty: "Basic DIY",
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
        category: "Transmission",
        icon: "HelpCircle",
        image: "/images/parts/clutch-cable.jpg",
        imageCredit: "Wikimedia Commons",
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
        category: "Transmission",
        icon: "RefreshCw",
        image: "/images/parts/chain.jpg",
        imageCredit: "Wikimedia Commons / Ralf Roletschek",
        function: "Transfers rotational energy from the gearbox output shaft to the rear wheel.",
        failures: "Elongation, rusted links, worn sprocket teeth (hooked teeth).",
        symptoms: "Clanking sounds, jerky acceleration, chain slipping under load, sluggish pickup.",
        interval: "Clean & lubricate every 500 km. Adjust slack every 1,000 km.",
        cost: "₹850 - ₹1,200 (Full Kit)",
        difficulty: "Basic DIY",
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
        category: "Fuel & Exhaust",
        icon: "Wind",
        image: "/images/parts/air-filter.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Filters dust, dirt, and impurities from the intake air before it enters the carburetor/combustion chamber.",
        failures: "Clogging, tearing of paper filter, oil saturation.",
        symptoms: "Heavy fuel consumption, black exhaust smoke, poor throttle response, starting issues.",
        interval: "Clean every 2,000 km, replace every 12,000 km.",
        cost: "₹90 - ₹150",
        difficulty: "Basic DIY",
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
        category: "Electrical",
        icon: "BatteryCharging",
        image: "/images/parts/battery.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Provides electrical current to start the engine and powers lights, horn, and indicators when the alternator is off.",
        failures: "Sulfation, voltage drop, dead cells, loose or corroded terminals.",
        symptoms: "Weak horn sound, dim headlight at idle, self-start fails with clicking sound, console resets.",
        interval: "Check terminal voltage every 3 months. Clean terminals every 6 months.",
        cost: "₹1,200 - ₹1,800",
        difficulty: "Basic DIY",
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
      },
      {
        id: "engine-oil",
        name: "Engine Oil & Sump Strainer",
        category: "Engine",
        icon: "Droplet",
        image: "/images/parts/engine-oil.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Lubricates the internal piston, crankshaft, camshaft bearings, and wet clutch friction plates.",
        failures: "Viscosity degradation, sludge accumulation, low oil level causing metal-on-metal friction.",
        symptoms: "Engine running abnormally hot, stiff clutch feel, clattering valvetrain noise.",
        interval: "Inspect level every 1,000 km, replace oil every 3,000 - 4,000 km.",
        cost: "₹350 - ₹550",
        difficulty: "Basic DIY",
        safety: "Do not touch hot oil directly. Always use a fresh aluminum or copper crush washer to prevent sump stripped threads.",
        diySteps: [
          "Warm engine for 3 minutes to thin the oil, then turn off ignition.",
          "Place an oil drain pan beneath the crankcase.",
          "Use a 17mm socket wrench to unscrew the bottom oil drain bolt counter-clockwise.",
          "Allow dirty oil to drain completely for 5-10 minutes.",
          "Remove and clean the oil strainer mesh screen on the clutch side if due for service.",
          "Reinstall the drain bolt with a new crush washer and torque to 20-25 Nm.",
          "Pour in 0.9L of recommended 10W-30 JASO MA2 4-stroke motorcycle oil through the filler cap.",
          "Check oil level using the dipstick without screwing it in."
        ],
        tools: ["17mm Socket Wrench", "Oil Drain Pan", "Funnel", "Clean Lint-Free Rag"]
      },
      {
        id: "piston-rings",
        image: "/images/parts/piston-rings.jpg",
        imageCredit: "Wikimedia Commons / Interiot~commonswiki",
        name: "Piston & Piston Rings Assembly",
        category: "Engine",
        icon: "Cpu",
        function: "Compresses fuel-air charge and transfers high-pressure combustion energy to the connecting rod while scraping oil off the bore.",
        failures: "Compression ring wear, stuck oil scraper ring, carbon build-up in ring lands.",
        symptoms: "Dense bluish exhaust smoke, high oil consumption, loss of compression, sluggish hill climbing.",
        interval: "Inspect bore and rings every 25,000 - 30,000 km.",
        cost: "₹850 - ₹1,400 (Piston + Ring Set)",
        difficulty: "Red",
        safety: "Piston ring gaps must be staggered 120 degrees apart to prevent combustion gas blow-by.",
        diySteps: [
          "Remove cylinder head and slide off the cylinder block from the engine crankcase.",
          "Stuff a clean shop rag into the crankcase throat to prevent circlips from falling into the bottom end.",
          "Use needle-nose pliers to remove the gudgeon pin circlip.",
          "Push out the wrist pin and detach the piston from the connecting rod small end.",
          "Clean carbon off the piston crown using solvent and brass scraper.",
          "Install new top ring, second ring, and 3-piece oil ring with marked sides facing upward.",
          "Stagger ring end gaps 120 degrees apart and lubricate generously with fresh engine oil.",
          "Compress rings carefully by hand or with ring compressor while sliding the oiled cylinder bore downward."
        ],
        tools: ["Needle-nose Pliers", "Feeler Gauge", "Piston Ring Expander", "Micrometer / Vernier Caliper"]
      },
      {
        id: "cylinder-block",
        image: "/images/parts/cylinder-block.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Cylinder Block & Bore",
        category: "Engine",
        icon: "Shield",
        function: "Precision-machined cast iron / aluminum cylinder barrel guiding piston movement and dissipating combustion heat through cooling fins.",
        failures: "Bore scoring, ovality wear, warped head mating deck, cracked cooling fins.",
        symptoms: "Low compression below 120 psi, audible piston slap knock on cold idle.",
        interval: "Check compression during major services every 12,000 km.",
        cost: "₹1,800 - ₹2,600",
        difficulty: "Red",
        safety: "Never reuse a crushed cylinder base gasket or head gasket as oil leaks and air suction will occur.",
        diySteps: [
          "Drain engine oil and remove exhaust pipe, carburetor, and cylinder head bolts.",
          "Carefully tap the cylinder block with a soft mallet to break the base gasket seal.",
          "Slide cylinder straight upward off the four crankcase cylinder studs.",
          "Inspect bore walls for vertical fingernail-catching scratches and measure ovality.",
          "Clean both cylinder mating surfaces completely of old gasket residue using a gasket scraper.",
          "Install a new cylinder base dowel pins and base gasket.",
          "Oil the bore thoroughly and lower it gently over the piston with rings compressed.",
          "Torque cylinder head studs in a criss-cross pattern to factory torque specification."
        ],
        tools: ["Torque Wrench", "Bore Gauge", "Plastic Mallet", "Gasket Scraper"]
      },
      {
        id: "valves-tappets",
        image: "/images/parts/valves-tappets.jpg",
        imageCredit: "Wikimedia Commons / Andy Dingley",
        name: "Intake & Exhaust Valves (Tappets)",
        category: "Engine",
        icon: "Settings",
        function: "Poppet valves sealing the combustion chamber and timed by the camshaft to regulate fuel intake and exhaust gas evacuation.",
        failures: "Tight valve clearance (no clearance when hot), carbon-burnt valve face, valve seat recession.",
        symptoms: "Cold engine starting refusal, loud clicking tappet noise, backfiring into airbox, loss of top-end power.",
        interval: "Check and adjust tappet clearance every 6,000 km.",
        cost: "₹450 - ₹750 (Valves & Guides)",
        difficulty: "Yellow",
        safety: "Engine must be stone cold (room temperature) before checking tappet clearance.",
        diySteps: [
          "Remove spark plug and both valve inspection covers (tappet caps) on the cylinder head.",
          "Remove alternator flywheel timing inspection cap.",
          "Rotate crankshaft counter-clockwise until the 'T' mark aligns with the stationary notch at Top Dead Center on compression stroke.",
          "Wiggle both rocker arms to ensure there is slight free play (confirming both valves are fully closed).",
          "Insert a feeler gauge between the valve stem tip and rocker arm adjustment screw (Intake: 0.08mm, Exhaust: 0.12mm).",
          "Loosen 9mm locknut, rotate square adjuster screw until feeler gauge slides with slight drag.",
          "Hold adjuster screw firmly while tightening locknut.",
          "Recheck clearance after tightening locknut and reinstall tappet caps with fresh O-rings."
        ],
        tools: ["Feeler Gauge", "9mm Tappet Spanner", "Tappet Adjusting Tool", "17mm Crank Socket"]
      },
      {
        id: "camshaft-timing",
        image: "/images/parts/camshaft-timing.jpg",
        imageCredit: "Wikimedia Commons / Manju~commonswiki",
        name: "Camshaft & Timing Chain Assembly",
        category: "Engine",
        icon: "RefreshCw",
        function: "Lobe shaft rotating at half crankshaft speed to actuate valves, synchronized by the timing chain and automatic tensioner.",
        failures: "Timing chain stretch, worn plastic tensioner guide, rounded camshaft lobes.",
        symptoms: "Persistent metallic rattling sound on left side of engine, erratic idling, engine timing jump.",
        interval: "Inspect tensioner every 10,000 km; replace timing chain kit at 30,000 - 40,000 km.",
        cost: "₹650 - ₹1,100 (Chain + Guides + Sprocket)",
        difficulty: "Red",
        safety: "Improper timing chain alignment will cause the piston to smash into open valves, destroying the engine.",
        diySteps: [
          "Set engine to Top Dead Center (TDC) on compression stroke with flywheel 'T' mark aligned.",
          "Remove cam sprocket circular left-side cover.",
          "Inspect automatic cam chain tensioner on cylinder rear; release spring tension screw.",
          "Verify the cam sprocket timing punch mark aligns perfectly horizontal with the cylinder head edge.",
          "If chain is loose beyond tensioner travel, remove flywheel using magneto puller.",
          "Slide off old timing chain, inspect rubber guide rollers, and loop new chain over crank gear and cam sprocket.",
          "Release tensioner plunger to take up slack.",
          "Rotate crankshaft two full turns by hand to double-check that timing marks line up precisely."
        ],
        tools: ["Magneto Flywheel Puller", "10mm Cam Sprocket Wrench", "Flathead Screwdriver", "TDC Gauge"]
      },
      {
        id: "crankshaft",
        image: "/images/parts/crankshaft.JPG",
        imageCredit: "Wikimedia Commons / TuckerBag",
        name: "Crankshaft & Connecting Rod",
        category: "Engine",
        icon: "Activity",
        function: "Heavy forged counterbalanced shaft that converts piston linear force into rotary motion and drives the magneto and primary gear.",
        failures: "Big-end needle roller bearing play, bent connecting rod, worn main bearings.",
        symptoms: "Deep rumbling vibration at medium revs, heavy metallic clunk when decelerating.",
        interval: "Inspect during complete engine overhaul (50,000+ km).",
        cost: "₹2,200 - ₹3,600",
        difficulty: "Red",
        safety: "Requires split-crankcase disassembly. Special bearing pullers and press tools are mandatory.",
        diySteps: [
          "Strip top end (head, cylinder) and side covers (clutch, alternator).",
          "Remove all crankcase perimeter bolts in reverse sequence.",
          "Use crankcase separator tool to part the left and right crankcase halves evenly.",
          "Lift out crankshaft assembly.",
          "Check connecting rod radial vertical play (must be 0.00mm radial play; minimal side play allowed).",
          "Inspect main ball bearings for roughness, discoloration, or pitting.",
          "Replace crank assembly or rebuild big-end pin and needle cage on a hydraulic press.",
          "Reassemble cases using high-temp anaerobic crankcase sealant and torque bolts evenly."
        ],
        tools: ["Crankcase Separator", "Hydraulic Press", "Dial Test Indicator", "Torque Wrench"]
      },
      {
        id: "carburetor",
        image: "/images/parts/carburetor.jpg",
        imageCredit: "Wikimedia Commons / A7N8X",
        name: "Carburetor & Float Bowl",
        category: "Fuel & Exhaust",
        icon: "Wind",
        function: "Uses engine intake venturi vacuum to draw and atomize liquid petrol into a combustible air-fuel mixture across all throttle openings.",
        failures: "Clogged pilot / main jet, varnished needle, stuck float valve causing fuel overflow, torn slide vacuum diaphragm.",
        symptoms: "Engine dies when opening throttle, poor cold start, fuel dripping out overflow tube, black sooty spark plug.",
        interval: "Clean jets every 6,000 km or whenever stored for months.",
        cost: "₹1,400 - ₹2,200 (Full Unit) / ₹180 (Repair Kit)",
        difficulty: "Yellow",
        safety: "Petrol fumes are extremely flammable. Disconnect battery negative terminal and work in a well-ventilated open area.",
        diySteps: [
          "Turn fuel petcock to OFF position and loosen the float bowl drain screw to empty gasoline into a container.",
          "Loosen clamps on airbox intake boot and engine intake manifold.",
          "Unscrew carburetor top mixing cap and lift out the throttle slide, return spring, and jet needle.",
          "Disconnect throttle cable and choke cable, then remove carburetor from the motorcycle.",
          "Remove the 2 or 3 screws holding the bottom float bowl.",
          "Remove the brass float pin, plastic float, and rubber-tipped needle valve.",
          "Unscrew brass pilot jet and main jet with a precision flathead screwdriver.",
          "Spray carburetor cleaner aerosol through all internal passages and jets until fluid flows cleanly (never poke metal wire through brass jets).",
          "Blow dry with compressed air, reassemble with clean O-rings, and set idle mixture screw 1.5 - 2 turns out."
        ],
        tools: ["Precision Flathead Screwdriver", "Philips Screwdriver", "Carburetor Cleaner Spray", "Compressed Air"]
      },
      {
        id: "fuel-cock",
        image: "/images/parts/fuel-cock.jpg",
        imageCredit: "Wikimedia Commons / Mau Spencer",
        name: "Fuel Cock (Petcock) & Strainer",
        category: "Fuel & Exhaust",
        icon: "Fuel",
        function: "Valve mounted under the fuel tank with internal mesh filter allowing manual selection between ON, OFF, and RESERVE fuel supplies.",
        failures: "Perforated mesh strainer screen, dried rubber face gasket leaking fuel, clogged sediment bowl.",
        symptoms: "Petrol smell while parked, debris reaching carburetor, fuel starvation when accelerating.",
        interval: "Clean sediment bowl every 4,000 km.",
        cost: "₹150 - ₹280",
        difficulty: "Basic DIY",
        safety: "Ensure fuel container is nearby to catch petrol when removing the petcock sediment cup.",
        diySteps: [
          "Switch petcock lever to OFF position.",
          "Place a small container underneath the sediment bowl.",
          "Use a 10mm wrench to unscrew the bottom sediment cup.",
          "Remove the fine nylon mesh strainer and rubber O-ring seal.",
          "Wash out dirt, rust particles, and trapped water from the cup using fresh petrol.",
          "Inspect the mesh for holes or tears (replace strainer if punctured).",
          "Reinstall the strainer, fit the rubber O-ring in its groove, and tighten the sediment cup firmly.",
          "Turn petcock to ON and inspect for any weeping leaks."
        ],
        tools: ["10mm Open Wrench", "Small Catch Basin", "Clean Cloth"]
      },
      {
        id: "fuel-tank",
        image: "/images/parts/fuel-tank.jpg",
        imageCredit: "Wikimedia Commons / Khaosaming",
        name: "Fuel Tank & Breather Cap",
        category: "Fuel & Exhaust",
        icon: "Shield",
        function: "Heavy-gauge steel reservoir holding 9-13 litres of petrol with built-in vapor breather venting to prevent vacuum buildup.",
        failures: "Internal rust from water condensation, clogged fuel cap breather hole, seam leakage.",
        symptoms: "Motorcycle runs for 1-2 km and mysteriously cuts off; opening gas cap makes a 'whoosh' suction sound.",
        interval: "Flush tank rust sediment every 2 years.",
        cost: "₹2,500 - ₹4,200",
        difficulty: "Yellow",
        safety: "Never weld or apply open flames near a fuel tank even if empty; trapped petrol vapors explode violently.",
        diySteps: [
          "Turn petcock OFF, disconnect fuel delivery line.",
          "Remove seat to expose the rear fuel tank mounting bolt.",
          "Unbolt the 12mm rear tank mounting bolt and disconnect fuel gauge sender wiring connector.",
          "Slide tank backward off the front rubber frame pucks and lift free.",
          "Inspect inside using a flashlight for reddish-brown rust scale.",
          "Remove fuel filler cap and blow low-pressure air through the breather vent channel.",
          "Check that rubber mounting pucks on frame are intact to isolate tank from engine vibration.",
          "Reinstall tank, reconnect fuel line and sender wire, and tighten rear mounting bolt."
        ],
        tools: ["12mm Socket", "Flashlight", "Compressed Air Can", "Catch Can"]
      },
      {
        id: "exhaust-muffler",
        image: "/images/parts/exhaust-muffler.jpg",
        imageCredit: "Wikimedia Commons / Liftarn",
        name: "Exhaust Header Pipe & Muffler",
        category: "Fuel & Exhaust",
        icon: "Flame",
        function: "Directs high-temperature exhaust gases away from rider, reduces acoustic pressure waves, and maintains exhaust gas scavenging backpressure.",
        failures: "Cracked header flange gasket, rusted-out silencer bottom, loose baffle rattling.",
        symptoms: "Extremely loud popping exhaust roar, backfiring on deceleration, carbon deposits on cylinder exhaust studs.",
        interval: "Inspect exhaust flange nuts every 4,000 km; check for rust annually.",
        cost: "₹1,800 - ₹3,200 (Full Silencer Assembly)",
        difficulty: "Basic DIY",
        safety: "Exhaust gets above 300°C. Never work on exhaust until bike has cooled for at least 45 minutes.",
        diySteps: [
          "Allow motorcycle exhaust to cool completely.",
          "Locate the two 10mm or 12mm exhaust header flange nuts at the front of the cylinder head.",
          "Spray penetrating oil (WD-40) on the stud threads to prevent snapping old rusted studs.",
          "Loosen header nuts evenly, then remove rear silencer frame hanger bolt (14mm).",
          "Slide exhaust pipe off the cylinder head studs.",
          "Remove and discard the crushed copper/asbestos exhaust port gasket.",
          "Fit a new copper gasket into the cylinder head exhaust port recess.",
          "Mount exhaust, thread header nuts hand-tight first, tighten rear hanger bolt, then torque header nuts evenly."
        ],
        tools: ["12mm Deep Socket", "14mm Box Wrench", "Penetrating Lubricant", "New Copper Exhaust Gasket"]
      },
      {
        id: "catalytic-converter",
        image: "/images/parts/catalytic-converter.jpg",
        imageCredit: "Wikimedia Commons / Tousleso",
        name: "Catalytic Converter & Oxygen Sensor",
        category: "Fuel & Exhaust",
        icon: "Zap",
        function: "Precious metal ceramic honeycomb catalyst (BS6/Euro 5) that converts carbon monoxide, unburnt hydrocarbons, and NOx into harmless gases, monitored by an exhaust O2 sensor.",
        failures: "Soot clogging from unburnt engine oil, thermal meltdown from prolonged misfires, contaminated oxygen sensor.",
        symptoms: "Choked top speed, engine bogging under high load, glowing cherry-red exhaust pipe, check engine light on.",
        interval: "Inspect exhaust emissions during PUC check every 6 months.",
        cost: "₹3,500 - ₹6,500",
        difficulty: "Yellow",
        safety: "Never clean the catalytic converter with harsh acids or wire brushes as it strips the platinum-palladium catalyst washcoat.",
        diySteps: [
          "Scan ECU for emission or O2 sensor error codes using OBD-II scanner tool.",
          "Locate oxygen sensor on the exhaust header pipe.",
          "Disconnect the multi-pin waterproof electrical connector.",
          "Use a 17mm or 22mm oxygen sensor socket to unscrew the sensor counter-clockwise.",
          "Inspect sensor tip; light grey/tan is healthy, heavy black soot indicates rich mixture or oil burn.",
          "Clean sensor tip gently with electronic contact cleaner (never soak in solvents).",
          "Apply anti-seize paste to sensor threads (avoiding sensor tip) and torque to 25 Nm.",
          "Reconnect electrical plug securely until lock tab clicks."
        ],
        tools: ["OBD-II Bike Scanner", "Oxygen Sensor Socket (22mm)", "Electronic Contact Cleaner", "High-Temp Anti-Seize"]
      },
      {
        id: "clutch-assembly",
        image: "/images/parts/clutch-assembly.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Clutch Basket & Friction Plates Pack",
        category: "Transmission",
        icon: "Disc",
        function: "Wet multi-plate clutch system submerged in engine oil that couples and uncouples crankshaft power to the 4-speed/5-speed transmission gearbox.",
        failures: "Burnt friction plate lining (worn below 2.8mm), notched clutch outer basket grooves, warped steel drive plates.",
        symptoms: "Engine revs up when accelerating in 3rd/4th gear but speed doesn't increase (clutch slipping), hard gear shifts.",
        interval: "Clutch plate lifespan typically 25,000 - 35,000 km.",
        cost: "₹650 - ₹1,100 (Plate Kit) / ₹1,800 (Full Assembly)",
        difficulty: "Yellow",
        safety: "Always soak new friction plates in clean engine oil for at least 30 minutes prior to installation.",
        diySteps: [
          "Drain engine oil and disconnect rear brake return spring and kick-starter lever.",
          "Remove right-hand crankcase clutch cover bolts (8mm) in a criss-cross pattern.",
          "Remove the 4 clutch spring retention bolts evenly 1 turn at a time to prevent breaking the aluminum lifter plate.",
          "Remove lifter plate, clutch springs, and the center castle nut using a 4-pin clutch castle nut socket.",
          "Slide out the clutch center hub and the alternating stack of friction plates and steel plates.",
          "Inspect clutch outer basket fingers for notched ridges where plate tabs ride; smooth light notches with a fine file if needed.",
          "Soak new friction plates in clean engine oil.",
          "Reinstall alternating one friction plate, then one steel plate (sharp edge facing same direction).",
          "Reinstall castle nut with lock washer, torque to 45 Nm, reassemble springs evenly, and fit clutch cover with a new gasket."
        ],
        tools: ["8mm T-Spanner", "Clutch Castle Nut Spanner / Socket", "Clutch Hub Holding Tool", "Torque Wrench"]
      },
      {
        id: "gearbox",
        image: "/images/parts/gearbox.jpg",
        imageCredit: "Wikimedia Commons / Liftarn",
        name: "Gearbox Cluster & Shift Mechanism",
        category: "Transmission",
        icon: "Settings",
        function: "Mainshaft and countershaft with constant-mesh gear pairs engaged by sliding dogs moved by shift forks and a grooved shift drum.",
        failures: "Rounded gear dogs, bent shift fork from aggressive stomping, broken shift drum detent star spring.",
        symptoms: "Bike jumps out of gear under throttle load, false neutrals between gears, gear shift lever won't return to center.",
        interval: "Inspect during major engine splitting (40,000+ km).",
        cost: "₹1,800 - ₹3,200",
        difficulty: "Red",
        safety: "Ensure shift fork pins sit perfectly inside shift drum guide tracks before closing crankcase halves.",
        diySteps: [
          "Disassemble engine and split the crankcase halves horizontally or vertically.",
          "Inspect shift drum detent arm roller and heavy spring under the clutch side cover.",
          "Lift out the primary mainshaft and secondary countershaft gear clusters together.",
          "Inspect gear engaging dogs and matching recessed slots for rounding or chipping.",
          "Check shift fork fingers for heat bluing (indicating lack of lubrication) or bending.",
          "Measure shift fork thickness with a vernier caliper against service limit.",
          "Inspect all thrust washers and needle bearings on shafts; replace any scored components.",
          "Reassemble gear clusters with generous assembly lube and verify smooth shifting by rotating the drum manually through all gears."
        ],
        tools: ["Crankcase Splitting Tool", "Vernier Caliper", "Circlip Pliers", "Torque Wrench"]
      },
      {
        id: "cush-drive",
        image: "/images/parts/cush-drive.jpg",
        imageCredit: "Wikimedia Commons / SteinsplitterBot",
        name: "Rear Wheel Cush Drive Rubbers",
        category: "Transmission",
        icon: "CircleDot",
        function: "Pie-shaped vulcanized rubber damper blocks sitting inside the rear wheel hub that absorb drivetrain shock between the rear sprocket and wheel.",
        failures: "Rubber hardening, crumbling, excessive play between sprocket carrier and wheel rim.",
        symptoms: "Noticeable 'thunk' jerk whenever opening or closing throttle, slack feeling when letting out clutch from standstill.",
        interval: "Inspect every 10,000 km; replace every 20,000 km.",
        cost: "₹120 - ₹220 (Set of 4)",
        difficulty: "Basic DIY",
        safety: "Never grease cush drive rubbers with petroleum grease as it dissolves and decomposes the rubber compound.",
        diySteps: [
          "Place motorcycle on center stand.",
          "Remove rear axle nut (19mm) and withdraw the rear wheel axle.",
          "Drop rear wheel downward and disengage the drive chain from the rear sprocket.",
          "Pull the sprocket carrier assembly straight out from the rear wheel hub.",
          "Remove the 4 old rubber wedge damper blocks from their hub pockets.",
          "Wipe out road grime, dirt, and old aluminum dust from the hub pockets.",
          "Insert 4 fresh OEM cush drive rubber blocks into the wheel recesses (they should fit snug without gaps).",
          "Push sprocket carrier firmly into place, remount wheel onto swingarm, align chain adjusters, and torque axle nut."
        ],
        tools: ["19mm Socket Wrench", "17mm Open Wrench", "Clean Rag", "Rubber Mallet"]
      },
      {
        id: "front-brake-disc",
        image: "/images/parts/front-brake-disc.jpg",
        imageCredit: "Wikimedia Commons / TheMalsa",
        name: "Front Disc Brake & Caliper Assembly",
        category: "Brakes",
        icon: "Disc",
        function: "Twin-piston hydraulic sliding caliper clamping brake pads onto a perforated stainless steel rotor when the handlebar lever is squeezed.",
        failures: "Seized caliper sliding guide pins, weeping piston fluid seals, warped disc rotor from heat.",
        symptoms: "Front brake binding / dragging, front wheel difficult to spin by hand, lever pulsing under braking, weak stopping power.",
        interval: "Clean caliper slider pins and inspect pad thickness every 5,000 km.",
        cost: "₹1,200 - ₹2,200 (Caliper) / ₹650 - ₹1,400 (Rotor)",
        difficulty: "Yellow",
        safety: "Never squeeze the front brake lever while the caliper is removed from the disc rotor.",
        diySteps: [
          "Support front wheel off the ground.",
          "Remove the two 12mm caliper mounting bolts securing the caliper to the left fork leg.",
          "Slide caliper gently backward off the disc rotor.",
          "Inspect disc rotor surface with a micrometer (minimum thickness stamped on disc, typically 3.5mm).",
          "Remove caliper slider pins, clean old grease, and lubricate with silicone brake grease (never use normal oil/grease).",
          "Inspect rubber slider pin dust boots for tears.",
          "Check that caliper pistons retract smoothly into their bores.",
          "Remount caliper onto fork leg and torque mounting bolts to 28-30 Nm."
        ],
        tools: ["12mm Socket", "Silicone Brake Pin Grease", "Micrometer", "Torque Wrench"]
      },
      {
        id: "brake-pads",
        image: "/images/parts/brake-pads.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Brake Pads & Fluid Reservoir",
        category: "Brakes",
        icon: "Shield",
        function: "High-friction sintered/organic pads that press against disc rotor; reservoir holds hydraulic DOT 3/4 fluid on the handlebar.",
        failures: "Friction material worn past wear indicator groove (<1.5mm), fluid moisture contamination, spongy air lock.",
        symptoms: "Harsh scraping metallic noise when braking, brake lever pulls all the way to handlebar grip, dark muddy fluid in sight glass.",
        interval: "Inspect pad wear every 3,000 km; flush and replace brake fluid every 2 years.",
        cost: "₹250 - ₹650 (Pads) / ₹120 (Fluid)",
        difficulty: "Basic DIY",
        safety: "Brake fluid ruins painted motorcycle body panels instantly on contact. Wash off immediately with soapy water.",
        diySteps: [
          "Check brake fluid sight glass on handlebar master cylinder; fluid should be amber and clear.",
          "Remove caliper slider retaining pins (often 5mm Allen key or cotter pin).",
          "Slide old brake pads out of caliper.",
          "Clean brake dust off caliper pistons using brake cleaner spray and an old toothbrush.",
          "Use a plastic tire lever or clean wood block to gently push caliper pistons fully back into their bores.",
          "Insert fresh brake pads, ensuring anti-rattle spring clips are seated correctly.",
          "Reinstall pad retaining pin and tighten.",
          "Pump front brake lever 5-8 times until pressure is firm BEFORE riding the motorcycle."
        ],
        tools: ["Brake Cleaner Spray", "5mm Allen Key", "Clean Toothbrush", "Piston Reset Tool / Wood Block"]
      },
      {
        id: "rear-brake-drum",
        image: "/images/parts/rear-brake-drum.jpg",
        imageCredit: "Wikimedia Commons / Gede~commonswiki",
        name: "Rear Drum Brake & Brake Shoes",
        category: "Brakes",
        icon: "CircleDot",
        function: "Internally expanding brake shoes with friction linings forced against rotating wheel drum by a rotating eccentric brake cam.",
        failures: "Worn brake shoe lining (<2.0mm), glazed drum surface, stretched return springs, seized pivot cam.",
        symptoms: "Weak rear brake bite, foot pedal travels too far downward, high-pitched brake squeal, pointer arrow past wear mark.",
        interval: "Inspect wear indicator arrow every 2,000 km; clean drum dust every 4,000 km.",
        cost: "₹180 - ₹350 (Shoe Pair)",
        difficulty: "Basic DIY",
        safety: "Wear a dust mask when cleaning brake drums to avoid inhaling toxic friction dust. Never blow with compressed air dry.",
        diySteps: [
          "Inspect the wear indicator arrow on the brake arm against the hub reference mark with pedal pressed.",
          "If indicator aligns with reference mark, remove rear wheel and pull out the brake panel assembly.",
          "Inspect shoe lining thickness; replace if worn flush or contaminated with grease.",
          "Pull shoes off the pivot pin and cam by folding them inward against spring tension.",
          "Clean drum inner friction surface using sandpaper (80-120 grit) in a circular pattern to remove glaze.",
          "Clean and apply a tiny dab of high-temp grease to the brake cam lobes (avoid friction surface!).",
          "Hook new springs onto new shoes, fold them into place over pivot and cam.",
          "Reassemble wheel, adjust pedal free play (20-30mm) using the rear wing nut."
        ],
        tools: ["19mm Axle Socket", "Sandpaper (120 grit)", "High-Temp Brake Grease", "Pliers"]
      },
      {
        id: "brake-cable-rod",
        image: "/images/parts/brake-cable-rod.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Brake Rod, Linkage & Return Spring",
        category: "Brakes",
        icon: "Settings",
        function: "Solid steel tension rod connecting the foot brake pedal to the rear brake drum operating arm, backed by a pedal return spring and brake light switch spring.",
        failures: "Stripped wing nut threads, bent rod rubbing frame, rusted return spring, misadjusted brake light switch.",
        symptoms: "Brake pedal doesn't spring back up quickly, rear brake drags, brake light stays on constantly.",
        interval: "Lubricate pivot points every 3,000 km.",
        cost: "₹120 - ₹200",
        difficulty: "Basic DIY",
        safety: "Ensure rear brake rod cotter/split pin is installed and spread properly so the pin cannot fall out on the road.",
        diySteps: [
          "Park bike on center stand.",
          "Locate rear brake pedal pivot underneath footrest.",
          "Spray pivot bushing with penetrating spray or apply fresh engine oil/grease.",
          "Inspect return coil spring hooked between pedal and frame.",
          "Turn the rear adjuster wing nut clockwise to reduce pedal travel, counter-clockwise to increase slack.",
          "Ensure 20-30mm pedal free play before brakes start engaging.",
          "Check that the plastic threaded brake light switch activates the tail lamp as soon as free play is taken up."
        ],
        tools: ["10mm Wrench", "Pliers", "Multipurpose Grease", "Clean Rag"]
      },
      {
        id: "telescopic-forks",
        image: "/images/parts/telescopic-forks.jpg",
        imageCredit: "Wikimedia Commons / Cancun",
        name: "Front Telescopic Forks & Oil Seals",
        category: "Suspension",
        icon: "Activity",
        function: "Twin hydraulic suspension stanchions and aluminum sliders containing coil springs and fork damping oil that absorb front wheel road impacts.",
        failures: "Blown rubber fork oil seal, pitted/stone-chipped chrome stanchion tubes, tired sagging springs.",
        symptoms: "Oily wet film on chrome fork pipes, front end dives excessively during braking, bottoming out clunk over bumps.",
        interval: "Change fork oil every 15,000 - 20,000 km; replace seals when leaking.",
        cost: "₹180 (Pair of Seals) + ₹250 (Fork Oil) / ₹2,400 (Fork Assembly)",
        difficulty: "Yellow",
        safety: "Inspect chrome fork tubes for sharp stone nicks. If chrome is nicked, it will slice through new seals within 500 km.",
        diySteps: [
          "Loosen fork top bridge clamp bolts and top fork cap bolts while forks are still clamped in triple tree.",
          "Remove front wheel, brake caliper, and front fender.",
          "Loosen lower triple tree clamp pinch bolts and slide fork legs downward out of triple tree.",
          "Pry off rubber dust boot with a flat screwdriver to reveal the internal wire retaining clip.",
          "Remove wire snap ring clip above the oil seal.",
          "Unscrew bottom Allen damper rod bolt (usually 6mm or 8mm) to drain old foul-smelling fork oil.",
          "Use sliding slide-hammer action to pop chrome stanchion and old oil seal out of aluminum slider.",
          "Slide new seal into place using a PVC pipe seal driver, reinstall snap ring, dust boot, and refill with factory specified 10W fork oil (approx 160-175ml per leg)."
        ],
        tools: ["6mm/8mm Allen Socket", "Fork Seal Driver Tool (or 35mm PVC pipe)", "Snap Ring Pliers", "Graduated Measuring Beaker"]
      },
      {
        id: "rear-shock-absorbers",
        image: "/images/parts/rear-shock-absorbers.jpg",
        imageCredit: "Wikimedia Commons / Ww2censor",
        name: "Rear Shock Absorbers (Twin Dampers)",
        category: "Suspension",
        icon: "Activity",
        function: "Coil-over hydraulic spring dampers mounted between the swingarm and upper frame with stepped preload adjuster rings.",
        failures: "Damper rod seal blowout, loss of hydraulic rebound damping, broken or corroded eyelet rubber bushings.",
        symptoms: "Rear end bounces repeatedly like a pogo stick after bumps, rear bottoming out with pillion rider, visible oil weeping down spring.",
        interval: "Inspect eyelet bushings every 5,000 km; replace dampers every 35,000 km.",
        cost: "₹1,200 - ₹2,200 (Pair)",
        difficulty: "Basic DIY",
        safety: "Always adjust BOTH left and right rear shocks to the EXACT same preload notch. Unequal notches cause high-speed instability.",
        diySteps: [
          "Put motorcycle on center stand so rear wheel hangs unweighted.",
          "Use a hook C-spanner or screwdriver through the preload adjuster cam hole to adjust spring stiffness (Notch 1: soft solo, Notch 5: stiff heavy luggage/pillion).",
          "Ensure both shocks are on identical notches.",
          "To replace, unbolt top 14mm acorn nut and bottom 14mm mounting bolt on one side at a time.",
          "Inspect rubber mounting eyelet bushings for dry rot or cracking.",
          "Slide on new shock absorber onto frame stud.",
          "Reinstall washers and torque mounting fasteners to 35-40 Nm."
        ],
        tools: ["14mm Socket Wrench", "17mm Wrench", "Hook C-Spanner / Preload Tool"]
      },
      {
        id: "steering-bearings",
        image: "/images/parts/steering-bearings.jpg",
        imageCredit: "Wikimedia Commons / JotaCartas",
        name: "Steering Head Cone Set Bearings",
        category: "Suspension",
        icon: "CircleDot",
        function: "Upper and lower caged ball or tapered roller bearings in the frame headstock allowing smooth pivoting of the front fork and handlebar.",
        failures: "Notched bearing races (detent notch when centered), dry dried-up grease, loose steering stem nut.",
        symptoms: "Motorcycle 'wanders' on straight roads requiring constant steering corrections, front-end clunk when hitting front brakes.",
        interval: "Clean, inspect and repack with waterproof grease every 10,000 km.",
        cost: "₹250 - ₹450 (Set)",
        difficulty: "Yellow",
        safety: "Do not over-tighten the steering stem adjuster nut; over-tightening binds steering and causes violent high-speed weave.",
        diySteps: [
          "Prop up front of motorcycle so front wheel is completely off the ground.",
          "Grab lower fork sliders and rock forward and backward; feel for any knocking free play in the headstock.",
          "Turn handlebars gently from lock to lock; feel for any center notchiness or sticking.",
          "To service, remove handlebars, front wheel, fork legs, and top triple clamp.",
          "Unscrew the round slotted steering stem spanner nut.",
          "Lower steering stem out of headstock; catch all loose steel balls if un-caged type.",
          "Clean old hardened grease and inspect bearing cups for indentation dimples (brinelling).",
          "Pack new races generously with high-pressure waterproof lithium wheel bearing grease.",
          "Reassemble and adjust stem nut until steering moves freely with zero play and zero binding."
        ],
        tools: ["Steering Stem Spanner Wrench", "30mm Stem Nut Socket", "Waterproof Wheel Bearing Grease", "Bearing Race Drift"]
      },
      {
        id: "swingarm",
        image: "/images/parts/swingarm.jpg",
        imageCredit: "Wikimedia Commons / Gede~commonswiki",
        name: "Swingarm & Pivot Bushings",
        category: "Suspension",
        icon: "Shield",
        function: "H-shaped rear steel arm pivoting on the main frame that carries the rear wheel, chain adjusters, and rear shock absorbers.",
        failures: "Seized swingarm pivot bolt from water intrusion, worn rubber/bronze pivot bushings, rusted chain adjuster threads.",
        symptoms: "Rear wheel feels like it is steering itself in corners, rear end vagueness at highway speeds, chain constantly going out of alignment.",
        interval: "Grease pivot bolt and inspect side play every 10,000 km.",
        cost: "₹450 - ₹850 (Bushing & Bolt Kit)",
        difficulty: "Yellow",
        safety: "Always support motorcycle by center stand or dedicated paddock stand under the main frame, NOT under the swingarm.",
        diySteps: [
          "Place motorcycle firmly on center stand and remove rear wheel.",
          "Grab the rear ends of the swingarm and try shaking side-to-side laterally.",
          "Any detectable side-to-side play (>1mm) indicates worn pivot bushings.",
          "Remove rear shock lower mounting bolts and disconnect rear brake torque arm.",
          "Remove swingarm pivot axle nut (usually 17mm/19mm) and slide out long pivot axle bolt.",
          "Remove swingarm from frame; press out old worn rubber/steel composite bushings.",
          "Press in new bushings squarely using a threaded rod and washers or arbor press.",
          "Coat pivot bolt thoroughly with waterproof grease and reassemble, torquing pivot nut to 60-70 Nm."
        ],
        tools: ["19mm Socket Wrench", "17mm Box Wrench", "Bushing Press Tool / Threaded Rod", "Waterproof Grease"]
      },
      {
        id: "main-chassis",
        image: "/images/parts/main-chassis.jpg",
        imageCredit: "Wikimedia Commons / Siebrand",
        name: "Chassis Frame & Subframe",
        category: "Suspension",
        icon: "Shield",
        function: "Rigid tubular steel backbone chassis engineered to hold the powertrain, steering geometry, and suspension mounting points securely.",
        failures: "Welded seam cracks from overloading, bent frame tube after an accident, surface rust behind battery box.",
        symptoms: "Motorcycle pulls persistently to one side with hands off handlebars, front and rear wheel tracks do not align.",
        interval: "Inspect frame tubes and weld points during routine services.",
        cost: "₹6,000 - ₹12,000",
        difficulty: "Red",
        safety: "Never attempt to heat and straighten heavily kinked chassis tubes yourself; metal fatigue can lead to catastrophic failure.",
        diySteps: [
          "Remove fuel tank and side panels to expose main frame backbone and engine cradle.",
          "Inspect all welded joints with a flashlight for hairline paint cracks indicating stressed welds.",
          "Inspect the area under the battery tray for acid damage and surface rust.",
          "Check engine mounting bolts (usually 3 or 4 points); ensure all are torqued tightly (loose engine bolts cause extreme vibration).",
          "Clean any surface rust with a wire brush, treat with rust converter primer, and touch up with anti-corrosive frame black paint."
        ],
        tools: ["Wire Brush", "Rust Converter Primer", "Anti-Corrosion Touchup Paint", "Torque Wrench"]
      },
      {
        id: "stands-footpegs",
        image: "/images/parts/stands-footpegs.jpg",
        imageCredit: "Wikimedia Commons / BotMultichillT",
        name: "Center Stand, Side Stand & Footpegs",
        category: "Suspension",
        icon: "Settings",
        function: "Vehicle parking support structures and rubber-cushioned rider footrests with safety return springs and interlock cut-off sensors.",
        failures: "Snapped stand return spring, bent stand pivot pin causing bike to lean excessively on side stand, worn footpeg rubber.",
        symptoms: "Side stand scrapes road surface during left turns, bike cuts off when put in gear due to faulty side-stand switch.",
        interval: "Lubricate stand pivot pins every 2,000 km.",
        cost: "₹180 - ₹450",
        difficulty: "Basic DIY",
        safety: "Never ride with a weak side stand spring that allows the stand to drop while riding; it can dig into tarmac and throw the rider.",
        diySteps: [
          "Inspect dual return springs on center stand and side stand for stretch or rust.",
          "Spray penetrating fluid on pivot joint, followed by thick aerosol chain lube or grease.",
          "Tighten side stand pivot bolt and inspect the locknut on the back.",
          "Test the side stand safety switch (bike should cut engine if shifted into 1st gear while side stand is down).",
          "Inspect rider footpeg rubbers; replace if worn smooth to prevent feet slipping off wet pegs."
        ],
        tools: ["Spring Hook Tool / Pliers", "14mm Socket", "17mm Wrench", "Waterproof Lubricant Spray"]
      },
      {
        id: "front-tyre",
        image: "/images/parts/front-tyre.JPG",
        imageCredit: "Wikimedia Commons / K1200RSRIDER",
        name: "Front Wheel & Tyre Assembly",
        category: "Wheels",
        icon: "CircleDot",
        function: "Directional contact patch delivering 70%+ of motorcycle braking grip, road feedback, and cornering trajectory.",
        failures: "Uneven cupping tread wear, punctures, dry rot sidewall cracks, bent alloy rim lip.",
        symptoms: "Handlebar shimmy at 40-60 km/h, steering feels heavy and sluggish when tire pressure drops below spec, rapid pressure loss.",
        interval: "Inspect cold tire pressure weekly (spec: 25 psi); replace tire when tread depth reaches 1.5mm TWI mark.",
        cost: "₹1,400 - ₹2,200",
        difficulty: "Basic DIY",
        safety: "Under-inflated front tires make steering extremely heavy and can cause rim damage over moderate road potholes.",
        diySteps: [
          "Check tire pressure cold using a reliable digital pressure gauge (recommended: 25 psi).",
          "Inspect tread depth across center and shoulders using the built-in Tread Wear Indicator (TWI) triangular markings on the sidewall.",
          "Inspect tread grooves for embedded gravel, nails, or glass shards.",
          "Inspect tire sidewall for cracks, bulges, or perishing rubber.",
          "Spin wheel by hand while looking down the rim edge to check for rim dent runout.",
          "If tubeless puncture occurs, ream puncture hole, insert vulcanizing sticky rope plug with T-handle tool, trim excess, and reinflate."
        ],
        tools: ["Digital Tire Pressure Gauge", "Tire Tread Depth Gauge", "Tubeless Puncture Repair Kit", "Foot Pump / Portable Inflator"]
      },
      {
        id: "rear-tyre",
        image: "/images/parts/rear-tyre.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Rear Wheel & Tyre Assembly",
        category: "Wheels",
        icon: "CircleDot",
        function: "Wide traction contact patch transferring engine torque, carrying passenger payload, and maintaining stability during acceleration.",
        failures: "Center tread flat-spotting from highway commuting, punctures, valve stem rubber degradation.",
        symptoms: "Rear end wobbling or sliding unexpectedly over road paint markings, loss of traction in wet conditions.",
        interval: "Check cold tire pressure weekly (spec: 28-32 psi solo, 36 psi pillion); replace at 25,000 - 35,000 km.",
        cost: "₹1,800 - ₹2,800",
        difficulty: "Basic DIY",
        safety: "Never ride on a completely flat rear tire; the tire can debead from the rim instantly, causing total loss of balance.",
        diySteps: [
          "Check cold tire pressure with pressure gauge (standard: 32 psi solo, 36 psi with pillion).",
          "Inspect tire valve stem cap and check for micro-leaks by spraying soapy water on valve core.",
          "Check for square tread flat-spot profile resulting from upright commuting.",
          "Inspect wheel spokes for tightness (on spoked models) by tapping spokes with a wrench (should emit clean musical ring, not dull thud).",
          "Verify rear wheel alignment notches on both sides of swingarm are matched equally."
        ],
        tools: ["Tire Pressure Gauge", "Valve Core Tool", "Soapy Water Spray", "12mm Alignment Wrench"]
      },
      {
        id: "wheel-bearings",
        image: "/images/parts/wheel-bearings.png",
        imageCredit: "Wikimedia Commons / Niabot",
        name: "Wheel Bearings & Axle Spacers",
        category: "Wheels",
        icon: "CircleDot",
        function: "Sealed deep-groove radial ball bearings (typically 6301/6202 RS) fitted inside wheel hubs to enable friction-free wheel rotation.",
        failures: "Washed-out grease from pressure washing, rusted steel balls, split dust lip seals.",
        symptoms: "Rumbling grinding sound at speed, wheel feels loose when shaken with hands off ground, bike drifts laterally on road.",
        interval: "Inspect every wheel removal or every 10,000 km.",
        cost: "₹120 - ₹240 (Per Bearing)",
        difficulty: "Yellow",
        safety: "A seized wheel bearing at highway speeds will lock the wheel instantly and cause a crash. Never ignore wheel bearing play.",
        diySteps: [
          "Raise wheel off the ground.",
          "Grasp top and bottom of tire and rock firmly perpendicular to the bike; feel for any clicking free play at the hub center.",
          "Remove wheel axle and pull wheel off.",
          "Insert index finger into the bearing inner race and rotate; rotation must be glass-smooth with zero roughness, grating, or gritty feel.",
          "To replace, drive out opposite bearing from inside hub using a long brass drift and hammer.",
          "Remove internal axle spacer pipe.",
          "Drive in new sealed bearing by tapping ONLY the outer race using a matching socket (never hammer the inner race or dust seal!).",
          "Reinstall center spacer pipe and drive in second bearing until seated firmly."
        ],
        tools: ["Brass Drift / Punch", "Bearing Driver Set / Sockets", "Ball Peen Hammer", "Waterproof Grease"]
      },
      {
        id: "stator-magneto",
        image: "/images/parts/stator-magneto.jpg",
        imageCredit: "Wikimedia Commons / Ritchyblack",
        name: "Alternator / Stator Magneto Coil",
        category: "Electrical",
        icon: "Zap",
        function: "Multi-pole copper wire stator coils bathed in oil on the left engine cover, energized by rotating flywheel permanent magnets to generate AC electricity.",
        failures: "Burnt/shorted copper windings, melted insulation from engine overheating, faulty pickup/pulsar coil.",
        symptoms: "Battery goes dead while riding, headlights dim to a faint glow, engine dies suddenly once battery runs flat.",
        interval: "Test charging output voltage every 6,000 km.",
        cost: "₹850 - ₹1,400",
        difficulty: "Yellow",
        safety: "Disconnect battery negative terminal before testing or opening alternator engine cover.",
        diySteps: [
          "Locate 3-wire or multi-wire alternator wiring harness coupler coming out of left engine crankcase.",
          "Unplug the coupler and set digital multimeter to AC Voltage (~200V AC range).",
          "Start engine and measure AC voltage across yellow/white stator output pins (should read 25V - 60V AC depending on engine RPM).",
          "Turn engine off, switch multimeter to Resistance (Ohms) mode.",
          "Measure coil resistance between pins (typically 0.4 - 1.2 Ohms); check that none of the charging leads are shorted to engine ground (infinity Ohms).",
          "Measure pickup coil resistance (typically 120 - 250 Ohms).",
          "If coils are shorted or burnt black, remove left crankcase cover and replace stator assembly with a new cover gasket."
        ],
        tools: ["Digital Multimeter", "Flywheel Rotor Holder", "8mm T-Spanner", "New Left Cover Gasket"]
      },
      {
        id: "regulator-rectifier",
        image: "/images/parts/regulator-rectifier.png",
        imageCredit: "Wikimedia Commons / Bloodshedder~commonswiki",
        name: "Voltage Regulator / Rectifier (RR Unit)",
        category: "Electrical",
        icon: "Cpu",
        function: "Solid-state finned aluminum heatsink module converting alternating current (AC) from the stator to direct current (DC) and regulating charging voltage to 14.4V.",
        failures: "Internal diode bridge failure, open regulator circuit leading to severe overcharging (>16V), melted wiring connector.",
        symptoms: "Blowing headlight bulbs repeatedly, boiling and overflowing battery acid, dead battery not charging.",
        interval: "Check regulated voltage at battery terminals every service.",
        cost: "₹350 - ₹750",
        difficulty: "Basic DIY",
        safety: "Overcharging above 15.5V generates explosive hydrogen gas from lead-acid batteries and destroys digital instrument clusters.",
        diySteps: [
          "Connect digital multimeter DC Voltage probes directly to battery terminals (+ and -).",
          "Note resting battery voltage (healthy: ~12.6V DC).",
          "Start engine and rev smoothly to 4,000 - 5,000 RPM.",
          "Multimeter reading should rise and stabilize strictly between 13.8V and 14.6V DC.",
          "If voltage shoots above 15.5V or fails to rise above 12.8V, the RR unit has failed.",
          "Locate RR unit mounted on the frame under side panels (finned black aluminum box).",
          "Unplug the wiring harness connector and inspect terminals for melting or green corrosion.",
          "Unbolt the 10mm mounting bolts, clean frame contact surface (ensuring clean chassis ground), and install new RR unit."
        ],
        tools: ["Digital Multimeter", "10mm Socket Wrench", "Electrical Contact Cleaner"]
      },
      {
        id: "starter-motor",
        image: "/images/parts/starter-motor.jpg",
        imageCredit: "Wikimedia Commons / Rama",
        name: "Electric Starter Motor & Solenoid Relay",
        category: "Electrical",
        icon: "Zap",
        function: "High-power DC series electric motor with starter solenoid relay and one-way roller clutch that cranks the engine over at the push of the handlebar button.",
        failures: "Worn carbon brushes (<4mm), burned copper commutator segments, stuck starter relay contacts, worn one-way sprag clutch.",
        symptoms: "Clicking sound under seat but engine doesn't turn, starter motor spins freely with a whirring whine without cranking engine, starter stays running with key off.",
        interval: "Inspect starter carbon brushes every 25,000 km.",
        cost: "₹1,400 - ₹2,400 (Motor) / ₹180 - ₹350 (Relay)",
        difficulty: "Yellow",
        safety: "Starter motor cable connects directly to battery positive. Always disconnect battery negative before loosening starter motor terminals.",
        diySteps: [
          "If starter clicks but doesn't crank, measure battery voltage while pressing starter button (if voltage drops below 9.5V, battery is weak).",
          "Check starter solenoid relay: bridge the two thick brass 10mm posts on the relay with an insulated screwdriver handle; if starter cranks, relay is faulty.",
          "To service starter motor, unbolt heavy 12V positive feed wire from starter terminal.",
          "Remove two 8mm/10mm starter motor mounting bolts on crankcase.",
          "Slide starter motor backward out of engine case.",
          "Disassemble motor shell and inspect spring-loaded carbon brushes; replace if worn down to wire lead.",
          "Clean copper commutator bars with 400-grit sandpaper and blow away conductive carbon dust.",
          "Reassemble with new O-ring seal, coat nose splines with grease, and reinstall."
        ],
        tools: ["10mm Socket", "8mm Socket", "Philips Screwdriver", "400-Grit Sandpaper", "Digital Multimeter"]
      },
      {
        id: "ignition-coil",
        image: "/images/parts/ignition-coil.jpg",
        imageCredit: "Wikimedia Commons / Ascaron",
        name: "Ignition Coil & High-Tension (HT) Lead",
        category: "Electrical",
        icon: "Zap",
        function: "Pulse transformer stepping up low-voltage 12V/100V pulses to 20,000 - 30,000 volts delivered through the thick HT lead to the spark plug.",
        failures: "Internal winding breakdown, cracked plastic casing arcing spark to frame in humid weather, corroded spark plug boot resistor.",
        symptoms: "Engine cutting out during rain or bike wash, intermittent misfiring under heavy throttle, weak yellow/orange spark.",
        interval: "Inspect HT wire and spark plug cap every 8,000 km.",
        cost: "₹280 - ₹480",
        difficulty: "Basic DIY",
        safety: "High secondary ignition voltage can deliver an intense, painful electrical shock. Keep hands clear while cranking with plug removed.",
        diySteps: [
          "Locate ignition coil bolted to the top chassis frame rail underneath the fuel tank.",
          "Check secondary resistance: unscrew spark plug cap from HT lead by twisting counter-clockwise.",
          "Connect multimeter between primary spade terminal and thick HT wire core (secondary resistance: 3,000 - 6,000 Ohms).",
          "Test spark plug boot internal ceramic noise resistor with multimeter (standard: ~5,000 Ohms; replace cap if open circuit).",
          "Trim 5mm off the end of the HT lead with sharp cutters to expose fresh un-oxidized copper wire.",
          "Screw spark plug cap clockwise firmly into the core of the HT lead until snug.",
          "Clean coil metal mounting bracket and frame contact point to ensure solid ground return."
        ],
        tools: ["Digital Multimeter", "Wire Cutters", "10mm Socket", "Silicone Dielectric Grease"]
      },
      {
        id: "cdi-unit",
        image: "/images/parts/cdi-unit.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "CDI / Engine Control Unit (ECU)",
        category: "Electrical",
        icon: "Cpu",
        function: "Capacitor Discharge Ignition unit (or electronic fuel injection ECU) processing crankshaft timing pulses to trigger spark advance maps.",
        failures: "Vibration fatigue of internal circuit board solder joints, water ingress, overvoltage spike.",
        symptoms: "Sudden total loss of spark, engine shuts down abruptly after warming up, erratic high-RPM rev limiter stutter.",
        interval: "Maintenance-free solid-state electronic unit.",
        cost: "₹450 - ₹1,200",
        difficulty: "Basic DIY",
        safety: "Never disconnect or connect CDI / ECU plugs while the ignition key switch is ON.",
        diySteps: [
          "Locate the CDI / ECU rubber mounting sleeve under the seat or side cover.",
          "Verify the unit is firmly cushioned in its rubber damper sleeve (direct metal vibration ruins solid-state circuits).",
          "Unplug the multi-pin electrical harness connector.",
          "Inspect all male and female pins for greenish corrosion, backed-out pins, or moisture.",
          "Spray electronic contact cleaner into both sides of the connector.",
          "Check CDI ground wire (green wire on Hero/Honda bikes) for 0.0 Ohm continuity to chassis ground.",
          "Re-seat connector firmly until retaining latch clicks closed."
        ],
        tools: ["Electrical Contact Cleaner Spray", "Digital Multimeter"]
      },
      {
        id: "headlight-assembly",
        image: "/images/parts/headlight-assembly.jpg",
        imageCredit: "Wikimedia Commons / Sandstein",
        name: "Headlight, Tail Lamp & Indicators",
        category: "Electrical",
        icon: "Zap",
        function: "Illumination and safety signaling system including halogen/LED headlight bulb, red rear tail/brake light, and amber flashing turn signals.",
        failures: "Blown tungsten filament, corroded bulb bayonet socket contacts, failed blinker flasher relay, cracked plastic lens.",
        symptoms: "Indicators stay lit steady without blinking, headlight beam flickering when handlebar turns, dead brake light.",
        interval: "Inspect all lights before every night ride; adjust headlight beam alignment every 6,000 km.",
        cost: "₹80 - ₹250 (Bulbs) / ₹450 - ₹1,200 (Assembly)",
        difficulty: "Basic DIY",
        safety: "Never touch halogen headlight glass bulbs with bare fingers; finger oils create hotspot hotspots that cause the glass envelope to shatter.",
        diySteps: [
          "To replace headlight bulb, remove front headlight cowl screws (usually 4 screws).",
          "Pull off the 3-pin H4 socket connector.",
          "Pull off the flexible rubber weather-sealing boot.",
          "Unclip the spring steel wire retainer clip.",
          "Withdraw old bulb; align the 3 indexing tabs of the new 35/35W bulb into reflector slots.",
          "Fasten wire clip, refit rubber dust boot tightly around bulb base, and plug in 3-pin socket.",
          "Adjust headlight beam vertical angle screw so high beam illuminates road ahead without blinding oncoming traffic."
        ],
        tools: ["Philips Screwdriver", "Clean Cloth / Gloves", "Replacement H4/HS1 Bulb"]
      },
      {
        id: "switchgear-throttle",
        image: "/images/parts/switchgear-throttle.jpg",
        imageCredit: "Wikimedia Commons / Matanya",
        name: "Handlebar Switchgear & Throttle Cable",
        category: "Electrical",
        icon: "Settings",
        function: "Left and right handlebar control pods housing turn signal switch, horn button, high/low beam selector, pass switch, starter push button, and twist grip throttle cable.",
        failures: "Oxidized brass contacts inside switches, dirt ingress, frayed throttle inner cable, sticky twist-grip return.",
        symptoms: "Horn works intermittently, turn signals don't cancel smoothly, throttle fails to snap shut when released (dangerous!).",
        interval: "Clean switch internals with contact cleaner and lubricate throttle cable every 6,000 km.",
        cost: "₹120 - ₹180 (Throttle Cable) / ₹350 - ₹750 (Switch Unit)",
        difficulty: "Basic DIY",
        safety: "Throttle MUST snap closed instantly when released at all handlebar angles (full left, center, full right). A sticking throttle causes runaway crashes.",
        diySteps: [
          "Remove the two Philips screws holding the right-hand handlebar switch pod together.",
          "Separate switch halves to access the throttle tube drum.",
          "Unhook the barrel nipple of the inner throttle cable from the plastic throttle twist grip.",
          "Inspect throttle cable inner wire for fraying strands.",
          "Apply cable lube down inside the outer cable sleeve until clean fluid drips out at the carburetor end.",
          "Clean dried grease and grit off the steel handlebar tube under the plastic throttle grip.",
          "Reassemble switch pod, adjust throttle free play at inline adjuster to 2-4mm, and verify instant snap-back return."
        ],
        tools: ["Philips Screwdriver", "10mm Open Wrench", "Cable Lube Tool", "Electrical Contact Cleaner"]
      },
      {
        id: "instrument-cluster",
        image: "/images/parts/instrument-cluster.jpg",
        imageCredit: "Wikimedia Commons / DanTD",
        name: "Instrument Cluster & Speedometer Cable",
        category: "Electrical",
        icon: "Gauge",
        function: "Dashboard display unit conveying vehicle speed, total odometer mileage, fuel gauge level, neutral indicator, and high beam warning.",
        failures: "Broken inner speedometer cable core, stripped plastic front wheel drive gear, burned instrument backlight bulb.",
        symptoms: "Speedometer needle stays at 0 km/h or jumps erratically, odometer numbers stop advancing, fuel gauge needle stuck.",
        interval: "Lubricate speedometer drive cable core every 6,000 km.",
        cost: "₹90 - ₹150 (Speedo Cable) / ₹950 - ₹2,200 (Cluster)",
        difficulty: "Basic DIY",
        safety: "Ensure speedometer cable is routed smoothly with no sharp bends that cause internal friction and cable snap.",
        diySteps: [
          "Unscrew the knurled metal collar nut at the bottom of the front wheel speedometer gear hub.",
          "Pull out the square-tipped flexible inner steel speedometer drive cable.",
          "Inspect cable core; if broken in two, pull out broken half from top behind speedometer.",
          "Wipe cable clean, coat generously with light multipurpose grease.",
          "Slide greased cable back into outer housing, rotating slowly until bottom square tip engages into speedometer drive gear slot.",
          "Tighten knurled collar nut by hand (pliers not required).",
          "Spin front wheel by hand and observe that speedometer needle rises smoothly."
        ],
        tools: ["Pliers (for gentle grip)", "Multipurpose Grease", "Clean Wiping Rag"]
      },
      {
        id: "wiring-harness",
        image: "/images/parts/wiring-harness.jpg",
        imageCredit: "Wikimedia Commons / Jcrispin64",
        name: "Main Wiring Harness & Fuse Box",
        category: "Electrical",
        icon: "Cpu",
        function: "Color-coded insulated multi-circuit wiring loom routing power from battery and stator to ignition, lighting, sensors, and controls, protected by main fuses.",
        failures: "Blown 10A/15A glass or blade fuse, wire chafing and shorting to frame near steering headstock, corroded earthing eyelet.",
        symptoms: "Total loss of all electrical power (dead display, horn, starter), intermittent headlight flickering when turning handlebar left/right.",
        interval: "Inspect fuse box and wiring loom at steering pivot point every 10,000 km.",
        cost: "₹10 (Fuse) / ₹950 - ₹1,800 (Full Wiring Loom)",
        difficulty: "Basic DIY",
        safety: "NEVER replace a blown fuse with aluminum foil or copper wire. A fuse protects the motorcycle from catching fire in a short circuit.",
        diySteps: [
          "Locate main fuse holder (usually situated inside a rubber pouch next to the 12V battery under the left side panel).",
          "Pop open the waterproof fuse cover.",
          "Pull out the blade/glass fuse (typically 10 Amp red or 15 Amp blue).",
          "Inspect the metallic filament through the transparent plastic casing; if the bridge is broken/melted, the fuse is blown.",
          "Replace ONLY with a fuse of the EXACT same amperage rating (spare fuse is stored inside the cover).",
          "If the new fuse blows immediately upon turning ignition key, trace the wiring loom near the headstock where wires flex for a rubbed-through short circuit.",
          "Clean the main battery earth (ground) ring terminal bolted to the engine crankcase or frame."
        ],
        tools: ["Fuse Puller / Needle-Nose Pliers", "Replacement 10A/15A Fuses", "Electrical Tape"]
      }
    ],
    symptomMap: {
      "slow-starting": {
        cause: "Spark plug fouled/clogged or Weak Battery.",
        diy: "Basic DIY",
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
        diy: "Basic DIY",
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
        diy: "Basic DIY",
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
            "id": "spark-plug",
            "name": "Spark Plug (NGK MR7C-9N)",
            "category": "Engine",
            "icon": "Zap",
            "image": "/images/parts/spark-plug.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Delivers electric spark to ignite compressed air-fuel charge in the combustion chamber.",
            "failures": "Carbon fouling, gap widening, porcelain insulator cracking, oil fouling.",
            "symptoms": "Engine cold-starting refusal, intermittent missing during acceleration, low fuel efficiency.",
            "interval": "Inspect & clean every 4,000 km, replace every 12,000 km.",
            "cost": "₹140 - ₹190",
            "difficulty": "Basic DIY",
            "safety": "Under-seat luggage box must be removed for access. Allow engine to cool before unscrewing.",
            "diySteps": [
                  "Open the seat, remove 4x 10mm bolts inside the storage bucket using a 10mm T-spanner.",
                  "Lift out the plastic luggage bucket to access the top of the engine cylinder head.",
                  "Pull off the black rubber spark plug cap firmly by hand.",
                  "Use a 16mm spark plug box spanner to turn the spark plug counter-clockwise and remove it.",
                  "Inspect the central electrode. Clean deposits with a brass wire brush and check gap (0.8 - 0.9 mm).",
                  "Hand-thread the plug clockwise into cylinder head first to prevent cross-threading, then tighten with spanner 1/8 turn.",
                  "Push plug cap until it clicks, refit luggage bucket, and tighten the 4 bolts."
            ],
            "tools": [
                  "10mm T-spanner",
                  "16mm Spark Plug Spanner",
                  "Feeler Gauge (0.8mm)",
                  "Brass Wire Brush"
            ]
      },
      {
            "id": "engine-oil",
            "name": "Engine Oil 10W-30 (JASO MB)",
            "category": "Engine",
            "icon": "Droplet",
            "image": "/images/parts/engine-oil.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Lubricates low-friction roller rocker arms, crankshaft bearings, and cylinder bore in Honda eSP engine.",
            "failures": "Thermal breakdown, fuel dilution, sludge buildup, low oil level leading to piston seizure.",
            "symptoms": "Engine overheating, harsh mechanical noise from valvetrain, sluggish pickup, burning oil smoke.",
            "interval": "Inspect monthly, replace every 4,000 km (Drain volume: 0.70 L, Dry capacity: 0.80 L).",
            "cost": "₹340 - ₹420",
            "difficulty": "Basic DIY",
            "safety": "Always use JASO MB certified oil for scooters. Never overtighten the 12mm aluminium crankcase drain bolt.",
            "diySteps": [
                  "Warm the engine for 3 minutes, then place scooter on center stand on level ground.",
                  "Place oil drain pan beneath the left underside of the crankcase.",
                  "Loosen and remove the 12mm oil drain bolt located near the bottom of the engine casing.",
                  "Allow dark oil to drain completely for 5 minutes.",
                  "Inspect the sealing washer, clean the magnetic drain plug, and reinstall (Torque: 24 Nm).",
                  "Remove dipstick on right side, pour in exactly 700ml of fresh 10W-30 JASO MB oil using clean funnel.",
                  "Wipe dipstick clean, insert without screwing in to verify level sits between min/max markings."
            ],
            "tools": [
                  "12mm Ring Spanner",
                  "Oil Drain Pan",
                  "Clean Funnel",
                  "Shop Rag"
            ]
      },
      {
            "id": "air-filter",
            "name": "Viscous Paper Air Filter",
            "category": "Fuel & Exhaust",
            "icon": "Wind",
            "image": "/images/parts/air-filter.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Oil-impregnated viscous cellulose paper traps fine road dust without restricting intake airflow.",
            "failures": "Dirt saturation, paper pleat clogging. Viscous filters cannot be blown with air or washed.",
            "symptoms": "Severe pickup drop, fuel consumption surging, black exhaust smoke under load.",
            "interval": "Replace every 15,000 km (or earlier in heavy dust conditions).",
            "cost": "₹240 - ₹310",
            "difficulty": "Basic DIY",
            "safety": "Never blow with compressed air or wash with water/petrol, as this strips the oil layer and ruins filtration.",
            "diySteps": [
                  "Locate the plastic air cleaner housing on the left side above the transmission case.",
                  "Remove the 5 Philips-head perimeter screws securing the air filter box cover.",
                  "Swing open the cover and pull out the rectangular viscous air filter cartridge.",
                  "Wipe out any loose sand and oil residue inside the airbox housing using a lint-free damp cloth.",
                  "Insert the new genuine Honda viscous filter element with rubber sealing lip facing inward.",
                  "Reinstall the cover, ensuring rubber gasket is seated properly, and tighten the 5 screws evenly."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "Lint-free Cotton Cloth"
            ]
      },
      {
            "id": "battery",
            "name": "Maintenance-Free 12V 3Ah VRLA Battery",
            "category": "Electrical",
            "icon": "BatteryCharging",
            "image": "/images/parts/battery.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Supplies current to PGM-FI electronic fuel pump, ACG starter unit, ECU, and full-LED headlamp.",
            "failures": "Sulphation, terminal corrosion, cell voltage decay below 12.4V.",
            "symptoms": "Silent electric start, dim headlamp on idle, horn sounding feeble, FI warning lamp flashing.",
            "interval": "Inspect terminal tightness every 6 months, replace every 3-4 years.",
            "cost": "₹1,250 - ₹1,650",
            "difficulty": "Basic DIY",
            "safety": "Disconnect the black negative (-) terminal first, connect red positive (+) terminal first during installation.",
            "diySteps": [
                  "Park scooter on center stand and switch ignition to OFF.",
                  "Remove 2 screws securing the front nose apron service panel.",
                  "Gently unclip the plastic panel to access the vertical battery bracket inside.",
                  "Remove the rubber retaining strap.",
                  "Disconnect the negative (-) black terminal bolt first, then the positive (+) red terminal bolt.",
                  "Slide out old battery, clean terminal leads with wire brush.",
                  "Insert new 12V 3Ah / 4Ah VRLA battery, connect (+) red first, then (-) black.",
                  "Apply petroleum jelly to terminals to inhibit sulphate crust and clip front panel back on."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "8mm Open-End Spanner",
                  "Petroleum Jelly"
            ]
      },
      {
            "id": "variator-rollers",
            "name": "CVT Variator & Weight Rollers (6x)",
            "category": "Transmission",
            "icon": "RefreshCw",
            "image": "/images/parts/clutch-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Centrifugal roller weights expand outward inside the variator pulley ramps to automatically vary the drive ratio.",
            "failures": "Flat-spotting on roller faces, plastic bushing wear, ramp plate guide degradation.",
            "symptoms": "Jerky initial takeoff, scooter revving loud without speed gain (slipping), loss of top-end speed.",
            "interval": "Inspect every 8,000 km, replace rollers every 16,000 km.",
            "cost": "₹280 - ₹450 (Set of 6)",
            "difficulty": "Moderate DIY",
            "safety": "A variator holder locking tool is required to loosen the 17mm crankshaft nut without spinning the crank.",
            "diySteps": [
                  "Remove left crankcase CVT aluminium cover bolts (8mm, 9 pieces) and lift off cover.",
                  "Fix the variator locking tool onto the drive face teeth.",
                  "Loosen the central 17mm variator nut counter-clockwise using a 17mm socket.",
                  "Slide off outer drive face fan, washer, and inner movable variator hub.",
                  "Remove the ramp plate and inspect the 6 cylindrical weight rollers.",
                  "Clean ramp tracks with brake cleaner. If any roller has flat spots, replace all 6 together.",
                  "Install new rollers dry (no grease on modern eSP dry variators), reinstall ramp plate and tighten nut to 59 Nm."
            ],
            "tools": [
                  "8mm T-spanner",
                  "17mm Socket & Ratchet",
                  "Variator Holder Tool",
                  "Brake Cleaner"
            ]
      },
      {
            "id": "v-belt",
            "name": "Kevlar Reinforced Drive V-Belt",
            "category": "Transmission",
            "icon": "RefreshCw",
            "image": "/images/parts/chain.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Transfers rotating torque between the front variator pulley and rear centrifugal driven pulley.",
            "failures": "Transverse cracking, sidewall narrowing, cord fraying, sudden snap under high load.",
            "symptoms": "Slipping under steep climbs, rubber burning smell, sudden total loss of propulsion while engine revs.",
            "interval": "Inspect every 8,000 km, replace mandatory at 20,000 km.",
            "cost": "₹480 - ₹680",
            "difficulty": "Moderate DIY",
            "safety": "Inspect belt width with vernier caliper (service limit: 17.5 mm). Always mount with directional arrow pointing forward.",
            "diySteps": [
                  "Remove the 8mm bolts on the left transmission case cover and remove case.",
                  "Loosen front variator nut (17mm) and rear clutch outer bell nut (14mm).",
                  "Squeeze rear driven pulley halves apart by hand to let the belt drop into the pulley valley.",
                  "Slide the old belt off the shafts.",
                  "Inspect new belt for rotation direction arrow and loop over rear clutch pulley first.",
                  "Guide front loop over crankshaft splines, refit variator outer face, and hand-tighten nuts.",
                  "Torque 17mm front nut (59 Nm) and 14mm rear nut (49 Nm), rotate pulley by hand to seat belt.",
                  "Reinstall CVT case cover and tighten 8mm bolts in criss-cross pattern."
            ],
            "tools": [
                  "8mm T-Spanner",
                  "17mm & 14mm Sockets",
                  "Universal Pulley Holder",
                  "Vernier Caliper"
            ]
      },
      {
            "id": "centrifugal-clutch",
            "name": "Driven Pulley & Centrifugal Clutch Assembly",
            "category": "Transmission",
            "icon": "Disc",
            "image": "/images/parts/clutch-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Triple friction shoes expand centrifugally against the clutch bell when engine RPM crosses ~2,200 RPM.",
            "failures": "Glazed shoe friction pads, weakened clutch shoe return springs, worn torque cam guide pins.",
            "symptoms": "Violent scooter shuddering/vibrating at 10-25 km/h, delayed take-off, clutch slipping.",
            "interval": "Inspect and deglaze every 8,000 km, replace clutch shoes every 24,000 km.",
            "cost": "₹650 - ₹1,100",
            "difficulty": "Moderate DIY",
            "safety": "The heavy central torque spring is under strong compression. Use a clutch compressor tool when disassembling.",
            "diySteps": [
                  "With CVT cover removed, hold clutch bell with universal holder and remove 14mm nut.",
                  "Slide off outer clutch bell and pull off the entire driven pulley assembly.",
                  "Inspect the 3 friction shoe linings for thickness (service limit: 2.0 mm).",
                  "Scuff glazed shoes lightly with 120-grit emery paper to restore grip.",
                  "Inspect the big torque spring and guide pin slots for free axial movement.",
                  "Slide assembly back onto rear drive shaft, install bell, and torque 14mm nut to 49 Nm."
            ],
            "tools": [
                  "14mm Socket Wrench",
                  "Universal Clutch Holder",
                  "120-Grit Sandpaper",
                  "Vernier Caliper"
            ]
      },
      {
            "id": "clutch-bell",
            "name": "Clutch Outer Bell Housing",
            "category": "Transmission",
            "icon": "Disc",
            "image": "/images/parts/clutch-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Cylindrical steel drum attached to the final transmission input shaft that mates with centrifugal shoes.",
            "failures": "Heat discolouration (blueing), inner friction drum grooving, out-of-round warping.",
            "symptoms": "Pulsing vibration on launch, screeching metallic noise during standing start acceleration.",
            "interval": "Inspect every 8,000 km for scoring or blue heat temper.",
            "cost": "₹380 - ₹550",
            "difficulty": "Moderate DIY",
            "safety": "Clean inner drum with degreaser only. Never apply oil, grease, or WD-40 inside the clutch bell.",
            "diySteps": [
                  "Remove transmission case cover using 8mm socket.",
                  "Hold clutch bell with universal clutch holder tool.",
                  "Remove central 14mm nut and slide bell straight off the splined shaft.",
                  "Inspect internal braking surface for grooves. If scored deeply, replace housing.",
                  "Clean surface with acetone or isopropyl alcohol on clean rag.",
                  "Reinstall over clutch shoes, tighten 14mm nut to 49 Nm."
            ],
            "tools": [
                  "14mm Socket",
                  "Clutch Holder Tool",
                  "Brake Cleaner / Acetone",
                  "Clean Rag"
            ]
      },
      {
            "id": "final-gearbox",
            "name": "Final Drive Reduction Gearbox & Oil",
            "category": "Transmission",
            "icon": "Settings",
            "image": "/images/parts/gearbox.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Two-stage helical gear reduction unit transfers CVT output shaft rotation to rear wheel axle.",
            "failures": "Oil starvation, gear tooth pitting, countershaft bearing wear, axle oil seal leaking.",
            "symptoms": "High-pitched whining or humming noise from rear wheel at speeds above 35 km/h, oil dripping near rear tyre.",
            "interval": "Replace final drive gear oil (120 ml SAE 10W-30 / 80W-90) every 10,000 km.",
            "cost": "₹80 (Oil) / ₹1,200 (Gearset)",
            "difficulty": "Basic DIY",
            "safety": "Inspect rear axle oil seal regularly. Leaking gear oil will contaminate the rear drum brake shoes.",
            "diySteps": [
                  "Locate the final drive drain and check bolts near the left rear wheel hub.",
                  "Place oil drain tray under drain bolt (12mm) and remove bolt.",
                  "Allow 120 ml of gear oil to drain out completely.",
                  "Refit drain bolt with copper washer (Torque: 13 Nm).",
                  "Remove upper fill bolt and inject exactly 120 ml of fresh 10W-30 engine oil or 80W-90 gear lubricant using a syringe.",
                  "Reinstall fill bolt and wipe casing clean."
            ],
            "tools": [
                  "12mm Ring Spanner",
                  "100ml Plastic Syringe",
                  "Drain Tray",
                  "120ml Gear Oil"
            ]
      },
      {
            "id": "piston-rings",
            "name": "47mm eSP Low-Friction Piston & Rings Set",
            "category": "Engine",
            "icon": "Cpu",
            "image": "/images/parts/piston-rings.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Converts combustion pressure into reciprocating motion. Features spiny sleeve and piston skirt coating.",
            "failures": "Carbon accumulation in ring grooves, stuck oil scraper ring, wrist pin wear, blow-by.",
            "symptoms": "Blue/white exhaust smoke, excessive engine oil consumption, severe power loss, low compression.",
            "interval": "Inspect during top-end overhaul (typ. 40,000 - 50,000 km).",
            "cost": "₹650 - ₹950",
            "difficulty": "Advanced DIY",
            "safety": "Stagger piston ring gaps 120 degrees apart. Never align ring gaps with the piston pin axis.",
            "diySteps": [
                  "Remove cooling shroud, intake manifold, exhaust pipe, and cylinder head.",
                  "Slide cylinder block forward off the crankcase studs.",
                  "Remove wrist pin circlip using needle-nose pliers, press out wrist pin, and remove piston.",
                  "Clean carbon from piston crown using brass scraper.",
                  "Fit new rings (Top 1st ring, 2nd ring with 'T' mark upward, 3-piece oil ring).",
                  "Lubricate piston skirt with fresh engine oil, compress rings, and slide carefully into cylinder bore."
            ],
            "tools": [
                  "Feeler Gauge",
                  "Piston Ring Compressor",
                  "Circlip Pliers",
                  "Torque Wrench"
            ]
      },
      {
            "id": "cylinder-block",
            "name": "Cylinder Block with Spiny Cast-Iron Sleeve",
            "category": "Engine",
            "icon": "Shield",
            "image": "/images/parts/cylinder-block.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Houses the 47.0mm piston bore with spiny outer sleeve for superior heat dissipation into cooling air.",
            "failures": "Cylinder wall scoring, bore ovality, gasket mating surface warping.",
            "symptoms": "Piston slap rattling noise under cold idle, rapid loss of engine oil, compression below 9.0 bar.",
            "interval": "Inspect every 40,000 km or upon top-end rebuild.",
            "cost": "₹1,400 - ₹2,100",
            "difficulty": "Advanced DIY",
            "safety": "Always fit a brand new OEM metal cylinder base and head gasket. Do not reuse old crushed gaskets.",
            "diySteps": [
                  "Strip body panels and drop engine cooling shroud.",
                  "Unbolt cylinder head bolts in diagonal sequence.",
                  "Pull off cylinder head and slide cylinder block off crankcase dowel pins.",
                  "Inspect inner bore with bore dial gauge for scratch lines or step ridges at top dead center.",
                  "Clean crankcase mating face, install new base gasket, slide block over newly ringed piston.",
                  "Torque cylinder head studs evenly in 2 stages up to 22 Nm."
            ],
            "tools": [
                  "Bore Dial Indicator",
                  "10mm & 12mm Deep Sockets",
                  "Torque Wrench",
                  "Gasket Scraper"
            ]
      },
      {
            "id": "valves-tappets",
            "name": "Intake & Exhaust Valves (Tappet Clearances)",
            "category": "Engine",
            "icon": "Settings",
            "image": "/images/parts/valves-tappets.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Poppet valves seal combustion chamber. Rocker arm tappet gaps accommodate thermal expansion.",
            "failures": "Tappet gap tightening (recessed valve seats), carbon encrustation on valve face, burnt exhaust valve.",
            "symptoms": "Hard cold start, engine stalling when coming to idle stop, loud tapping clatter from cylinder head.",
            "interval": "Inspect and adjust tappet clearances every 8,000 km (Inlet: 0.10 mm, Exhaust: 0.15 mm).",
            "cost": "₹350 - ₹550 (Valves set)",
            "difficulty": "Moderate DIY",
            "safety": "Engine MUST be completely cold (under 35°C) before setting tappet clearances, or values will be inaccurate.",
            "diySteps": [
                  "Remove luggage trunk and cylinder head valve cover (4x 8mm bolts).",
                  "Rotate cooling fan by hand until the 'T' mark on the flywheel aligns with the crankcase index arrow (TDC on compression).",
                  "Confirm both rocker arms have slight wiggle room.",
                  "Slide a 0.10mm feeler gauge between the intake valve stem and adjusting screw.",
                  "Loosen 9mm locknut, turn squared adjuster screw with tappet tool until gauge drags lightly.",
                  "Tighten 9mm locknut while holding screw stationary.",
                  "Repeat for exhaust valve using 0.15mm gauge, reinstall cover with fresh rubber O-ring gasket."
            ],
            "tools": [
                  "9mm Tappet Spanner",
                  "Feeler Gauge (0.10mm & 0.15mm)",
                  "8mm Socket",
                  "Tappet Adjusting Key"
            ]
      },
      {
            "id": "camshaft-timing",
            "name": "Camshaft & Silent Timing Chain Assembly",
            "category": "Engine",
            "icon": "Settings",
            "image": "/images/parts/camshaft-timing.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Drives overhead valves via low-friction roller bearings, synchronised to crank rotation via timing chain.",
            "failures": "Cam lobe wear, stretched timing chain links, automatic hydraulic tensioner failure.",
            "symptoms": "Loud continuous clattering noise from right side of cylinder, retarded valve timing, poor throttle response.",
            "interval": "Inspect timing chain tensioner every 12,000 km; replace chain at ~35,000 km.",
            "cost": "₹380 (Chain) / ₹650 (Camshaft)",
            "difficulty": "Advanced DIY",
            "safety": "Ensure cam sprocket timing marks ('O' mark) align exactly flush with cylinder head deck at TDC.",
            "diySteps": [
                  "Remove cylinder head cover and timing inspection plug.",
                  "Align flywheel 'T' mark to TDC compression stroke.",
                  "Verify the 2 lines on the cam sprocket align horizontal with the cylinder head surface.",
                  "Remove cam chain tensioner on rear of cylinder to release chain slack.",
                  "Unbolt cam sprocket (2x 8mm bolts) and inspect cam lobes for wear grooves.",
                  "Fit new timing chain, align timing marks meticulously, re-arm and release automatic tensioner."
            ],
            "tools": [
                  "8mm & 10mm Sockets",
                  "Small Flathead Screwdriver",
                  "Flywheel Holder",
                  "Torque Wrench"
            ]
      },
      {
            "id": "cooling-fan",
            "name": "Forced Air Cooling Fan & Shroud",
            "category": "Engine",
            "icon": "Wind",
            "image": "/images/parts/air-filter.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Polypropylene radial fan bolted to magneto flywheel forces ambient air through shrouds over cylinder fins.",
            "failures": "Broken fan blades due to road stones, cracked plastic shroud ducting, loose mounting bolts.",
            "symptoms": "Engine running excessively hot, thermal cut-off, rattling buzz at high RPM from right engine side.",
            "interval": "Inspect fan blades every 8,000 km for debris or cracks.",
            "cost": "₹180 - ₹280",
            "difficulty": "Basic DIY",
            "safety": "Never run the engine with the plastic fan shroud removed, as airflow will bypass the cylinder block and seize it.",
            "diySteps": [
                  "Remove right lower side body panel.",
                  "Remove 4x 8mm bolts securing the plastic fan cover/shroud.",
                  "Inspect the white plastic fan blades bolted to the flywheel.",
                  "Check for cracked or chipped blades and remove any trapped leaves or gravel.",
                  "If damaged, remove 3x 10mm bolts securing fan to rotor and replace with OEM fan.",
                  "Reinstall shroud ensuring air rubber seals are intact."
            ],
            "tools": [
                  "8mm & 10mm Sockets",
                  "#2 Philips Screwdriver"
            ]
      },
      {
            "id": "throttle-body",
            "name": "PGM-FI Electronic Throttle Body & Injector",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/carburetor.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Electronic butterfly valve regulates air intake; solenoid injector sprays atomized fuel at 294 kPa.",
            "failures": "Carbon varnish in idle air bypass port, clogged injector micro-filter, sticky throttle shaft.",
            "symptoms": "Unstable idle RPM, engine cutting off at red lights, flat spot during roll-on acceleration.",
            "interval": "Throttle body cleaning with spray every 10,000 km.",
            "cost": "₹350 (Service) / ₹2,400 (Throttle unit)",
            "difficulty": "Moderate DIY",
            "safety": "Do NOT force the butterfly valve open with screwdrivers; avoid spraying harsh carb cleaner into the TPS sensor.",
            "diySteps": [
                  "Remove under-seat luggage box to view the top of the intake manifold.",
                  "Disconnect electrical coupler for the fuel injector and throttle position sensor (TPS).",
                  "Loosen air cleaner intake boot clamp and intake manifold 10mm bolts.",
                  "Remove throttle body assembly and spray electronic throttle-body cleaner through the throat.",
                  "Wipe out black carbon ring behind butterfly with soft cotton swab.",
                  "Reinstall with fresh O-ring gasket and perform ECU idle throttle reset procedure."
            ],
            "tools": [
                  "10mm Socket",
                  "Throttle Body Cleaner Spray",
                  "Cotton Swabs",
                  "Philips Screwdriver"
            ]
      },
      {
            "id": "fuel-pump",
            "name": "In-Tank Electric Fuel Pump (BS6 PGM-FI)",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/fuel-cock.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Submerged 12V DC electric micro-pump pressurises fuel to 294 kPa (3.0 bar) to feed the injector.",
            "failures": "Pump motor burnout from riding on near-empty tank, clogged intake mesh strainer bag.",
            "symptoms": "Whining pump noise missing when ignition is turned ON, sudden engine stalling under load.",
            "interval": "Clean strainer every 15,000 km; replace pump if pressure drops below 2.5 bar.",
            "cost": "₹1,800 - ₹2,600",
            "difficulty": "Moderate DIY",
            "safety": "Zero open flames or sparks! Fuel line is under high pressure (3 bar). Wrap rag around quick-connector when disconnecting.",
            "diySteps": [
                  "Turn ignition OFF, remove rear center cowl to access fuel tank top.",
                  "Press green tabs on quick-connect high-pressure fuel hose to release line.",
                  "Disconnect the 4-pin electrical coupler.",
                  "Loosen 6x 10mm retaining ring bolts around pump flange in criss-cross order.",
                  "Lift fuel pump assembly out gently without bending the fuel level float arm.",
                  "Inspect intake filter tea-bag for sediment; replace if darkened with rust/silt.",
                  "Re-seat pump with fresh rubber seal ring, torque bolts to 10 Nm, cycle key 3 times to prime line."
            ],
            "tools": [
                  "10mm T-Spanner",
                  "Fuel Pressure Gauge",
                  "Safety Glasses",
                  "Shop Towel"
            ]
      },
      {
            "id": "fuel-tank",
            "name": "5.3L Metal Fuel Tank & Remote External Lid",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/fuel-tank.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Stores 5.3 litres of petrol. Activa 6G features an external fuel filler cap operated via handlebar switch.",
            "failures": "Water condensation rust in bottom sump, blocked tank vent hole causing vacuum lock, lid release cable slack.",
            "symptoms": "Fuel cap refusing to pop open, engine sputtering after riding 3 km then dying (relieved by opening cap).",
            "interval": "Inspect cap rubber seal annually; adjust release cable slack as needed.",
            "cost": "₹1,450 - ₹1,900",
            "difficulty": "Basic DIY",
            "safety": "Never overfill beyond the neck collar. Excess fuel will flood the charcoal canister EVAP system.",
            "diySteps": [
                  "Open fuel lid by pushing 'FUEL' switch on ignition cluster.",
                  "Inspect the rubber sealing ring beneath the cap for cracks or dry rot.",
                  "Clear the tiny atmospheric breather hole in the cap with a thin nylon wire.",
                  "If lid does not pop up smoothly, lubricate release latch with silicone spray.",
                  "Check cable tension behind rear cover if lever feels loose."
            ],
            "tools": [
                  "Silicone Lubricant Spray",
                  "Thin Nylon Wire",
                  "Philips Screwdriver"
            ]
      },
      {
            "id": "exhaust-muffler",
            "name": "Exhaust Silencer with Chrome Heat Guard",
            "category": "Fuel & Exhaust",
            "icon": "Wind",
            "image": "/images/parts/exhaust-muffler.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Channels burnt gases through internal baffle expansion chambers to silence noise and cool emissions.",
            "failures": "Header pipe gasket blowout, rust perforations on lower belly seam, loose chrome guard rattles.",
            "symptoms": "Loud popping or puttering exhaust leak at cylinder head, loud metallic buzzing rattle during acceleration.",
            "interval": "Inspect mounting bolts every 4,000 km; replace exhaust copper gasket whenever removed.",
            "cost": "₹1,650 - ₹2,400",
            "difficulty": "Basic DIY",
            "safety": "Allow exhaust to cool completely before touching! Header pipe reaches over 350°C during riding.",
            "diySteps": [
                  "Remove 2x 10mm exhaust header nuts at the cylinder head exhaust port.",
                  "Remove the 2x 14mm heavy chassis mounting bolts on the right rear swingarm.",
                  "Carefully pull muffler assembly outward away from the scooter.",
                  "Pry out the crushed copper exhaust port ring gasket.",
                  "Fit new OEM copper ring gasket into the cylinder head exhaust port.",
                  "Align muffler, hand-thread header nuts first, then fit chassis bolts.",
                  "Torque header nuts to 14 Nm and chassis bolts to 49 Nm."
            ],
            "tools": [
                  "10mm & 14mm Sockets & Ratchet",
                  "Torque Wrench",
                  "New Exhaust Copper Gasket"
            ]
      },
      {
            "id": "oxygen-sensor",
            "name": "Heated Exhaust Oxygen (O2) Sensor",
            "category": "Fuel & Exhaust",
            "icon": "Cpu",
            "image": "/images/parts/catalytic-converter.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Detects oxygen content in exhaust stream to provide closed-loop lambda feedback to PGM-FI ECU.",
            "failures": "Lead/silicone contamination, carbon coating, heating element burnout.",
            "symptoms": "PGM-FI orange MIL malfunction lamp glowing on dashboard, rich fuel consumption, hesitation.",
            "interval": "Inspect wiring every 12,000 km, replace if diagnostic trouble code (DTC 21) is logged.",
            "cost": "₹850 - ₹1,200",
            "difficulty": "Basic DIY",
            "safety": "Do NOT clean O2 sensor tip with solvents or wire brushes; chemicals permanently destroy zirconia sensing core.",
            "diySteps": [
                  "Locate the sensor threaded into the front bend of the exhaust header pipe.",
                  "Disconnect the waterproof electrical wire coupler under the lower cowl.",
                  "Use a 17mm slotted O2 sensor wrench or open-end spanner to turn counter-clockwise.",
                  "Carefully inspect tip colour (grey/tan is normal, thick black is rich mixture, white is lean).",
                  "Apply high-temp anti-seize paste to threads (keep paste off sensor tip!).",
                  "Thread in and torque to 25 Nm, reconnect wiring harness coupler."
            ],
            "tools": [
                  "17mm Open Spanner / O2 Socket",
                  "High-Temp Anti-Seize Paste"
            ]
      },
      {
            "id": "front-drum-brake",
            "name": "130mm Front Drum Brake & CBS Equalizer",
            "category": "Brakes",
            "icon": "Disc",
            "image": "/images/parts/rear-brake-drum.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Internal expanding twin brake shoes press outward against 130mm wheel hub drum for front deceleration.",
            "failures": "Worn brake shoe friction lining, glazed drum surface, squealing brake dust accumulation.",
            "symptoms": "Spongy front brake lever with deep travel, high-pitched screeching squeal on braking, weak stopping power.",
            "interval": "Inspect every 4,000 km, replace shoes when wear indicator needle reaches limit mark.",
            "cost": "₹220 - ₹320 (Shoes set)",
            "difficulty": "Basic DIY",
            "safety": "Brake dust contains abrasive silica. Wear dust mask and spray with brake cleaner, never blow with compressed air.",
            "diySteps": [
                  "Loosen the front brake cable adjuster nut and unhook cable from brake arm.",
                  "Remove 19mm front axle nut and slide front wheel axle out.",
                  "Drop front wheel down and slide out the circular brake backing plate panel.",
                  "Fold the two brake shoes inward against their return springs to remove.",
                  "Clean drum hub interior with brake cleaner spray and scuff drum lightly with 120-grit sandpaper.",
                  "Lubricate the pivot pin and brake cam lightly with high-temp grease (keep grease off shoes!).",
                  "Install new OEM brake shoes with fresh springs, refit wheel, torque axle nut to 59 Nm.",
                  "Adjust cable nut so front brake lever has 10-20mm free play."
            ],
            "tools": [
                  "19mm & 14mm Spanners",
                  "Brake Cleaner Spray",
                  "120-Grit Sandpaper",
                  "High-Temp Grease"
            ]
      },
      {
            "id": "rear-drum-brake",
            "name": "130mm Rear Drum Brake & Brake Shoes",
            "category": "Brakes",
            "icon": "Disc",
            "image": "/images/parts/rear-brake-drum.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Provides primary rear-wheel stopping force via handlebar left lever; linked through CBS equalizer.",
            "failures": "Glazed shoe surfaces, contaminated lining from leaking final drive seal, worn cam spindle.",
            "symptoms": "Left brake lever pulling all the way to the grip, poor braking distance, shuddering on deceleration.",
            "interval": "Inspect every 4,000 km; replace shoes every 12,000 - 16,000 km.",
            "cost": "₹220 - ₹320",
            "difficulty": "Moderate DIY",
            "safety": "Rear axle nut is torqued to a very tight 118 Nm. Use a solid 24mm socket and hold rear brake lever tightly.",
            "diySteps": [
                  "Loosen rear brake cable adjuster nut completely.",
                  "Remove exhaust muffler to gain clearance to rear wheel.",
                  "Have helper sit on scooter holding rear brake lever, then loosen central 24mm rear wheel axle nut.",
                  "Slide off rear wheel to expose the brake backing plate on the engine crankcase.",
                  "Remove worn brake shoes and inspect drum interior for oil leaks from final drive axle seal.",
                  "Clean with brake cleaner, fit new shoes, reinstall wheel, and torque axle nut firmly to 118 Nm.",
                  "Reinstall exhaust, adjust brake cable thumb nut to 10-20mm free play."
            ],
            "tools": [
                  "24mm Socket & Breaker Bar",
                  "14mm Socket (Exhaust)",
                  "Brake Cleaner",
                  "New Rear Brake Shoes"
            ]
      },
      {
            "id": "cbs-equalizer",
            "name": "Combi-Brake System (CBS) Equalizer Linkage",
            "category": "Brakes",
            "icon": "HelpCircle",
            "image": "/images/parts/brake-cable-rod.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Mechanical proportioning lever behind front handlebar cowl distributes left-lever pull to both front and rear brakes.",
            "failures": "Dry pivot pin binding, unequal cable stretch causing front wheel to lock prematurely, cable fraying.",
            "symptoms": "Left lever feels excessively hard, front wheel grabbing violently during light rear braking, uneven wear.",
            "interval": "Inspect and lubricate CBS equalizer pivot every 8,000 km.",
            "cost": "₹180 - ₹280",
            "difficulty": "Moderate DIY",
            "safety": "Ensure front brake free play is calibrated AFTER rear brake free play is set, in exact factory CBS sequence.",
            "diySteps": [
                  "Remove front handlebar cowl (front and rear halves, 6 screws).",
                  "Inspect the central CBS pivot rocker arm connected to the left brake lever.",
                  "Check both front and rear branch cables for smooth gliding and fraying.",
                  "Spray white lithium grease onto the equalizer pivot barrel.",
                  "Set rear brake cable free play at wheel end (15-20 mm).",
                  "Set front CBS equalizer cable adjuster until front brake just engages without dragging when rear lever is pulled 1/3 way."
            ],
            "tools": [
                  "Philips Screwdriver",
                  "10mm Open Spanner",
                  "White Lithium Grease Spray"
            ]
      },
      {
            "id": "front-telescopic-forks",
            "name": "Front Telescopic Hydraulic Suspension Forks",
            "category": "Suspension",
            "icon": "Settings",
            "image": "/images/parts/telescopic-forks.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Dual hydraulic telescopic fork stanchions (introduced on Activa 6G) provide 120mm travel over bumps.",
            "failures": "Fork oil seal weeping, bent fork inner tube from pothole impact, depleted fork oil.",
            "symptoms": "Oil dripping onto front wheel rim, front end nose-diving violently under braking, harsh clunk over bumps.",
            "interval": "Inspect fork legs every 4,000 km, replace fork oil (68 ml per leg, 10W fork oil) every 20,000 km.",
            "cost": "₹250 (Seals) / ₹1,800 (Fork assembly)",
            "difficulty": "Moderate DIY",
            "safety": "Wipe inner chrome stanchions after riding. Dried bug splatter and mud cuts rubber oil seals within 1,000 km.",
            "diySteps": [
                  "Support scooter securely under center stand with weight on rear wheel.",
                  "Remove front wheel, speedometer cable, and front fender.",
                  "Loosen upper fork clamp pinch bolts (14mm) on the triple tree stem.",
                  "Slide fork leg downward out of the triple tree clamp.",
                  "Pry dust seal up, remove internal wire retaining clip.",
                  "Drain old black fork oil into graduated cylinder.",
                  "Fit new rubber oil seal, pour in exactly 68 ml of 10W fork oil per leg, and reassemble."
            ],
            "tools": [
                  "14mm & 12mm Sockets",
                  "Seal Driver / PVC Pipe",
                  "Measuring Cylinder",
                  "10W Fork Oil"
            ]
      },
      {
            "id": "rear-shock-absorber",
            "name": "Rear 3-Step Adjustable Hydraulic Shock Absorber",
            "category": "Suspension",
            "icon": "Settings",
            "image": "/images/parts/rear-shock-absorbers.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Damps vertical vibration between unit-swing engine casing and passenger chassis frame.",
            "failures": "Hydraulic oil leakage from damper rod, bottom rubber mounting bush perishing, spring sag.",
            "symptoms": "Scooter bouncing repeatedly after hitting road dips, rear tyre bottoming out against under-seat plastic bucket.",
            "interval": "Inspect for oil misting every 4,000 km; replace if bouncy (typ. 30,000 km).",
            "cost": "₹650 - ₹950",
            "difficulty": "Basic DIY",
            "safety": "Always support engine block with wooden block before removing the lower shock bolt.",
            "diySteps": [
                  "Park scooter on level center stand and place wooden wedge under rear tyre.",
                  "Remove left side body panel to access upper shock mount bolt (14mm).",
                  "Remove upper mounting bolt and washer.",
                  "Remove lower 12mm mounting bolt at the engine crankcase bracket.",
                  "Slide out old shock absorber assembly.",
                  "Install new OEM unit, thread lower bolt first, then upper bolt.",
                  "Torque upper bolt to 44 Nm and lower bolt to 29 Nm.",
                  "Use pin spanner to adjust lower spring preload cam (Position 1: Soft, Position 2: Standard, Position 3: Heavy load)."
            ],
            "tools": [
                  "14mm & 12mm Ring Spanners",
                  "Preload Pin Spanner",
                  "Wooden Support Block"
            ]
      },
      {
            "id": "steering-bearings",
            "name": "Steering Head Cone Set & Steel Ball Races",
            "category": "Suspension",
            "icon": "CircleDot",
            "image": "/images/parts/steering-bearings.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Allows smooth handlebar steering rotation while supporting front-end braking and impact loads.",
            "failures": "Ball denting ('notching' at straight-ahead position), grease dry-out, excessive play/wobble.",
            "symptoms": "Handlebar feels locked in center or 'notchy' when turning, front-end metallic clunk when braking.",
            "interval": "Inspect steering free play every 4,000 km; repack with lithium grease every 12,000 km.",
            "cost": "₹280 - ₹420 (Race set)",
            "difficulty": "Advanced DIY",
            "safety": "Never overtighten the steering stem castle nut. Overtightening dents the race and creates dangerous steering stiffness.",
            "diySteps": [
                  "Remove front handlebar cowl and headlight assembly.",
                  "Remove front wheel and front fork legs.",
                  "Loosen upper handlebar clamp bolt (14mm) and lift handlebar off steering stem.",
                  "Unscrew upper steering stem locknut and top cone race.",
                  "Catch loose steel ball bearings (upper and lower sets) in clean tray.",
                  "Tap out old outer steel bearing races from chassis headstock using brass drift.",
                  "Press in new hardened races, pack with high-pressure wheel bearing grease, assemble balls.",
                  "Adjust locknut until handlebar swings freely from lock-to-lock without any front-to-back play."
            ],
            "tools": [
                  "Hook Spanner / C-Spanner",
                  "Brass Drift & Hammer",
                  "High-Pressure Lithium Grease",
                  "Tray"
            ]
      },
      {
            "id": "front-wheel",
            "name": "12-Inch Front Wheel Rim & 90/90-12 Tubeless Tyre",
            "category": "Wheels",
            "icon": "CircleDot",
            "image": "/images/parts/front-tyre.JPG",
            "imageCredit": "Wikimedia Commons",
            "function": "12-inch diameter front wheel (larger than older Activas) delivers superior stability over potholes.",
            "failures": "Tread balding below 1.5mm TWI indicator, puncture, rim bend from hard curb impact.",
            "symptoms": "Front handle wobbling at 40-50 km/h, skidding easily on wet monsoon roads, constant air pressure loss.",
            "interval": "Check cold tyre pressure weekly (22 psi); replace tyre every 25,000 - 30,000 km.",
            "cost": "₹1,200 - ₹1,650 (Tyre)",
            "difficulty": "Basic DIY",
            "safety": "Always maintain 22 psi front pressure. Under-inflation causes heavy steering and rapid shoulder tread cupping.",
            "diySteps": [
                  "Check tyre surface for tread wear indicators (TWI bumps in grooves).",
                  "Inspect rim lip for dents or bead leaks using soapy water spray.",
                  "To remove wheel: loosen front brake cable and speedometer cable screw.",
                  "Remove 19mm front axle nut, pull axle out while supporting wheel.",
                  "Roll wheel out, inspect bearings by spinning inner race with finger.",
                  "Reinstall wheel, ensure speedometer drive notch engages cleanly, torque axle nut to 59 Nm."
            ],
            "tools": [
                  "19mm & 14mm Spanners",
                  "Tyre Pressure Gauge",
                  "Foot Pump / Inflator"
            ]
      },
      {
            "id": "rear-wheel",
            "name": "10-Inch Rear Wheel Rim & 90/100-10 Tubeless Tyre",
            "category": "Wheels",
            "icon": "CircleDot",
            "image": "/images/parts/rear-tyre.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Supports 65% of vehicle and pillion weight while transmitting engine torque to tarmac.",
            "failures": "Center tread flattening from commuter riding, rim bead corrosion, tubeless valve stem rot.",
            "symptoms": "Rear tyre fish-tailing in corners, harsh bumpy ride, frequent punctures.",
            "interval": "Check cold pressure weekly (29 psi solo, 36 psi pillion); replace tyre at 20,000 - 25,000 km.",
            "cost": "₹1,150 - ₹1,550",
            "difficulty": "Moderate DIY",
            "safety": "Never ride with less than 29 psi. Low rear tyre pressure causes rim bending and overheating tyre blowout.",
            "diySteps": [
                  "Remove exhaust muffler to expose rear wheel hub.",
                  "Hold rear brake lever firmly, loosen central 24mm rear axle locknut.",
                  "Slide wheel off the splined output axle shaft.",
                  "Inspect tyre tread depth (replace if below 1.5mm).",
                  "Inspect splines on wheel hub; grease lightly with anti-seize before reinstalling.",
                  "Mount wheel, install heavy washer, torque 24mm axle nut firmly to 118 Nm.",
                  "Refit exhaust with new gasket."
            ],
            "tools": [
                  "24mm Socket & Breaker Bar",
                  "14mm Socket",
                  "Tyre Pressure Gauge"
            ]
      },
      {
            "id": "acg-starter",
            "name": "ACG Electronic Silent Starter & Generator",
            "category": "Electrical",
            "icon": "BatteryCharging",
            "image": "/images/parts/stator-magneto.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Brushless ACG motor directly cranks crankshaft without any noisy starter motor gears (Silent Start).",
            "failures": "Stator coil winding open circuit, crank position sensor (CKP) failure, magnetic rotor delamination.",
            "symptoms": "Scooter refusing to crank silently, engine dying when heated, battery not charging above 12.8V.",
            "interval": "Inspect stator output voltage (over 13.5V at 3000 RPM) every 12,000 km.",
            "cost": "₹1,800 - ₹2,700",
            "difficulty": "Advanced DIY",
            "safety": "The ACG starter utilizes high-current electronic commutation managed directly by the ECU. Disconnect battery first.",
            "diySteps": [
                  "Remove right side cooling fan cover and cooling fan.",
                  "Use special flywheel rotor puller tool to unseat the magnetic flywheel from crankshaft taper.",
                  "Inspect stator stator poles and copper lacquer insulation for heat charring.",
                  "Check crank angle pulse sensor gap (0.7 mm).",
                  "Test coil resistance across pins with digital multimeter (0.4 - 0.8 ohms).",
                  "Re-torque flywheel center nut to 54 Nm using flywheel holder."
            ],
            "tools": [
                  "Flywheel Puller Tool",
                  "Flywheel Holder",
                  "Digital Multimeter",
                  "17mm Socket"
            ]
      },
      {
            "id": "ecu-module",
            "name": "PGM-FI Electronic Control Unit (ECU / ECM)",
            "category": "Electrical",
            "icon": "Cpu",
            "image": "/images/parts/cdi-unit.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Calculates injection timing and spark advance 100 times per second using TPS, MAP, O2, and EOT data.",
            "failures": "Water ingress through damaged harness seals, diagnostic sensor fault lockouts, voltage surge damage.",
            "symptoms": "Check Engine Light (MIL) blinking specific fault codes (e.g. 7 blinks = EOT sensor), no spark, no fuel pump prime.",
            "interval": "Diagnostic self-test via DLC connector if MIL flashes.",
            "cost": "₹2,800 - ₹3,600",
            "difficulty": "Moderate DIY",
            "safety": "Never disconnect ECU wiring harness couplers while the ignition key is switched ON.",
            "diySteps": [
                  "Locate the ECM unit mounted inside the front nose shield apron.",
                  "Inspect the 33-pin waterproof multi-coupler for green copper corrosion or moisture.",
                  "Disconnect battery negative (-) before unplugging ECU.",
                  "Use DLC shorting tool (SCS connector) under seat to read stored diagnostic error codes.",
                  "Perform ECU throttle calibration reset after any throttle body servicing."
            ],
            "tools": [
                  "DLC Diagnostic Link Connector Jumper",
                  "Digital Multimeter",
                  "#2 Philips Screwdriver"
            ]
      },
      {
            "id": "led-headlight",
            "name": "Signature Full-LED Headlamp Assembly",
            "category": "Electrical",
            "icon": "Zap",
            "image": "/images/parts/headlight-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Low-power high-output LED array with precision reflector provides clear white night illumination.",
            "failures": "Internal LED driver diode failure, polycarbonate lens fogging/yellowing, adjustment screw stripping.",
            "symptoms": "Complete headlamp failure, low beam dead while high beam works, flickering light at idle.",
            "interval": "Inspect vertical beam aim annually (adjust via bottom screw).",
            "cost": "₹1,400 - ₹1,950",
            "difficulty": "Basic DIY",
            "safety": "LED headlamps run on dedicated regulated DC power. Do not tap aftermarket high-wattage horns directly into headlamp line.",
            "diySteps": [
                  "Remove 4 rear handlebar cowl screws and 2 lower front screws.",
                  "Gently unhook plastic tabs to separate front handlebar cowl.",
                  "Unplug the 3-pin waterproof headlamp connector.",
                  "Remove 3x Philips screws holding the LED light unit to the plastic cowl.",
                  "Install replacement genuine Honda LED headlamp unit.",
                  "Reassemble cowl and use vertical aiming screw beneath chin to set cutoff line 5 meters away."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "Aiming Target / Wall"
            ]
      },
      {
            "id": "multi-switchgear",
            "name": "Integrated 5-in-1 Multi-Function Key Switch",
            "category": "Electrical",
            "icon": "Activity",
            "image": "/images/parts/switchgear-throttle.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Central magnetic shutter lock combines ignition, steering lock, seat open, and external fuel cap open switches.",
            "failures": "Internal tumbler wear, broken remote fuel/seat release bowden cables, sticky magnetic shutter.",
            "symptoms": "Key difficult to rotate into ignition position, 'SEAT' or 'FUEL' toggle buttons failing to trigger release.",
            "interval": "Lubricate lock cylinder with graphite powder (never oil or grease) annually.",
            "cost": "₹750 - ₹1,100",
            "difficulty": "Moderate DIY",
            "safety": "Never spray WD-40 or heavy grease into ignition keyhole as dust sticks and permanently jams tumblers.",
            "diySteps": [
                  "Remove front apron and inner leg shield panel.",
                  "Inspect the dual bowden cable splitter attached to the back of the switchgear.",
                  "Puff dry lock-graphite powder into keyhole and cycle key 10 times.",
                  "Check remote cable tension and adjust cable inline barrel adjusters if fuel/seat release is stiff.",
                  "Ensure magnetic shutter key aligns with exterior key fob."
            ],
            "tools": [
                  "Dry Graphite Lubricant Powder",
                  "Philips Screwdriver",
                  "10mm Spanner"
            ]
      },
      {
            "id": "wiring-harness",
            "name": "Main Chassis Wiring Loom & Blade Fuse Box",
            "category": "Electrical",
            "icon": "Activity",
            "image": "/images/parts/wiring-harness.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Routes DC electrical current, sensor signals, and chassis earth grounds across the scooter.",
            "failures": "Rodent wire chew under floorboard, blown 10A/15A mini blade fuses, corroded main earth ground bolt.",
            "symptoms": "Complete electrical blackout, specific circuit dead (e.g. horn dead while lights work), blown fuse replacing.",
            "interval": "Inspect fuse box under front apron every 6 months.",
            "cost": "₹30 (Fuse) / ₹1,800 (Harness)",
            "difficulty": "Basic DIY",
            "safety": "Never replace a blown fuse with a wire jumper or higher amp fuse! Always diagnose why the fuse tripped.",
            "diySteps": [
                  "Remove front service panel to access fuse block adjacent to battery.",
                  "Open transparent fuse box lid to view blade fuses (Main: 15A, Sub/FI: 10A, Lights: 10A).",
                  "Pull suspect fuse with plastic fuse puller clip.",
                  "Hold to light: if the inner U-shaped bridge is melted, replace with identical rating fuse.",
                  "Inspect chassis earth terminal (green wire) bolted to rear frame for rust; clean with sandpaper."
            ],
            "tools": [
                  "Fuse Puller Tool",
                  "Spare 10A & 15A Mini Blade Fuses",
                  "Sandpaper"
            ]
      },
      {
            "id": "chassis-frame",
            "name": "Underbone Tubular Steel Chassis Frame",
            "category": "Chassis",
            "icon": "Shield",
            "image": "/images/parts/main-chassis.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Welded high-rigidity steel tubular backbone supports rider floorboard, engine swing unit, and fuel tank.",
            "failures": "Floorboard undercarriage rust from monsoon water accumulation, misaligned steering head from collision.",
            "symptoms": "Scooter pulling to one side when riding hands-free, cracked metal creak over rough road bumps.",
            "interval": "Inspect underbody floorboard frame tubes annually for rust; treat with anti-corrosion spray.",
            "cost": "₹4,500 - ₹6,500",
            "difficulty": "Advanced DIY",
            "safety": "Never weld damaged structural chassis tubes without certified frame alignment jig verification.",
            "diySteps": [
                  "Lift rubber foot mat on floorboard, remove 4x bolts and lift plastic floorboard.",
                  "Inspect main center backbone tube and engine mounting cross-member for rust scale or cracked welds.",
                  "Wire-brush any surface surface rust, wipe clean with paint thinner.",
                  "Apply zinc-phosphate rust primer followed by rubberised underbody chassis coating spray.",
                  "Reinstall floorboard and rubber floor mat."
            ],
            "tools": [
                  "Wire Brush",
                  "Zinc Primer Spray",
                  "Anti-Corrosion Chassis Paint",
                  "10mm T-Spanner"
            ]
      },
      {
            "id": "center-side-stand",
            "name": "Dual-Spring Center Stand & Side Stand with Cut-Off",
            "category": "Chassis",
            "icon": "Shield",
            "image": "/images/parts/stands-footpegs.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Supports parked vehicle. Side stand includes microswitch engine cut-off sensor for rider safety.",
            "failures": "Bent stand pivot tube, weakened dual return springs, side stand cut-off switch stuck with road grime.",
            "symptoms": "Scooter refusing to start with side stand retracted, stand dragging and scraping during left turns.",
            "interval": "Lubricate stand pivot bolts with heavy chassis grease every 4,000 km.",
            "cost": "₹180 (Switch) / ₹380 (Stand)",
            "difficulty": "Basic DIY",
            "safety": "Wear safety glasses when stretching strong stand return springs into position using a spring puller tool.",
            "diySteps": [
                  "Inspect side stand cut-off switch mounted on the inner pivot bolt.",
                  "Spray electrical contact cleaner into switch plunger to remove road grit if engine won't crank.",
                  "Inspect heavy dual return springs on center stand for tension loss.",
                  "Clean pivot pin with degreaser and grease with heavy waterproof chassis grease.",
                  "Verify stand flips up instantly with crisp snap when released."
            ],
            "tools": [
                  "Brake Cleaner / Contact Cleaner",
                  "Chassis Grease",
                  "Spring Puller Tool",
                  "14mm Spanner"
            ]
      }
],
    symptomMap: {
      "slow-starting": {
        cause: "Viscous air filter clogged or Spark Plug fouled.",
        diy: "Basic DIY",
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
        diy: "Basic DIY",
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
            "id": "spark-plug",
            "name": "Twin Spark Plugs (DTS-i System)",
            "category": "Engine",
            "icon": "Zap",
            "image": "/images/parts/spark-plug.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Dual spark plugs (Left: Champion RG4HC, Right: PRG6HCC) fire simultaneously to achieve rapid complete flame combustion.",
            "failures": "Unequal electrode erosion between plugs, carbon fouling on rich idling, wide gap causing misfire.",
            "symptoms": "Engine knocking/pinging under acceleration, noticeable vibration at 4,000 - 6,000 RPM, cold start lag.",
            "interval": "Inspect & clean every 5,000 km, replace BOTH plugs simultaneously every 10,000 km.",
            "cost": "₹280 - ₹360 (Pair)",
            "difficulty": "Basic DIY",
            "safety": "Always replace both spark plugs together. Never run plugs with mismatched heat ranges or electrode gaps.",
            "diySteps": [
                  "Locate Spark Plug 1 on left cylinder head and Spark Plug 2 on right cylinder head.",
                  "Pull off both thick rubber HT lead spark plug caps by hand.",
                  "Use 16mm spark plug box spanner to unscrew both plugs counter-clockwise.",
                  "Inspect electrode colour: both should show light tan/grey deposits equally.",
                  "Clean with brass wire brush and check electrode gap (0.7 - 0.8 mm) using feeler gauge.",
                  "Thread both plugs clockwise by hand first, then torque to 14 Nm (1/8th turn past hand-tight).",
                  "Reconnect both plug caps firmly until positive snap is felt."
            ],
            "tools": [
                  "16mm Spark Plug Spanner",
                  "0.75mm Feeler Gauge",
                  "Brass Wire Brush"
            ]
      },
      {
            "id": "engine-oil",
            "name": "Engine Oil 20W-50 (JASO MA2)",
            "category": "Engine",
            "icon": "Droplet",
            "image": "/images/parts/engine-oil.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Lubricates high-revving 150cc engine components, wet multi-plate clutch pack, and 5-speed gearbox.",
            "failures": "Shear degradation of high-viscosity oil, clutch slippage from wrong additive oil, metallic particulate accumulation.",
            "symptoms": "Stiff gear shifts, false neutrals, clutch slipping under acceleration, loud valvetrain clatter when hot.",
            "interval": "Inspect level weekly; replace oil and filter every 5,000 km (Capacity: 1.15 L).",
            "cost": "₹450 - ₹580",
            "difficulty": "Basic DIY",
            "safety": "Always use JASO MA2 motorcycle oil for wet clutches. Never use passenger car engine oils containing friction modifiers.",
            "diySteps": [
                  "Warm motorcycle for 3 minutes, switch OFF, and balance on level center stand.",
                  "Position oil drain pan under crankcase drain bolt.",
                  "Remove the 18mm bottom crankcase drain bolt and allow 1.15 litres of hot oil to drain.",
                  "Clean magnetic drain plug tip (remove metal shaving fur).",
                  "Replace drain bolt crush washer and torque to 27 Nm.",
                  "Pour in exactly 1,150 ml of fresh 20W-50 JASO MA2 oil through right clutch cover filler port.",
                  "Check sight glass window: oil level should sit midway between lower and upper embossed lines."
            ],
            "tools": [
                  "18mm Ring Spanner",
                  "Oil Drain Pan",
                  "Clean Funnel",
                  "Shop Towel"
            ]
      },
      {
            "id": "oil-filter",
            "name": "Paper Cartridge Engine Oil Filter",
            "category": "Engine",
            "icon": "Droplet",
            "image": "/images/parts/engine-oil.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Pleated paper filter element traps sub-micron metallic wear particles from circulating through crankshaft journals.",
            "failures": "Filter clogging causing bypass valve opening, collapsed pleats, degraded rubber O-ring seal.",
            "symptoms": "Dirty black oil immediately after oil change, reduced oil pressure to cylinder head camshaft.",
            "interval": "Replace at every engine oil change (every 5,000 km).",
            "cost": "₹65 - ₹95",
            "difficulty": "Basic DIY",
            "safety": "Ensure the small inner rubber grommet and spring are placed correctly behind the filter element before closing cover.",
            "diySteps": [
                  "With engine oil drained, locate the circular oil filter chamber on the right clutch crankcase cover.",
                  "Remove the 3x 8mm flange bolts holding the oil filter cover.",
                  "Remove cover and pull out old cylindrical paper filter element.",
                  "Inspect inner cavity and clean any sludge residue with lint-free rag.",
                  "Ensure small backing spring is inside housing.",
                  "Coat rubber grommet of new filter with fresh oil, slide filter in with open rubber grommet facing inward.",
                  "Install new rubber O-ring on cover, refit cover, and torque the 3 bolts evenly to 10 Nm."
            ],
            "tools": [
                  "8mm T-Spanner / Socket",
                  "New Oil Filter Element",
                  "New Cover O-Ring",
                  "Clean Cloth"
            ]
      },
      {
            "id": "piston-rings",
            "name": "57mm Piston & Molybdenum-Coated Ring Set",
            "category": "Engine",
            "icon": "Cpu",
            "image": "/images/parts/piston-rings.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "149.5cc lightweight aluminium alloy piston with low-friction molybdenum skirt coating transfers combustion power.",
            "failures": "Scuffed piston skirts from low oil, stuck compression rings, oil scraper ring clogging, wrist pin wear.",
            "symptoms": "Heavy white/blue exhaust smoke, drastic compression drop below 8.5 bar, piston slap knock at idle.",
            "interval": "Inspect during top-end overhaul (typ. 45,000 - 55,000 km).",
            "cost": "₹850 - ₹1,250",
            "difficulty": "Advanced DIY",
            "safety": "Stagger top ring, second ring, and oil ring gaps 120 degrees apart. Lubricate thoroughly with 20W-50 oil before assembly.",
            "diySteps": [
                  "Remove fuel tank, carburetor, exhaust pipe, and cylinder head.",
                  "Slide cylinder block upward off the 4 long crankcase cylinder studs.",
                  "Remove piston pin circlip using circlip pliers, press out wrist pin, and remove piston.",
                  "Clean carbon buildup on piston crown with soft brass scraper.",
                  "Install new ring pack: oil expander + side rails, 2nd ring ('TOP2' marking upward), top chrome ring ('TOP1' upward).",
                  "Stagger ring gaps, oil piston, compress rings gently, and slide cylinder barrel downward over piston."
            ],
            "tools": [
                  "Piston Ring Compressor",
                  "Circlip Pliers",
                  "Feeler Gauge",
                  "Torque Wrench"
            ]
      },
      {
            "id": "cylinder-block",
            "name": "Aluminium Cylinder Block with Cast-Iron Liner",
            "category": "Engine",
            "icon": "Shield",
            "image": "/images/parts/cylinder-block.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Aluminium cooling finned block with cast-iron 57.0mm internal bore guides reciprocating piston travel.",
            "failures": "Bore scoring from grit ingestion, top ridge wear, cylinder base gasket weeping oil.",
            "symptoms": "Low engine compression, blow-by gases puffing from crankcase breather tube, chronic oil loss.",
            "interval": "Inspect during top-end servicing; bore tolerance limit: 57.08 mm.",
            "cost": "₹1,850 - ₹2,600",
            "difficulty": "Advanced DIY",
            "safety": "Always scrape old gasket residue completely clean without gouging the aluminium deck surfaces.",
            "diySteps": [
                  "Strip top-end engine assemblies.",
                  "Slide cylinder block off studs, inspect bore cross-hatch hone marks with flashlight.",
                  "Check bore taper and out-of-round with cylinder bore gauge at 3 depths.",
                  "Fit new dowel pins and genuine base gasket on crankcase.",
                  "Carefully compress piston rings and lower cylinder block into place.",
                  "Torque 4 cylinder head nuts diagonally in progressive stages to 32 Nm."
            ],
            "tools": [
                  "Cylinder Bore Gauge",
                  "12mm Deep Socket",
                  "Torque Wrench",
                  "Gasket Scraper"
            ]
      },
      {
            "id": "valves-tappets",
            "name": "2-Valve Cylinder Head & Rocker Tappet Clearances",
            "category": "Engine",
            "icon": "Settings",
            "image": "/images/parts/valves-tappets.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Controls intake charge and exhaust evacuation. Tappet adjusting screws maintain valve clearance.",
            "failures": "Tight tappets causing burnt valves and hard starting; loose tappets causing metallic ticking clatter.",
            "symptoms": "Loud ticking clatter from cylinder head at idle, difficulty starting when cold, loss of top-end power.",
            "interval": "Inspect and adjust every 5,000 km (Intake: 0.05 mm, Exhaust: 0.10 mm when cold).",
            "cost": "₹450 - ₹700 (Valve set)",
            "difficulty": "Moderate DIY",
            "safety": "Engine MUST be cold (under 35°C). Always align 'T' mark on magneto rotor to TDC compression stroke before checking.",
            "diySteps": [
                  "Remove fuel tank and two circular chrome tappet inspection covers (or top valve cover).",
                  "Remove left magneto inspection plug and rotate crank counter-clockwise until 'T' mark aligns with case notch.",
                  "Verify both rocker arms have slight free wiggle (TDC compression).",
                  "Slide 0.05mm feeler gauge between intake valve stem and adjuster screw; it should slide with slight drag.",
                  "Slide 0.10mm feeler gauge between exhaust valve stem and adjuster screw.",
                  "If out of spec, loosen 9mm locknut, adjust center screw with tappet tool, hold and re-tighten nut to 12 Nm.",
                  "Reinstall tappet covers with fresh O-rings."
            ],
            "tools": [
                  "9mm Tappet Spanner",
                  "Feeler Gauge (0.05mm & 0.10mm)",
                  "Tappet Adjuster Key",
                  "17mm Socket"
            ]
      },
      {
            "id": "camshaft-timing",
            "name": "Camshaft, Silent Cam Chain & Auto Tensioner",
            "category": "Engine",
            "icon": "Settings",
            "image": "/images/parts/camshaft-timing.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Transfers crank rotation to overhead camshaft at 1:2 ratio; auto ratchet tensioner removes timing chain slack.",
            "failures": "Timing chain elongation, worn nylon chain guide damping strips, jammed ratchet tensioner spring.",
            "symptoms": "Loud rhythmic rattling noise from left side of cylinder block, sluggish high-RPM acceleration.",
            "interval": "Inspect tensioner extension every 10,000 km; replace timing chain every 30,000 - 35,000 km.",
            "cost": "₹420 (Chain) / ₹350 (Tensioner)",
            "difficulty": "Advanced DIY",
            "safety": "Never release the timing chain tensioner until the cam sprocket timing marks are verified 100% aligned.",
            "diySteps": [
                  "Rotate engine to TDC compression stroke ('T' mark aligned on rotor).",
                  "Remove cam chain tensioner on rear of cylinder block (2x 8mm bolts).",
                  "Inspect tensioner teeth: if fully extended to the last tooth, chain is worn out.",
                  "Inspect cam sprocket alignment marks (horizontal lines flush with head surface).",
                  "Replace worn timing chain and nylon guide dampers.",
                  "Reset auto-tensioner using small flathead screwdriver, bolt onto cylinder, and release internal spring."
            ],
            "tools": [
                  "8mm T-Spanner",
                  "Flathead Screwdriver",
                  "Magneto Puller",
                  "Torque Wrench"
            ]
      },
      {
            "id": "crankshaft",
            "name": "Heavy-Flywheel Crankshaft & Connecting Rod",
            "category": "Engine",
            "icon": "Settings",
            "image": "/images/parts/crankshaft.JPG",
            "imageCredit": "Wikimedia Commons",
            "function": "Forged steel crankshaft with heavy inertial flywheels converts piston combustion thrust into rotating torque.",
            "failures": "Big-end needle roller bearing play, crankpin ovality, sheared magneto woodruff key.",
            "symptoms": "Deep heavy mechanical knocking noise from crankcase that increases with engine RPM under load.",
            "interval": "Inspect big-end radial play during major engine overhaul (typ. 60,000+ km).",
            "cost": "₹2,600 - ₹3,600",
            "difficulty": "Advanced DIY",
            "safety": "Radial play in the connecting rod big-end bearing must be ZERO (service limit: 0.05 mm).",
            "diySteps": [
                  "Full engine crankcase split required.",
                  "Remove both crankcase halves, lift crankshaft assembly out.",
                  "Check connecting rod: side-to-side clearance is normal (0.1 - 0.4 mm), but vertical up-down play must be zero.",
                  "Inspect main ball bearing journals on both sides.",
                  "Replace big-end pin and needle roller bearing cage using 20-ton hydraulic press, true crank on lathe V-blocks."
            ],
            "tools": [
                  "Crankcase Splitter Tool",
                  "Hydraulic Press",
                  "Dial Indicator & V-Blocks",
                  "Feeler Gauge"
            ]
      },
      {
            "id": "clutch-assembly",
            "name": "Wet Multi-Plate 5-Plate Clutch Basket",
            "category": "Transmission",
            "icon": "Disc",
            "image": "/images/parts/clutch-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "5 friction plates interleaved with 4 steel plates in oil bath engage engine power smoothly to 5-speed gearbox.",
            "failures": "Burnt/glazed friction plate cork linings, notched clutch basket fingers, weak clutch pressure springs.",
            "symptoms": "Clutch slipping in 3rd/4th gear (engine revs shoot up without bike accelerating), hard gear shifts, clutch drag.",
            "interval": "Inspect free play every 1,000 km; replace friction plates every 20,000 - 25,000 km.",
            "cost": "₹550 - ₹850 (Plates set)",
            "difficulty": "Moderate DIY",
            "safety": "Soak new friction plates in fresh 20W-50 engine oil for at least 30 minutes before installation.",
            "diySteps": [
                  "Drain engine oil and remove right clutch crankcase cover (8mm bolts).",
                  "Remove 4x clutch spring retainer bolts (10mm) in criss-cross pattern.",
                  "Remove pressure plate, 4 coil springs, and pull out friction and steel plates.",
                  "Inspect clutch basket aluminium fingers for notched grooves where plates catch.",
                  "Soak new friction plates in fresh 20W-50 oil.",
                  "Assemble alternating: Friction plate, Steel plate, Friction, Steel... into clutch hub.",
                  "Reinstall pressure plate, torque the 4 spring bolts evenly to 10 Nm."
            ],
            "tools": [
                  "8mm & 10mm T-Spanners",
                  "Clutch Holding Tool",
                  "Torque Wrench",
                  "Oil Drain Pan"
            ]
      },
      {
            "id": "clutch-cable",
            "name": "Teflon-Lined Heavy-Duty Clutch Cable",
            "category": "Transmission",
            "icon": "HelpCircle",
            "image": "/images/parts/clutch-cable.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Transfers handlebar clutch lever pull to the right-side clutch release actuator lever on the crankcase.",
            "failures": "Wire strand fraying inside upper nipple barrel, snapped cable, internal corrosion binding.",
            "symptoms": "Heavy clutch lever pull, motorcycle creeping forward when in gear with lever held, sudden snap.",
            "interval": "Lubricate with cable oiler every 3,000 km; replace if frayed.",
            "cost": "₹120 - ₹170",
            "difficulty": "Basic DIY",
            "safety": "Maintain 10-15mm free play at the clutch lever ball end. Zero free play burns clutch plates rapidly.",
            "diySteps": [
                  "Slacken the upper cable adjuster screw at the handlebar clutch lever perch.",
                  "Align slot in adjuster screw and perch, pull cable out, and disconnect barrel nipple.",
                  "Unhook lower cable nipple from clutch release arm on right crankcase.",
                  "Pull old cable through frame routing loops, observing exact routing path.",
                  "Install new OEM cable, attach lower arm first, then upper lever perch.",
                  "Adjust lower cable locknuts (12mm) and upper thumb adjuster until lever has 10-15mm free play."
            ],
            "tools": [
                  "12mm Open-End Spanners",
                  "Pliers",
                  "Cable Lube Tool"
            ]
      },
      {
            "id": "gearbox",
            "name": "5-Speed Constant Mesh Transmission Gearbox",
            "category": "Transmission",
            "icon": "Settings",
            "image": "/images/parts/gearbox.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Input and output transmission shafts with sliding dog gears provide 5 forward gear ratios (1-Down, 4-Up).",
            "failures": "Worn gear engagement dogs, bent shift selector fork, worn shift drum detent star spring.",
            "symptoms": "Gear slipping out into neutral under acceleration, false neutrals between 2nd and 3rd, hard clunky shifting.",
            "interval": "Inspect during bottom-end overhaul; keep engine oil fresh to protect gear tooth faces.",
            "cost": "₹1,800 - ₹2,800",
            "difficulty": "Advanced DIY",
            "safety": "Always verify shift drum detent roller spring and shift pawl return spring are intact if gears pop out.",
            "diySteps": [
                  "Split crankcase halves.",
                  "Inspect shift drum cam grooves for rough wear edges.",
                  "Inspect the 3 shift selector forks for thickness and straightness (replace if bent > 0.05 mm).",
                  "Inspect dog teeth on 2nd, 3rd, and 4th gear pinions for rounded engagement edges.",
                  "Assemble transmission shafts, shift forks, and drum into left crankcase, test shift action by hand before closing."
            ],
            "tools": [
                  "Crankcase Splitter",
                  "Feeler Gauge",
                  "Dial Caliper",
                  "Circlip Pliers"
            ]
      },
      {
            "id": "chain",
            "name": "428-Pitch Heavy Duty O-Ring Drive Chain & Sprockets",
            "category": "Transmission",
            "icon": "RefreshCw",
            "image": "/images/parts/chain.jpg",
            "imageCredit": "Wikimedia Commons / Ralf Roletschek",
            "function": "Industrial steel roller chain (428H, 124 links) transfers engine gearbox torque to the rear wheel sprocket (15T front / 44T rear).",
            "failures": "Chain link seizure, o-ring rubber degradation from harsh petrol wash, hooked/shark-fin sprocket teeth.",
            "symptoms": "Loud whirring/slapping noise against swingarm, chain jumping off sprockets, jerky throttle snatch on/off.",
            "interval": "Clean & lube every 500 km; adjust slack (25 - 30 mm) every 1,000 km; replace set at ~20,000 km.",
            "cost": "₹1,400 - ₹1,850 (Full Kit)",
            "difficulty": "Moderate DIY",
            "safety": "NEVER use petrol to clean O-ring chains. Use kerosene or dedicated chain cleaner. Keep fingers clear of spinning wheel!",
            "diySteps": [
                  "Put bike on center stand in neutral.",
                  "Clean chain with kerosene and grunge brush, dry with rag, inspect for stiff links.",
                  "Loosen rear axle nut (22mm) and adjusters locknuts (12mm) on both swingarm sides.",
                  "Turn adjuster bolts equally until middle of chain slack measures 25 - 30 mm.",
                  "Verify wheel alignment index notches match on both swingarm sides.",
                  "Torque 22mm rear axle nut to 88 Nm and tighten adjuster locknuts.",
                  "Spray dedicated O-ring safe chain lube on inner link rollers while rotating wheel by hand."
            ],
            "tools": [
                  "22mm Axle Ring Spanner",
                  "12mm & 10mm Spanners",
                  "Chain Grunge Brush",
                  "Kerosene",
                  "Chain Lube"
            ]
      },
      {
            "id": "cush-drive",
            "name": "Rear Wheel Rubber Cush Drive Dampers (6-Vane)",
            "category": "Transmission",
            "icon": "RefreshCw",
            "image": "/images/parts/cush-drive.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Six vulcanized rubber damper blocks absorb drivetrain shock between rear sprocket carrier and wheel hub.",
            "failures": "Rubber hardening, crumbling, excessive play allowing sprocket to rotate independently of wheel.",
            "symptoms": "Hard clunking thud in drivetrain when releasing clutch in 1st gear, jerky low-speed throttle transitions.",
            "interval": "Inspect every 10,000 km; replace rubber set when rotational play exceeds 3mm.",
            "cost": "₹160 - ₹240 (Set of 6)",
            "difficulty": "Basic DIY",
            "safety": "Worn cush drive rubbers transfer harsh impact shocks directly to gearbox shafts, causing gear dog wear.",
            "diySteps": [
                  "Remove rear wheel assembly from swingarm.",
                  "Pull the rear sprocket carrier drum straight out of the wheel hub.",
                  "Extract the 6 rubber wedge damper blocks from the hub pockets.",
                  "Clean hub pockets of road grime and rubber dust.",
                  "Press new resilient OEM rubber blocks into pockets.",
                  "Apply light coat of talcum powder or soapy water to ease sprocket carrier insertion.",
                  "Press sprocket carrier firmly into place and reinstall rear wheel."
            ],
            "tools": [
                  "22mm & 17mm Spanners",
                  "Clean Rag",
                  "Rubber Cush Drive Set"
            ]
      },
      {
            "id": "carburetor-fi",
            "name": "26mm Mikuni CV Carburetor / Electronic Throttle Body",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/carburetor.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Vacuum diaphragm constant velocity carburetor with TPS sensor (BS4) or electronic fuel injector (BS6).",
            "failures": "Pilot jet clogging with ethanol varnish, torn rubber vacuum slide diaphragm, float valve needle leak.",
            "symptoms": "Engine refusing to idle without choke, fuel overflow dripping from drain tube, bogging on hard throttle snap.",
            "interval": "Clean jets and float bowl every 10,000 km; verify idle speed (1,400 ± 100 RPM).",
            "cost": "₹350 (Service kit) / ₹2,600 (Unit)",
            "difficulty": "Moderate DIY",
            "safety": "Fuel is highly inflammable. Drain float bowl completely into container before loosening carburetor bands.",
            "diySteps": [
                  "Turn fuel petcock OFF, loosen float bowl drain screw (flathead) to empty fuel.",
                  "Loosen intake manifold clamp and airbox rubber boot clamp.",
                  "Disconnect throttle cable and TPS sensor wire.",
                  "Remove carburetor body, remove 4x float bowl screws.",
                  "Unscrew brass pilot jet (#17.5) and main jet (#115) using precision flat screwdriver.",
                  "Spray carburetor cleaner spray through jet orifices (verify clear light through pinholes).",
                  "Inspect black rubber vacuum diaphragm for pinhole tears.",
                  "Reassemble with fresh bowl O-ring, mount on bike, set fuel-air screw (2.5 turns out)."
            ],
            "tools": [
                  "Carburetor Cleaner Spray",
                  "#1 & #2 Philips Screwdrivers",
                  "Precision Flathead Screwdriver"
            ]
      },
      {
            "id": "air-filter",
            "name": "Dual-Stage Polyurethane Foam & Paper Air Filter",
            "category": "Fuel & Exhaust",
            "icon": "Wind",
            "image": "/images/parts/air-filter.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Pre-filter washable oiled foam element combined with high-surface paper element purifies intake air.",
            "failures": "Foam disintegrating into engine, dirt saturation choking airflow, oily blow-back saturation.",
            "symptoms": "Engine running overly rich, black exhaust smoke under acceleration, fuel mileage dropping under 38 kmpl.",
            "interval": "Clean foam element every 2,500 km; replace paper filter every 10,000 km.",
            "cost": "₹190 - ₹280",
            "difficulty": "Basic DIY",
            "safety": "Never operate motorcycle without air filter. Road grit will destroy piston rings and cylinder bore within 50 km.",
            "diySteps": [
                  "Remove right side frame cover using ignition key lock and Philips screw.",
                  "Remove the 4x screws holding the air cleaner housing cover.",
                  "Pull out the air filter element assembly.",
                  "Wash outer polyurethane foam sleeve in warm soapy water or kerosene, dry thoroughly.",
                  "Saturate foam with clean 20W-50 oil, squeeze out excess oil firmly (do NOT wring or twist).",
                  "Tap inner paper element to dislodge loose dust, or replace with new filter.",
                  "Wipe clean airbox interior, reinstall filter element, and secure cover."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "Kerosene / Detergent",
                  "Clean Rag",
                  "Engine Oil"
            ]
      },
      {
            "id": "fuel-cock",
            "name": "Manual Fuel Petcock with Sediment Strainer Bowl",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/fuel-cock.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "3-position fuel valve (ON, RES, OFF) with internal nylon filter mesh prevents fuel tank rust from entering carburetor.",
            "failures": "Internal neoprene 4-hole gasket breakdown, stripped plastic lever knob, clogged reserve inlet tube.",
            "symptoms": "Fuel dripping from petcock lever seam, engine starving on 'RES' mode even with 2.5L fuel remaining.",
            "interval": "Clean sediment bowl every 5,000 km; replace internal gasket if leaking.",
            "cost": "₹160 - ₹240",
            "difficulty": "Basic DIY",
            "safety": "Drain fuel below petcock level before unscrewing. Work outdoors away from pilot flames or smoking.",
            "diySteps": [
                  "Turn fuel cock to 'OFF' position.",
                  "Use 10mm spanner to unscrew the bottom sediment bowl cup.",
                  "Dump out accumulated water droplets, rust silt, and dirt flakes.",
                  "Clean internal brass mesh filter with fresh petrol.",
                  "Inspect small rubber O-ring gasket inside sediment cup rim.",
                  "Screw sediment bowl back on, tighten gently (do not crack aluminium threads), turn to ON and check for leaks."
            ],
            "tools": [
                  "10mm Open Spanner",
                  "Small Catch Basin",
                  "Clean Rag"
            ]
      },
      {
            "id": "fuel-tank",
            "name": "15-Litre Sculpted Steel Fuel Tank & Aircraft Cap",
            "category": "Fuel & Exhaust",
            "icon": "Fuel",
            "image": "/images/parts/fuel-tank.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Holds 15.0 litres (including 2.5L reserve) with iconic muscular Pulsar tank shroud styling.",
            "failures": "Internal rust seam perforation from ethanol water separation, clogged tank cap breather vent causing vacuum.",
            "symptoms": "Bike stalling after 5 km riding with gasping sound when cap opened, water rust in fuel bowl.",
            "interval": "Clean tank vent hole every 5,000 km; inspect for internal rust annually.",
            "cost": "₹3,800 - ₹5,200",
            "difficulty": "Moderate DIY",
            "safety": "If tank vent is blocked, negative vacuum prevents fuel flow to engine. Keep overflow drain tube clear.",
            "diySteps": [
                  "Open aircraft-style flush fuel filler cap.",
                  "Inspect rubber sealing gasket under cap flange.",
                  "Use compressed air or a thin nylon wire to clear the water drain hole located around the filler neck.",
                  "Inspect fuel overflow hose running down under frame behind engine.",
                  "If internal rust exists, remove tank, flush with cleaning solvent and gravel, dry completely before reinstalling."
            ],
            "tools": [
                  "Thin Nylon Wire",
                  "Philips Screwdriver",
                  "10mm & 12mm Sockets"
            ]
      },
      {
            "id": "exhaust-muffler",
            "name": "Matte Black Exhaust with ExhausTEC Resonator",
            "category": "Fuel & Exhaust",
            "icon": "Wind",
            "image": "/images/parts/exhaust-muffler.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "ExhausTEC (Torque Expansion Chamber) boosts low-end pulling torque by controlling exhaust pulse resonance.",
            "failures": "Exhaust header copper gasket blowout, rust at bottom drain weep hole, loose heat shield rattle.",
            "symptoms": "Loud puttering leak noise at cylinder head exhaust flange, metallic buzzing vibration at 4,500 RPM.",
            "interval": "Inspect mounting bolts every 5,000 km; replace exhaust port gasket whenever header is unbolted.",
            "cost": "₹2,200 - ₹3,400",
            "difficulty": "Basic DIY",
            "safety": "Exhaust system gets blistering hot. Always allow 45 minutes of cooling before touching exhaust bolts.",
            "diySteps": [
                  "Remove 2x 10mm nuts at cylinder head exhaust manifold flange.",
                  "Remove the 2x 14mm main exhaust mounting bolts on the pillion footrest bracket.",
                  "Carefully detach exhaust muffler assembly.",
                  "Pry out old crushed copper ring gasket from cylinder exhaust port.",
                  "Fit new copper ring gasket, align header flange, finger-tighten 10mm nuts.",
                  "Fit rear 14mm mounting bolts, torque header nuts to 15 Nm, then torque rear chassis bolts to 40 Nm."
            ],
            "tools": [
                  "10mm & 14mm Sockets & Ratchet",
                  "New Copper Exhaust Gasket",
                  "Wire Brush"
            ]
      },
      {
            "id": "catalytic-converter",
            "name": "Catalytic Converter Chamber & Heated O2 Sensor",
            "category": "Fuel & Exhaust",
            "icon": "Cpu",
            "image": "/images/parts/catalytic-converter.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Precious metal honeycomb substrate oxidises unburnt hydrocarbons and carbon monoxide into clean emissions.",
            "failures": "Substrate melting from unburnt fuel backfires, ceramic core rattling loose, carbon soot blinding.",
            "symptoms": "Rattling noise inside exhaust expansion box, rotten egg sulphur odour, power drop at high speed.",
            "interval": "Inspect exhaust emissions during PUC testing every 6 months.",
            "cost": "₹2,400 - ₹3,600",
            "difficulty": "Advanced DIY",
            "safety": "Never bump-start a fuel-injected bike repeatedly. Raw fuel entering a hot catalytic converter burns the core.",
            "diySteps": [
                  "Inspect under-belly catalytic converter chamber for physical dent damage or blue heat discolouration.",
                  "Check 4-wire oxygen sensor harness connection.",
                  "Ensure heat shield bolts are snug (10 Nm) with anti-vibration rubber dampers intact.",
                  "If internal honeycomb is shattered, exhaust unit requires replacement to pass legal emission norms."
            ],
            "tools": [
                  "10mm Socket",
                  "17mm O2 Sensor Spanner",
                  "Multimeter"
            ]
      },
      {
            "id": "front-brake-disc",
            "name": "260mm Ventilated Petal Front Disc Rotor & ByBre Caliper",
            "category": "Brakes",
            "icon": "Disc",
            "image": "/images/parts/front-brake-disc.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "260mm stainless steel ventilated petal disc clamped by ByBre twin-piston floating hydraulic caliper.",
            "failures": "Rotor warping from rapid thermal shock (cold water splash after hard braking), rotor scoring below 3.5mm thickness.",
            "symptoms": "Pulsing sensation through front brake lever during high-speed stops, metallic grinding noise, shudder.",
            "interval": "Inspect thickness every 5,000 km (minimum service limit: 3.5 mm).",
            "cost": "₹850 - ₹1,250 (Rotor)",
            "difficulty": "Basic DIY",
            "safety": "Never spray tyre polish or chain lube near the brake rotor. Wipe rotor only with pure isopropyl alcohol or brake cleaner.",
            "diySteps": [
                  "Check disc thickness using micrometer caliper at 4 points around braking band.",
                  "Inspect disc face for circular grooves deeper than 0.5 mm.",
                  "Clean surface thoroughly with brake cleaner spray.",
                  "To replace disc: remove front wheel, unbolt 6x 6mm Allen rotor bolts (use heat gun if threadlocker is stubborn).",
                  "Mount new rotor, apply blue medium threadlocker to bolts, torque in star pattern to 22 Nm."
            ],
            "tools": [
                  "Micrometer Caliper",
                  "6mm Allen Key",
                  "Blue Threadlocker",
                  "Brake Cleaner Spray"
            ]
      },
      {
            "id": "brake-pads",
            "name": "Sintered Front Brake Pads & DOT 4 Fluid Reservoir",
            "category": "Brakes",
            "icon": "Disc",
            "image": "/images/parts/brake-pads.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Dual friction pads squeeze rotor under hydraulic fluid pressure generated by handlebar master cylinder.",
            "failures": "Pads worn down to steel backing plate, fluid moisture contamination (DOT 4 dark amber/black).",
            "symptoms": "Spongy front brake lever feel, screeching metal-on-metal noise, brake fluid level dropping in sight window.",
            "interval": "Inspect pad thickness every 2,500 km (replace if under 1.5 mm); flush DOT 4 fluid every 2 years.",
            "cost": "₹220 - ₹380 (Pads) / ₹120 (Fluid)",
            "difficulty": "Basic DIY",
            "safety": "Brake fluid ruins painted surfaces immediately! Wash any spill with lots of water instantly. Bleed all air bubbles.",
            "diySteps": [
                  "Remove the 2x 8mm pad retaining pin caps on ByBre caliper.",
                  "Unscrew the 2x 5mm Allen pad pins and slide them out.",
                  "Drop out the old worn brake pads and stainless steel anti-rattle spring clip.",
                  "Push caliper dual pistons back into their bores using flat wooden tool.",
                  "Insert new OEM sintered brake pads with friction material facing inward.",
                  "Slide clean greased pad pins through pads, tighten Allen pins to 15 Nm.",
                  "Pump front brake lever 5 times until firm hydraulic pressure is restored before riding!"
            ],
            "tools": [
                  "5mm Allen Key",
                  "8mm Ring Spanner",
                  "Brake Bleed Kit",
                  "DOT 4 Brake Fluid"
            ]
      },
      {
            "id": "rear-brake-drum",
            "name": "130mm Mechanical Expanding Rear Drum Brake",
            "category": "Brakes",
            "icon": "Disc",
            "image": "/images/parts/rear-brake-drum.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "130mm cast-iron wheel hub drum with dual internal expanding bonded shoes activated via foot pedal rod.",
            "failures": "Shoe lining wear down to aluminium base, glazed drum track, return spring fatigue.",
            "symptoms": "Deep rear brake pedal travel, weak rear lockup capability, loud squeaking when braking.",
            "interval": "Inspect every 5,000 km; replace shoes when wear indicator arrow aligns with limit notch.",
            "cost": "₹220 - ₹320",
            "difficulty": "Basic DIY",
            "safety": "Never use compressed air to blow brake dust! Wear a mask and use aerosol brake cleaner.",
            "diySteps": [
                  "Loosen rear brake adjusting wingnut on rear brake rod.",
                  "Remove rear wheel assembly from motorcycle.",
                  "Lift out the circular rear brake backing plate.",
                  "Fold the 2 brake shoes inward to unhook the dual tension springs.",
                  "Clean drum hub cavity with brake cleaner spray and scuff drum with 120-grit emery paper.",
                  "Apply tiny smear of high-temp grease on brake cam and anchor pin.",
                  "Hook new springs onto fresh shoes, fold onto backing plate, refit wheel, torque 22mm axle to 88 Nm.",
                  "Adjust wingnut until rear pedal has 20-30mm free play."
            ],
            "tools": [
                  "22mm & 17mm Spanners",
                  "120-Grit Sandpaper",
                  "Brake Cleaner",
                  "High-Temp Grease"
            ]
      },
      {
            "id": "brake-rod-linkage",
            "name": "Rear Brake Foot Pedal, Actuator Rod & Spring",
            "category": "Brakes",
            "icon": "HelpCircle",
            "image": "/images/parts/brake-cable-rod.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Solid steel tension rod transfers rider foot pedal force to the rear drum brake operating cam lever.",
            "failures": "Bent actuator rod from road debris, rusted pivot joint, stripped wingnut thread, broken return spring.",
            "symptoms": "Brake pedal sticking down and not returning, rear brake dragging and overheating, brake light staying ON.",
            "interval": "Lubricate pedal pivot pin every 5,000 km; check split pin integrity.",
            "cost": "₹140 - ₹210",
            "difficulty": "Basic DIY",
            "safety": "Always ensure the safety split pin (cotter pin) is fitted through the brake rod clevis pin to prevent disconnect.",
            "diySteps": [
                  "Inspect brake rod running along right side of swingarm.",
                  "Check the coil return spring connected between brake pedal and chassis.",
                  "Spray pivot joint with penetrating oil and apply grease to pedal pivot shaft.",
                  "Inspect rear brake light switch spring connected to pedal; adjust switch plastic nut so light illuminates with 10mm pedal depression.",
                  "Verify rear wingnut rotates smoothly on rod threads."
            ],
            "tools": [
                  "Pliers",
                  "10mm Open Spanner",
                  "Multipurpose Grease",
                  "Clean Rag"
            ]
      },
      {
            "id": "front-telescopic-forks",
            "name": "31mm Heavy-Duty Telescopic Front Forks (135mm Travel)",
            "category": "Suspension",
            "icon": "Settings",
            "image": "/images/parts/telescopic-forks.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Dual hydraulic telescopic front stanchions with internal damping rods absorb high-speed road impacts.",
            "failures": "Fork oil seal rupture from dried insect/dirt abrasion on chrome legs, pitted stanchions, depleted fork oil.",
            "symptoms": "Oil rings and drips down fork lowers onto brake caliper, front end bottoming out with metal clunk over speed breakers.",
            "interval": "Inspect chrome tubes weekly; replace fork oil (145 ml per leg, 10W / 20W oil) every 15,000 km.",
            "cost": "₹280 (Seals) / ₹2,400 (Fork assembly)",
            "difficulty": "Moderate DIY",
            "safety": "Keep chrome stanchions polished and clean. Even a tiny stone nick in the chrome will slice a new oil seal immediately.",
            "diySteps": [
                  "Jack motorcycle under engine crankcase until front wheel is off ground.",
                  "Remove front wheel, mudguard, and brake caliper.",
                  "Loosen upper and lower triple tree pinch bolts (12mm & 14mm).",
                  "Slide fork leg downward out of the clamps.",
                  "Unscrew top fork cap bolt (caution: internal spring is under compression).",
                  "Pour out old dark fork oil into measuring cup.",
                  "Pry out old oil seal, press in new 31mm dual-lip fork oil seal.",
                  "Pour in exactly 145 ml of 10W/20W fork oil per leg, pump leg 10 times to bleed, reinstall."
            ],
            "tools": [
                  "12mm & 14mm Sockets",
                  "Allen Key",
                  "Measuring Cylinder",
                  "Fork Oil (10W)",
                  "Seal Driver"
            ]
      },
      {
            "id": "rear-nitrox-shocks",
            "name": "Twin Nitrox Gas-Charged Rear Shock Absorbers",
            "category": "Suspension",
            "icon": "Settings",
            "image": "/images/parts/rear-shock-absorbers.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Twin hydraulic dampers with external gold nitrogen gas reservoirs prevent oil foaming during aggressive riding.",
            "failures": "Damper shaft seal weeping oil, nitrogen gas pressure loss, cracked lower rubber eyelet bushing.",
            "symptoms": "Pulsing rear pogo-stick bounce after bumps, cornering wallow, bottoming out with pillion.",
            "interval": "Inspect for oil misting every 5,000 km; adjust 5-step preload for rider weight.",
            "cost": "₹1,800 - ₹2,600 (Pair)",
            "difficulty": "Basic DIY",
            "safety": "Always set the preload step equally on both left and right shocks. Unequal preload twists the swingarm.",
            "diySteps": [
                  "Place bike on center stand so rear suspension is completely unloaded.",
                  "Inspect gold nitrogen piggyback canisters for physical stone damage.",
                  "To adjust preload: use C-hook pin spanner on lower notched collar (1=Softest, 3=Standard, 5=Heavy Pillion).",
                  "To replace: remove upper 14mm acorn nut and lower 12mm bolt on swingarm.",
                  "Slide off shock absorber, inspect rubber mounting eyelet bushes.",
                  "Mount new Nitrox shock and torque upper nut to 35 Nm and lower bolt to 30 Nm."
            ],
            "tools": [
                  "C-Hook Preload Pin Spanner",
                  "14mm & 12mm Sockets & Ratchet"
            ]
      },
      {
            "id": "steering-bearings",
            "name": "Tapered Roller / Ball & Cone Steering Head Bearings",
            "category": "Suspension",
            "icon": "CircleDot",
            "image": "/images/parts/steering-bearings.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Dual bearing races in frame headstock allow smooth, precise handlebar steering under braking and turning loads.",
            "failures": "Ball denting ('brinelling') in center track, dry rusted grease, loose stem nut causing play.",
            "symptoms": "Handlebar resisting micro-turns or 'locking' in straight-ahead notch, loud shuddering click under hard front braking.",
            "interval": "Inspect steering free play every 5,000 km; repack with lithium grease every 15,000 km.",
            "cost": "₹320 - ₹450",
            "difficulty": "Advanced DIY",
            "safety": "Never overtighten steering stem nut. Front end must fall gently to lock-stop under its own weight when nudged.",
            "diySteps": [
                  "Jack bike up with front wheel off ground.",
                  "Remove handlebars, headlamp assembly, front wheel, and fork legs.",
                  "Loosen central 30mm steering stem top nut.",
                  "Unthread slotted bearing adjuster ring and lower triple tree down from frame headstock.",
                  "Catch ball bearings, wipe old dried grease from upper and lower bearing cups.",
                  "Inspect hardened steel cups for dent ridges.",
                  "Pack cups with waterproof high-pressure grease, install new balls or tapered roller set.",
                  "Reassemble, tighten adjuster ring until zero play exists with silky smooth sweep."
            ],
            "tools": [
                  "30mm Socket",
                  "C-Spanner",
                  "High-Pressure Wheel Bearing Grease",
                  "Brass Drift"
            ]
      },
      {
            "id": "swingarm",
            "name": "Box-Section Steel Swingarm & Bronze Pivot Bushes",
            "category": "Suspension",
            "icon": "Shield",
            "image": "/images/parts/swingarm.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Rigid rectangular box-section steel swingarm articulates rear axle travel around chassis pivot bolt.",
            "failures": "Worn pivot bushes creating lateral wheel play, bent swingarm from crash, chain adjuster bolt seizure.",
            "symptoms": "Motorcycle feeling unstable / loose in high-speed highway corners, rear wheel misaligning with front.",
            "interval": "Inspect swingarm lateral play every 10,000 km; lubricate pivot shaft every 20,000 km.",
            "cost": "₹1,600 - ₹2,300",
            "difficulty": "Moderate DIY",
            "safety": "Inspect chain slider rubber on top of swingarm. If worn through, the steel drive chain will saw through the aluminium swingarm.",
            "diySteps": [
                  "Place bike on center stand, remove rear wheel and chain.",
                  "Grab rear of swingarm and shake firmly sideways: there should be ZERO lateral play.",
                  "Remove rear shock lower mounting bolts.",
                  "Loosen and remove main 19mm swingarm pivot axle bolt.",
                  "Slide swingarm out of frame.",
                  "Inspect bronze / nylon pivot bushes inside swingarm tube.",
                  "Press in new pivot bushes, coat pivot shaft with heavy grease, reinstall and torque 19mm nut to 85 Nm."
            ],
            "tools": [
                  "19mm & 17mm Sockets",
                  "Heavy Waterproof Grease",
                  "Torque Wrench"
            ]
      },
      {
            "id": "front-wheel",
            "name": "17-Inch 6-Spoke Black Alloy Wheel & 80/100-17 Tyre",
            "category": "Wheels",
            "icon": "CircleDot",
            "image": "/images/parts/front-tyre.JPG",
            "imageCredit": "Wikimedia Commons",
            "function": "Die-cast aluminium alloy 6-spoke rim fitted with tubeless directional front road tyre.",
            "failures": "Rim bend / crack from severe pothole impact, uneven tyre cupping, tubeless bead air leak.",
            "symptoms": "Handlebar shaking at 60 km/h, slow loss of air pressure over 3 days, vibration under braking.",
            "interval": "Maintain cold pressure weekly (28 psi); replace tyre when tread reaches 1.5mm TWI.",
            "cost": "₹1,650 - ₹2,100 (Tyre)",
            "difficulty": "Basic DIY",
            "safety": "Always maintain 28 psi cold tyre pressure. Inspect rim bead lips for cracks after hitting deep potholes.",
            "diySteps": [
                  "Inspect tyre tread depth at wear indicator bars across center grooves.",
                  "Check rim lip for radial or lateral runout (spin wheel by hand, limit: 1.0 mm).",
                  "To remove: unbolt speedometer cable screw and ByBre caliper bolts (12mm).",
                  "Loosen 17mm front axle nut, slide axle bolt out, support wheel.",
                  "Inspect wheel bearings by rotating with finger (must feel silky smooth with zero grit).",
                  "Reinstall wheel with axle spacers in place, torque front axle nut to 59 Nm."
            ],
            "tools": [
                  "17mm & 14mm Spanners",
                  "12mm Socket",
                  "Tyre Pressure Gauge"
            ]
      },
      {
            "id": "rear-wheel",
            "name": "17-Inch 6-Spoke Black Alloy Wheel & 100/90-17 Tyre",
            "category": "Wheels",
            "icon": "CircleDot",
            "image": "/images/parts/rear-tyre.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Wide 17-inch rear alloy rim accommodates 100/90-17 tubeless tyre for high-speed highway grip.",
            "failures": "Punctures, center tread flat-spotting from straight-line highway riding, tubeless valve rot.",
            "symptoms": "Rear end sliding out in wet corners, heavy sluggish handling when tyre pressure drops.",
            "interval": "Check pressure weekly (32 psi solo, 38 psi pillion); replace tyre at 20,000 - 25,000 km.",
            "cost": "₹2,100 - ₹2,800",
            "difficulty": "Moderate DIY",
            "safety": "Never ride with tyre pressure below 30 psi. Low pressure causes sidewall squirm and dangerous rim damage.",
            "diySteps": [
                  "Place bike on center stand.",
                  "Loosen rear brake linkage wingnut and disconnect brake torque link arm.",
                  "Loosen chain adjusters, remove 22mm rear axle nut.",
                  "Push wheel forward, lift drive chain off rear sprocket.",
                  "Slide axle bolt out, remove rear wheel assembly.",
                  "Inspect tyre tread and tubeless L-shaped angled air valve.",
                  "Reinstall wheel, align chain tension notches equally on swingarm, torque 22mm axle to 88 Nm."
            ],
            "tools": [
                  "22mm & 17mm Ring Spanners",
                  "Tyre Pressure Gauge",
                  "Foot Pump"
            ]
      },
      {
            "id": "wheel-bearings",
            "name": "Sealed Deep-Groove Front & Rear Wheel Bearings",
            "category": "Wheels",
            "icon": "CircleDot",
            "image": "/images/parts/wheel-bearings.png",
            "imageCredit": "Wikimedia Commons",
            "function": "High-speed rubber-sealed ball bearings (6301-2RS front, 6202-2RS / 6004-2RS rear) support axle rotation.",
            "failures": "Water intrusion washing out grease, spalled steel ball surfaces, excessive axial play.",
            "symptoms": "Rumbling wheel noise that increases with road speed, wheel wobbling side-to-side on axle.",
            "interval": "Inspect during every tyre change or 10,000 km; replace immediately if gritty.",
            "cost": "₹180 - ₹260 (Per pair)",
            "difficulty": "Moderate DIY",
            "safety": "Always replace wheel bearings as a matched pair on both sides of the hub. Never hammer directly on the inner race.",
            "diySteps": [
                  "Remove wheel from motorcycle and pull out external dust seals.",
                  "Insert long brass drift from opposite side, catching edge of inner bearing race.",
                  "Tap drift around circumference evenly with hammer to drive bearing out of hub pocket.",
                  "Remove center axle spacer sleeve, drive out opposite bearing.",
                  "Clean hub bearing bore.",
                  "Press or tap new bearings into hub using socket that matches ONLY the outer race.",
                  "Ensure center spacer tube is installed before driving second bearing."
            ],
            "tools": [
                  "Bearing Drift / Driver Set",
                  "Hammer",
                  "High-Temp Wheel Bearing Grease",
                  "Circlip Pliers"
            ]
      },
      {
            "id": "battery",
            "name": "12V 4Ah / 5Ah VRLA Maintenance-Free Battery",
            "category": "Electrical",
            "icon": "BatteryCharging",
            "image": "/images/parts/battery.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Supplies current to self-starter motor, digital instrument cluster, BCU, and twin wolf-eye pilot lamps.",
            "failures": "Sulphated lead plates from disuse, terminal oxide crusting, resting voltage dropping below 12.4V.",
            "symptoms": "Starter relay clicking rapidly without cranking engine, digital speedometer resetting when starter button is pressed.",
            "interval": "Check terminal tightness every 3 months; replace every 3-4 years.",
            "cost": "₹1,350 - ₹1,750",
            "difficulty": "Basic DIY",
            "safety": "Always disconnect negative (-) black cable first. Connect positive (+) red cable first during installation.",
            "diySteps": [
                  "Remove left side body panel using key lock.",
                  "Remove battery retention strap / clamp bolt (10mm).",
                  "Disconnect black negative (-) terminal bolt first.",
                  "Disconnect red positive (+) terminal bolt.",
                  "Slide battery out of tray.",
                  "Clean terminal eyelets with wire brush.",
                  "Insert new 12V 4Ah / 5Ah VRLA battery, connect (+) red first, then (-) black.",
                  "Coat terminals with petroleum jelly to prevent sulphate corrosion."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "10mm Open Spanner",
                  "Petroleum Jelly",
                  "Wire Brush"
            ]
      },
      {
            "id": "stator-magneto",
            "name": "12-Pole AC Magneto Stator & Pickup Coil",
            "category": "Electrical",
            "icon": "BatteryCharging",
            "image": "/images/parts/stator-magneto.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Generates alternating current (AC) for battery charging, ignition CDI trigger, and lighting systems.",
            "failures": "Burnout/charring of copper coil windings, open circuit in pulse trigger pickup coil.",
            "symptoms": "Battery draining flat while riding, no spark at both spark plugs, engine cutting out when hot.",
            "interval": "Test charging output voltage (14.2V ± 0.4V at 4000 RPM) every 10,000 km.",
            "cost": "₹1,200 - ₹1,650",
            "difficulty": "Advanced DIY",
            "safety": "Always use dedicated Pulsar flywheel puller to remove magneto rotor. Never strike rotor with a hammer.",
            "diySteps": [
                  "Drain engine oil or lean bike to right side.",
                  "Remove left engine crankcase alternator cover (8mm bolts).",
                  "Use rotor puller tool to unseat flywheel from tapered crankshaft.",
                  "Inspect stator coils mounted inside cover: copper windings should be amber, not charred black.",
                  "Measure pickup coil resistance across blue/white and black/yellow wires (180 - 240 ohms).",
                  "Replace stator stator assembly with new OEM unit, torque flywheel nut to 54 Nm."
            ],
            "tools": [
                  "Bajaj Flywheel Puller",
                  "Flywheel Holder",
                  "Digital Multimeter",
                  "8mm & 14mm Sockets"
            ]
      },
      {
            "id": "regulator-rectifier",
            "name": "Fin-Cooled 12V DC Voltage Regulator / Rectifier (RR Unit)",
            "category": "Electrical",
            "icon": "Activity",
            "image": "/images/parts/regulator-rectifier.png",
            "imageCredit": "Wikimedia Commons",
            "function": "Converts three-phase AC from stator into smooth 14.4V DC to charge battery and power DC electronics.",
            "failures": "Internal zener diode blowout, thermal overload causing over-voltage (> 16V, boiling battery acid).",
            "symptoms": "Headlamp bulbs blowing frequently, battery bulging/leaking acid, or battery not charging at all.",
            "interval": "Test output voltage with multimeter across battery terminals at 4,000 RPM (must stay 14.0 - 14.6V).",
            "cost": "₹550 - ₹750",
            "difficulty": "Basic DIY",
            "safety": "Ensure RR unit metal cooling fins are clean of road mud. Ensure mounting bolts make clean metal ground to frame.",
            "diySteps": [
                  "Locate RR unit with aluminium cooling fins mounted under the fuel tank / right side panel.",
                  "Disconnect the multi-pin electrical coupler.",
                  "Inspect coupler pins for heat melting or brown scorch marks.",
                  "Remove the 2x 10mm mounting bolts holding RR unit to chassis.",
                  "Clean frame mounting ground contact surface with wire brush.",
                  "Bolt on new OEM RR unit, reconnect coupler firmly, and verify charging voltage at battery with multimeter."
            ],
            "tools": [
                  "10mm Socket & Ratchet",
                  "Digital Multimeter",
                  "Wire Brush"
            ]
      },
      {
            "id": "starter-motor",
            "name": "12V DC Electric Starter Motor & Solenoid Relay",
            "category": "Electrical",
            "icon": "BatteryCharging",
            "image": "/images/parts/starter-motor.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "High-torque permanent magnet DC motor cranks engine crankshaft via starter clutch and idler gears.",
            "failures": "Worn carbon brushes, commutater copper segment pitting, burned solenoid relay switch contacts.",
            "symptoms": "Starter button produces audible 'click' from relay under seat but motor fails to spin engine.",
            "interval": "Inspect carbon brushes (replace if worn below 5mm) every 25,000 km.",
            "cost": "₹180 (Brushes) / ₹1,450 (Starter motor)",
            "difficulty": "Moderate DIY",
            "safety": "Heavy positive cable connects straight to battery. Always disconnect battery negative terminal first before unbolting starter motor.",
            "diySteps": [
                  "Disconnect battery ground (-) cable.",
                  "Locate starter motor seated horizontally behind cylinder block on top of crankcase.",
                  "Remove protective rubber boot and 10mm nut on motor positive (+) terminal post.",
                  "Remove the 2x 8mm mounting bolts holding starter motor flange into crankcase.",
                  "Pull starter motor backward out of engine case.",
                  "Disassemble motor end-cap to inspect carbon brushes and commutator.",
                  "Replace carbon brushes and clean commutator grooves with hobby knife.",
                  "Reinstall with fresh O-ring on motor snout."
            ],
            "tools": [
                  "8mm & 10mm Sockets",
                  "#2 Philips Screwdriver",
                  "Wire Brush"
            ]
      },
      {
            "id": "ignition-coil",
            "name": "Dual High-Tension (HT) Ignition Coils (Left & Right)",
            "category": "Electrical",
            "icon": "Zap",
            "image": "/images/parts/ignition-coil.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Two separate step-up transformers boost 12V primary pulse to 25,000+ volts for the dual spark plugs.",
            "failures": "High-voltage breakdown in secondary coil, cracked HT lead rubber, internal resistance out of spec.",
            "symptoms": "Engine cutting out in rain / monsoon puddles, high-RPM misfire, weak orange spark instead of crisp blue.",
            "interval": "Inspect spark plug boots and HT leads for cracks every 10,000 km.",
            "cost": "₹380 - ₹520 (Each)",
            "difficulty": "Basic DIY",
            "safety": "Never hold spark plug wire while cranking engine! 25,000V shock is painful and dangerous.",
            "diySteps": [
                  "Remove fuel tank to expose frame top tube.",
                  "Locate the two ignition coils mounted to the underside of the frame backbone.",
                  "Disconnect low-voltage spade terminals on primary side.",
                  "Unscrew mounting bolts (10mm).",
                  "Inspect secondary HT cable for rubber cracks or perishing.",
                  "Test primary coil resistance (0.3 - 0.5 ohms) and secondary resistance (4.5 - 6.5 k-ohms) with multimeter.",
                  "Replace defective coil, ensure clean frame ground, and re-mount securely."
            ],
            "tools": [
                  "10mm Socket",
                  "Digital Multimeter",
                  "Dielectric Silicone Grease"
            ]
      },
      {
            "id": "cdi-bcu",
            "name": "Digital Microprocessor CDI / Body Control Unit (BCU)",
            "category": "Electrical",
            "icon": "Cpu",
            "image": "/images/parts/cdi-unit.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Microprocessor controls digital twin-spark ignition mapping, auto-turn-off indicators, and electrical interlocks.",
            "failures": "Internal circuit board trace burnout from jump-starting with car battery, water intrusion.",
            "symptoms": "No spark at both plugs despite good stator and coils; indicators not blinking; engine dying at exactly 4,000 RPM.",
            "interval": "Inspect multi-pin waterproof coupler annually.",
            "cost": "₹1,250 - ₹1,850",
            "difficulty": "Basic DIY",
            "safety": "Never jump-start a Pulsar directly from a running car alternator! The voltage spikes destroy the digital CDI unit.",
            "diySteps": [
                  "Remove rider and pillion seats to access under-seat electronics tray.",
                  "Locate black sealed microprocessor CDI / BCU module.",
                  "Slide unit out of rubber vibration-damping pocket.",
                  "Disconnect the multi-pin connector latch and inspect pins for green corrosion or water.",
                  "Test replacement OEM CDI module by plugging into harness.",
                  "Verify engine starts instantly and revs cleanly past 6,000 RPM."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "Electrical Contact Cleaner Spray"
            ]
      },
      {
            "id": "headlight-assembly",
            "name": "Wolf-Eyed Twin Pilot Lamps, 35W Headlamp & LED Taillamp",
            "category": "Electrical",
            "icon": "Zap",
            "image": "/images/parts/headlight-assembly.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Iconic Pulsar wolf-eye bikini fairing with twin amber/white pilot lamps, 35/35W HS1 bulb, and twin LED vertical taillamp strips.",
            "failures": "Blown HS1 halogen bulb filaments, fractured fairing stay brackets, dead LED diodes in taillamp strip.",
            "symptoms": "No low beam, flickering headlight, broken bikini fairing rattling over bumps.",
            "interval": "Inspect bulb operation before every night ride; adjust beam height screw annually.",
            "cost": "₹160 (Bulb) / ₹1,400 (Fairing)",
            "difficulty": "Basic DIY",
            "safety": "Never touch the quartz glass of a halogen bulb with bare fingers. Finger oils vaporise and blacken the bulb envelope.",
            "diySteps": [
                  "Remove 4x screws holding the front bikini fairing to the headlamp bracket.",
                  "Gently tilt fairing forward, unplug main 3-prong H4/HS1 bulb connector.",
                  "Peel back waterproof rubber dust boot.",
                  "Unhook wire retaining spring clip.",
                  "Remove old 35/35W HS1 bulb, insert new bulb aligning the 3 metal tabs.",
                  "Hook spring clip, refit rubber boot tightly, plug connector, and test high/low beams.",
                  "Reassemble bikini fairing screws."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "New 12V 35/35W HS1 Halogen Bulb",
                  "Clean Tissue"
            ]
      },
      {
            "id": "switchgear-throttle",
            "name": "Backlit Blue Handlebar Switchgear & Dual Throttle Cables",
            "category": "Electrical",
            "icon": "Activity",
            "image": "/images/parts/switchgear-throttle.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Signature Pulsar illuminated switchgear (blue LED backlights), engine kill switch, pass switch, and push-pull throttle cables.",
            "failures": "Sticky engine kill switch contacts, broken throttle pull cable, moisture shorting horn switch.",
            "symptoms": "Engine suddenly cutting out when handlebars are turned, sticky throttle tube not snapping back, horn dead.",
            "interval": "Lubricate throttle cables with light machine oil every 5,000 km.",
            "cost": "₹450 - ₹750",
            "difficulty": "Moderate DIY",
            "safety": "Always verify throttle snap-back! When released from full throttle, the twist grip MUST snap closed instantly in all handlebar positions.",
            "diySteps": [
                  "Remove 2x Philips screws holding right handlebar switchgear clamshell.",
                  "Separate clamshell halves, unhook throttle cable barrel nipple from twist-grip cam.",
                  "Inspect dual cable inner wires for fraying.",
                  "Spray cable lubricant into cable sleeve until clean lube exits at carburetor end.",
                  "Clean handlebar tube under plastic throttle sleeve with dry cloth.",
                  "Reassemble clamshell, tighten screws, and test throttle snap-back with handlebars turned fully left and right."
            ],
            "tools": [
                  "#2 Philips Screwdriver",
                  "Cable Lube Tool",
                  "Light Machine Oil"
            ]
      },
      {
            "id": "instrument-cluster",
            "name": "Digital-Analog Hybrid Speedometer & Analog 12K Tachometer",
            "category": "Electrical",
            "icon": "Gauge",
            "image": "/images/parts/instrument-cluster.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Combines large analog rev-counter dial (tachometer) with amber/orange LCD digital speed, odometer, and fuel gauge.",
            "failures": "Sunlight UV display fading, cracked front polycarbonate glass, broken magnetic speedo cable/sensor.",
            "symptoms": "Speedometer reading 0 km/h while riding, tachometer needle jumping erratically or stuck.",
            "interval": "Inspect speedo drive gear and cable every 5,000 km.",
            "cost": "₹1,800 - ₹2,800",
            "difficulty": "Basic DIY",
            "safety": "Ensure instrument cluster rubber vibration mounting grommets are intact to prevent road shocks from cracking LCD display.",
            "diySteps": [
                  "Check speedometer cable threaded into front wheel hub drive gear.",
                  "Unscrew knurled cable nut at front wheel, pull inner square wire out to check for snapping.",
                  "If broken, pull inner core out, lubricate new core with grease, slide in, and tighten knurled collar.",
                  "To replace cluster: remove bikini fairing (4 screws), unplug 16-pin waterproof connector, unbolt 3x 10mm nuts behind cluster.",
                  "Mount new unit on rubber damping bushes and re-torque nuts."
            ],
            "tools": [
                  "Pliers",
                  "10mm Socket",
                  "#2 Philips Screwdriver",
                  "Speedo Cable Grease"
            ]
      },
      {
            "id": "wiring-harness",
            "name": "Sealed Main Automotive Wiring Loom & Fuse Block",
            "category": "Electrical",
            "icon": "Activity",
            "image": "/images/parts/wiring-harness.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Complete multi-conductor automotive wiring harness connecting battery, BCU, lights, sensors, and ignition.",
            "failures": "Wire chafing at steering headstock from repeated turning, blown 15A/10A blade fuses, corroded bullet connectors.",
            "symptoms": "Intermittent headlight cutout when turning handle left, fuse blowing repeatedly, tail light dead.",
            "interval": "Inspect wiring harness sheath around steering neck every 5,000 km.",
            "cost": "₹30 (Fuses) / ₹1,950 (Harness)",
            "difficulty": "Basic DIY",
            "safety": "Never bypass a blown fuse with copper wire strand! A shorted wire can ignite fuel fumes in the battery tray.",
            "diySteps": [
                  "Remove left side battery cover to access fuse holder.",
                  "Check the 15A main fuse and 10A sub-circuits.",
                  "If blown, inspect steering head area for pinched or chafed wires where harness bends.",
                  "Wrap any exposed copper wire with vulcanised self-fusing electrical tape.",
                  "Replace blown fuse with identical rating blade fuse.",
                  "Check frame ground bolt under fuel tank is clean and tight."
            ],
            "tools": [
                  "Fuse Puller",
                  "Spare 10A & 15A Blade Fuses",
                  "Self-Amalgamating Tape",
                  "Multimeter"
            ]
      },
      {
            "id": "chassis-frame",
            "name": "Double-Cradle Down-Tube Diamond Steel Chassis",
            "category": "Chassis",
            "icon": "Shield",
            "image": "/images/parts/main-chassis.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "High-tensile tubular steel double-cradle frame cradles the engine to provide torsional rigidity and sharp cornering.",
            "failures": "Footrest bracket weld cracking, lower down-tube rust from road spray, engine mounting bolt loosening.",
            "symptoms": "Excessive engine vibration transferred directly into handlebars and footpegs, motorcycle weaving on highway.",
            "interval": "Check engine mounting bolt torque (14mm/17mm, 45 Nm) every 5,000 km.",
            "cost": "₹4,800 - ₹6,800",
            "difficulty": "Moderate DIY",
            "safety": "Loose engine mounting bolts will ovalise the aluminium crankcase mounting tabs, causing expensive engine casing damage.",
            "diySteps": [
                  "Place bike on center stand.",
                  "Inspect front engine hanger plates, top cylinder head bracket, and rear crankcase through-bolts.",
                  "Use 14mm and 17mm sockets to check all engine mounting bolts for tightness (torque: 45 Nm).",
                  "Inspect lower cradle tubes for gravel chip rust; sand and coat with matte black anti-corrosion paint.",
                  "Verify pillion footrest subframe welds are crack-free."
            ],
            "tools": [
                  "14mm & 17mm Sockets & Ratchet",
                  "Torque Wrench",
                  "Black Touchup Paint"
            ]
      },
      {
            "id": "stands-footpegs",
            "name": "Aluminium Footpeg Brackets, Center & Side Stand",
            "category": "Chassis",
            "icon": "Shield",
            "image": "/images/parts/stands-footpegs.jpg",
            "imageCredit": "Wikimedia Commons",
            "function": "Die-cast aluminium rearset footrest brackets and tubular steel parking stands with dual return springs.",
            "failures": "Bent side stand allowing bike to lean dangerously low, sheared rider footpeg bracket from a drop, loose pivot pin.",
            "symptoms": "Motorcycle feeling unstable on side stand, center stand rattling against exhaust over bumps.",
            "interval": "Lubricate stand pivot bolts with chassis grease every 5,000 km.",
            "cost": "₹280 (Side stand) / ₹450 (Center stand)",
            "difficulty": "Basic DIY",
            "safety": "Inspect rubber bump stop on center stand. If missing, the metal stand will hammer directly into the exhaust pipe.",
            "diySteps": [
                  "Inspect rubber stop buffer on center stand arm.",
                  "Inspect dual coil springs on center stand for fatigue or missing inner spring.",
                  "Spray pivot pins with penetrant, then grease thoroughly.",
                  "Tighten side stand 14mm pivot bolt and 17mm locknut so stand has minimal sideways wobble.",
                  "Inspect rubber footpeg rubbers: replace if worn smooth to prevent boot slippage in rain."
            ],
            "tools": [
                  "14mm & 17mm Spanners",
                  "Spring Puller",
                  "Waterproof Chassis Grease"
            ]
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
        image: "/images/parts/spark-plug.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Ignites the heavy cylinder fuel charge.",
        failures: "Soot build-up, carbon coating.",
        symptoms: "Starting lag, cold engine stalling, engine heavy thumping but not starting.",
        interval: "Clean every 3,000 km, replace at 10,000 km.",
        cost: "₹180 - ₹250",
        difficulty: "Basic DIY",
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
        image: "/images/parts/engine-oil.jpg",
        imageCredit: "Wikimedia Commons",
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
        diy: "Basic DIY",
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
        image: "/images/parts/spark-plug.jpg",
        imageCredit: "Wikimedia Commons",
        function: "Ignites the twin cylinder combustion chambers synchronized with 270-degree firing order.",
        failures: "Carbon accumulation, gap erosion.",
        symptoms: "Unbalanced twin exhaust note, idle fluctuation, loss of top-end power.",
        interval: "Inspect every 5,000 km, replace at 15,000 km.",
        cost: "₹650 (Pair)",
        difficulty: "Basic DIY",
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
        image: "/images/parts/engine-oil.jpg",
        imageCredit: "Wikimedia Commons",
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
        diy: "Basic DIY",
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
        image: "/images/parts/chain.jpg",
        imageCredit: "Wikimedia Commons / Ralf Roletschek",
        function: "Transfers punchy low-end torque to the 17-inch rear alloy wheel.",
        failures: "Slack enlargement, road grime buildup.",
        symptoms: "Loud chain slap on swingarm rubber pad, snatchy throttle response in 1st/2nd gear.",
        interval: "Clean & lube every 500 km.",
        cost: "₹1,400",
        difficulty: "Basic DIY",
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
        diy: "Basic DIY",
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
