# Enginium — Complete Frontend Audit & Backend Readiness Assessment

> **Audit Scope & Methodology:** Static inspection of the entire Enginium frontend repository (`src/`, `public/`, root configuration files). All observations distinguish strictly between working client-side logic, browser-local persistence, simulated hardware/AI UX, hardcoded/static data, and unmounted or incomplete features. No existing source files were modified and no packages were altered.

---

## 1. Executive Summary

Enginium (`ENGINIUM-1.0.0-MVP` per `src/views/ProfileView.jsx`) is a **pure client-side React 19 + Vite 8 + Three.js 0.185 Single-Page Application (SPA)** designed as a 2-wheeler digital twin, DIY maintenance manual, rule-based symptom triage tool, and acoustic frequency analyzer.

**Current Implementation Reality:**
- **Zero Backend Connectivity:** There are **no** `fetch()`, `axios`, `WebSocket`, GraphQL, REST client, database, auth session, cloud storage, or OBD-II hardware calls anywhere in `src/`.
- **Strong UI & Client Engineering:**
  - Three interactive Three.js WebGL experiences (`EngineSchematic3D`, `BikeBlueprintViewer`, `KineticBackground`) and real browser microphone FFT spectrum capture via Web Audio API (`AudioContext` + `AnalyserNode`).
  - A deterministic, safety-gated rule engine (`src/data/diagnosis.js`) supporting stop conditions, adaptive Yes/No/Not-sure questions, ranked causes capped at `90%`, and deep-linking (`PartInspectionRequest`) straight into the 3D blueprint viewer.
  - A multi-mode viewport architecture (`website`, `flow` Figma canvas, plus an unused `MobileFrame` component for `app` mode).
- **Primary Backend Gaps:**
  - All telemetry metrics (odometer, chain slack readings, brake wear %, battery resting voltage, live HUD calibration), authentication/user profile (`kamanasis@enginium.app`), notification delivery, document vault, and multi-device sync are **hardcoded, simulated, or stored solely in browser `localStorage`**.
  - Vehicle/parts coverage in `src/data/vehicles.js` is heavily skewed: **Hero Splendor Plus** (`41` parts), **Honda Activa 6G** (`34` parts), and **Bajaj Pulsar 150** (`42` parts) are comprehensive, whereas **Royal Enfield Classic 350** (`2` parts), **Continental GT 650** (`2` parts), and **Hunter 350** (`1` part) are stubs.
  - Unused data structures (`vehicle.symptomMap`, `vehicle.emergencyGuides`) and unmounted screens (`CommunityView`, `EngineeringStation`, `ThreeEngineViewer`) exist alongside active modules, creating integration clean-up needs before connecting APIs.

---

## 2. Actual Frontend Architecture

### 2.1 Dependencies & Tooling (`package.json`, `vite.config.js`, `.oxlintrc.json`)
- **Core Runtime Dependencies (`package.json`):**
  - `react` (`^19.2.8`) & `react-dom` (`^19.2.8`)
  - `three` (`^0.185.1`) — procedural 3D engines, 3D blueprint viewer, and ambient drafting backdrop
  - `framer-motion` (`^13.1.1`) — layout transitions, animated sidebar pill (`layoutId`), modal/tab transitions
  - `lucide-react` (`^1.33.0`) — UI icon system
  - `tailwindcss` (`^3.4.17`), `postcss` (`^8.5.26`), `autoprefixer` (`^10.5.4`)
  - `canvas-confetti` (`^1.9.4`) — listed in `package.json` dependencies (available in bundle, not actively imported across core app views)
- **Dev Dependencies:**
  - `vite` (`^8.2.0`), `@vitejs/plugin-react` (`^6.0.4`), `oxlint` (`^1.75.0`), `@reticlehq/react` (`^3.6.0`), `@reticlehq/vite-plugin` (`^3.6.0`), `@types/react` (`^19.2.17`), `@types/react-dom` (`^19.2.3`)
- **Vite Configuration (`vite.config.js`):**
  - Plugins: `reticle()`, `react()`. Note `src/reticle-dev.ts` runs dev-only instrumentation (`import.meta.env.DEV`) with empty `testids`, `signals`, and `stores` (`stores: []` because no external store library like Redux/Zustand is used).
  - Manual Rollup chunk splitting separates `three-vendor`, `react-vendor`, and `icons-vendor`, with `chunkSizeWarningLimit: 600`.
- **Application Entry Points:**
  - `index.html` loads Google Fonts (`Chakra Petch`, `DM Sans`, `JetBrains Mono`) and mounts `/src/main.jsx`.
  - `src/main.jsx` renders `<App />` inside `StrictMode` after importing `./index.css` and `./dark-theme.css`.

### 2.2 Routing, State Management & Component Hierarchy (`src/App.jsx`)
There is **no URL router** (no React Router / History API routing). Navigation is pure React state inside `src/App.jsx`:
- **Active View State:** `activeTab` (`'landing'` default | `'hud'` | `'scanner'` | `'home'` | `'diagnose'` | `'garage'` | `'learn'` | `'acoustic'` | `'profile'`), plus `showSplash` (`false` by default).
- **Viewport Mode State:** `viewMode` (`'website'` default | `'app'` | `'flow'`).
  - `viewMode === 'flow'` renders the horizontal Figma-like canvas (`src/views/DesignBoardView.jsx`) with zoom controls (`60%–120%`) and back button to `'website'`.
  - `viewMode === 'app'` has no UI toggle button in `App.jsx` (`MobileFrame.jsx` is defined but unreferenced in `App.jsx`).
  - When `viewMode !== 'flow'` and `activeTab === 'landing'`, `App.jsx` renders standalone full-bleed `<LandingView />` plus `<EmergencyModal />`.
  - All other tabs render inside the app shell (`app-shell`): `<KineticBackground />`, collapsible desktop sidebar (`app-sidebar`, expanding/collapsing via `sidebarOpen`), sticky `.app-topbar` (active breadcrumb + vehicle switcher dropdown + Help trigger), `<AnimatePresence>` view stage, and mobile bottom dock `<Navbar />`.
- **Global State in `App.jsx` (No Redux/Context Provider; Props Drilling):**
  - `selectedVehicle` (persisted via `localStorage` key `enginium_selected_vehicle_id`, fallback `vehiclesData[0]`)
  - `serviceHistory` (persisted via `localStorage` key `enginium_service_history`)
  - Lifted view states: `showDropdown`, `diagnoseInput`, `messages`, `activeDiagnosis`, `loading`, `activeSegment`, `selectedPart`, `selectedModule`, `showQuizResult`, `quizIndex`, `quizScore`, `selectedAnswer`, `inspectionRequest`, `showMilestoneForm`, `emergencyMode`.

### 2.3 CSS Architecture & Styling Conventions
Mixed utility + modular semantic CSS layers:
- `src/index.css`: Tailwind directives (`@tailwind base/components/utilities`), CSS custom properties (`--font-display`, `--font-sans`, `--font-mono`, `--en-*`), shared UI primitives (`.ui-btn`, `.ui-card`, `.ui-tag-*`, `.ui-input`, `.ui-empty`), `.app-shell`, `.app-sidebar` (collapsed rail + expanded drawer pills), `.app-topbar`.
- `src/dark-theme.css`: Dark-mode theme overrides applied globally across workspace views.
- `src/views/LandingView.css`: Dedicated styling for floating dynamic-island header, hero gradient typography, cockpit card, system grid, comparison table, and footer.
- `src/views/WorkspaceViews.css` & `src/views/ToolViews.css`: Workspace & tool layout styles (`HomeView`, `HudDiagnosticsView`, `GarageView`, `DiagnoseView`, `LearnView`, `AcousticView`, `ProfileView`, `CommunityView`).
- `src/viewer/bikeBlueprint.css`: Self-contained viewer styles (no Tailwind dependency) supporting HUD, markers, bottom bar controls, render mode pills, explode slider, and native Fullscreen enlargement.
- `src/App.css`: Residual Vite starter stylesheet (`Hero`, `.counter`) unused by the main workspace.

---

## 3. Complete Feature-by-Feature Audit

| # | Feature / Screen | Source Files | What It Actually Does | User Interactions | Data Consumed / Generated | Status | Requires Backend? | Key Limitations |
|---|---|---|---|---|---|---|---|---|
| 1 | **Landing Page** | `src/views/LandingView.jsx`, `LandingView.css`, `EngineSchematic3D.jsx` | Full-bleed marketing & interactive showcase: top pill nav, hero with vehicle quick-switcher (`4` bikes), live SOHC 3D engine cutaway, 4-tab Feature Cockpit (HUD preview, simulated FFT frequency slider `60–600 Hz`, hardcoded `symptomDemos`, 8-part gallery strip), Systems grid, Comparison table, Footer. | Switch vehicle (`slice(0,4)`), switch feature tabs, drag audio slider, click demo symptom chips, click CTAs to jump into workspace tabs. | Consumes `vehiclesData` & hardcoded `symptomDemos` / `systemsShowcase`. Generates no persistent data (`cockpitRpm`, `engineStrokePhase` are transient). | **Working UI / Simulated Previews** | Optional (CMS/catalogue sync) | `FEATURE 04` & nav labels hardcode `"41 Parts"` regardless of selected vehicle; only first 4 of 6 vehicles shown in hero selector. |
| 2 | **Inspect Vehicle / HUD Diagnostics** | `src/views/HudDiagnosticsView.jsx`, `WorkspaceViews.css`, `/public/hud_motorcycle_wireframe.jpg` | Displays vehicle-tailored hotspot pins (`engine`, `brakes`, `controls`, `spark`, `chain/transmission`) over static wireframe image + SVG crosshairs, subsystem health list, and "Ask the service guide" CTA. | Click numbered hotspots or subsystem cards; click `"Scan telemetry"` (1.6s `setTimeout` animation); click `"Ask the service guide"`. | Reads `selectedVehicle` (`id`, `type`, `specs`). Generates pre-filled text prompt pushed to `DiagnoseView`. | **Simulated Telemetry / Static Map** | **Yes** (real telemetry/OBD/condition state) | Uses a single static image (`/hud_motorcycle_wireframe.jpg`) for scooters & motorcycles; `isCruiser` checks wrong IDs (`gt650`/`hunter350` vs `continental-gt-650`/`hunter-350`), misclassifying GT 650 and Hunter 350; all metrics ("34 mm measured", "12% wear", "Review soon") are hardcoded. |
| 3 | **Scanner** | `src/views/ScannerView.jsx` | Thin 6-line wrapper delegating directly to `<HudDiagnosticsView {...props} />`. `App.jsx` aliases `case 'scanner'` to `HudDiagnosticsView`. | Same as Inspect Vehicle / HUD Diagnostics. | Same as HUD. | **Alias / Legacy Route** | Same as HUD | No camera, barcode/VIN, or AR scanning exists despite the name `"Scanner"`. |
| 4 | **Overview Dashboard** | `src/views/HomeView.jsx`, `WorkspaceViews.css` | Displays 4 KPI cards, Active Profile spec panel, static wireframe card, Next Check service preview, 4 Quick Launch buttons, and SOS card. | Navigate to `hud`, `diagnose`, `learn`, `acoustic`, `garage`, or trigger Emergency SOS modal. | Reads `selectedVehicle`, `serviceHistory[0]`, and hardcoded odometer map (`splendor: 42,850 km`, `activa: 18,210 km`, `pulsar: 28,900 km`, `classic350: 14,620 km`, default `24,500 km`). | **Partially Functional / Hardcoded KPIs** | **Yes** (real odometer & maintenance reminders) | Odometer & `"Review soon"` maintenance alerts are hardcoded/fallback values; GT 650 & Hunter 350 fall through to `"24,500 km"`. |
| 5 | **Service Guide / Diagnosis** | `src/views/DiagnoseView.jsx`, `src/data/diagnosis.js`, `ToolViews.css` | Rule-based chat-style triage UI. Checks `STOP_RULES` first, matches 6 `FAMILIES` via regex keywords, walks user through Yes/No/Not-sure questions, ranks up to `3` vehicle parts (`90%` cap), shows DIY steps/tools/safety, deep-links into 3D viewer, saves check to local history. | Type free-text symptom or click quick prompts; answer questions; click `"Locate ... in 3D"`; click `"Add check to Digital Garage"`. | Consumes `selectedVehicle.parts`, `diagnosis.js` rules. Generates transient `messages`, `activeDiagnosis`, `PartInspectionRequest`, and appends record to `serviceHistory` (`localStorage`). | **Fully Functional (Deterministic Client Logic)** | **Yes** (diagnosis history, AI/LLM fallback, centralized rules) | Only understands 6 symptom families; unknown inputs hit static fallback text; `"Photo, audio and document attachments are unavailable"`; conversation resets on reload (`messages`/`activeDiagnosis` not persisted). |
| 6 | **Learn / Parts Explorer** | `src/views/LearnView.jsx`, `src/data/bikeParts.js`, `src/data/vehicles.js`, `ToolViews.css` | Searchable & filterable part index (`CAD Assembly Tree` or `3D Blueprint` on left; reference photo/schematic fallback, failures, symptoms, interval, safety, DIY steps, tools, ₹ cost on right). Receives `inspectionRequest` deep-link from Diagnosis. | Search by name/symptom/tool/failure, filter by category pills, click quick chips, switch between `3D Blueprint` & `CAD Assembly Tree`, click part nodes. | Consumes `selectedVehicle.parts`, `VEHICLE_PART_TO_3D` / `D3_TO_VEHICLE_PARTS`, and `/public/images/parts/*`. Generates `selectedPart` UI state. | **Fully Functional (Static Catalogue)** | **Yes** (CMS for vehicle/part catalogue & media CDN) | Category bar lacks `Chassis` tab even though `vehicles.js` has `Chassis` parts; RE Classic 350 (`2`), GT 650 (`2`), Hunter 350 (`1`) parts lack `category` & full catalog coverage. |
| 7 | **3D Bike Blueprint Viewer** | `src/components/BikeBlueprintViewer.jsx`, `src/viewer/bikeScene.js`, `src/viewer/bikeGeometry.js`, `src/viewer/bikeBlueprint.css`, `src/data/bikeParts.js` | Persistent WebGL Three.js interactive 3D viewer (`33` selectable parts + chassis details). Supports **Holo** (translucent cutaway shells + rim lighting + CAD lines), **CAD** (wireframe edges), and **X-Ray** (highlights engine internals) modes; platform profiles (`commuter`, `cruiser`, `scooter`); explode via zoom OR HUD slider/toggle + tether lines; hover readouts; numbered diagnostic markers; native fullscreen mode. | Drag to orbit, scroll/pinch or use `+`/`-`, drag Explode slider or toggle Explode button, switch `Holo`/`CAD`/`X-Ray`, hover/tap 3D meshes, fullscreen `Enlarge` / `Esc`. | Consumes `selectedPartId`, `markerPartIds`, `partNames`, `vehicleId`, `vehicleType`, `vehicleName`, `BIKE_PARTS`, `BIKE_SPEC`. Fires `onSelectPart(id)`. | **Fully Functional (Procedural Stylized CAD)** | Optional (real manufacturer `.glb`/`.gltf` model & part metadata delivery) | Procedural stylized geometry (`PARAMETRIC CAD`), not true manufacturer CAD (`BIKE_SPEC` dimensions displayed are still Splendor+ `1236 / 785 / 165 mm`); 150+ real vehicle variations require backend GLB/metadata assets. |
| 8 | **Learning Modules** | `src/views/LearnView.jsx` (`MODULES`, `renderEducation`) | Two static educational modules (`Engine basics (4-stroke)` with 2 questions, `Brake systems & fluids` with 1 question) inside `Learn` -> `"Guides & quizzes"`. | Select module, pick MCQ answers, submit quiz, view score, retry quiz. | Hardcoded `MODULES` array (`progress: 78` and `15` hardcoded). Generates transient `quizIndex`, `quizScore`, `selectedAnswer`. | **Partially Functional / Static Content** | **Yes** (module CMS, persistent user scores & completion %) | Progress bars (`78%`, `15%`) are frozen constants and do not update when completing quizzes; results disappear on refresh/switch. |
| 9 | **Sound Profile / Acoustic Analyzer** | `src/views/AcousticView.jsx`, `ToolViews.css` | Dual-mode 6-second sound analyzer: **Live Microphone (FFT)** uses real Web Audio API (`getUserMedia`, `AudioContext`, `createAnalyser` `fftSize=256`) to animate 32 frequency bars and classify dominant peak frequency into 3 bands (`>=1900 Hz`, `>=750 Hz`, `<750 Hz`); **Demo Samples** simulates 6s progress and shows hardcoded `SAMPLE_RESULTS`. | Switch `Live Mic` vs `Demo Samples`, start/stop 6s scan, play sample patterns (`isPlayingDemo` progress bar only—no actual synthesized audio output), escalate to `DiagnoseView`. | Live mode captures transient mic `Uint8Array` FFT bins in memory (`recordedPeaksRef`); nothing recorded/encoded/saved to disk or server. Demo mode reads `SAMPLE_RESULTS` & `PROFILE_OPTIONS`. | **Live Mic FFT Functional / Demo Samples Simulated** | **Yes** (audio sample storage, ML/acoustic model, vehicle-specific acoustic baselines) | Selecting demo sample patterns (`Play sample`) animates progress % without generating real sound (`Web Audio` oscillator/audio files missing in Demo mode); live classification uses naive single-peak average (`avgHz`) thresholds identical for all 6 vehicles. |
| 10 | **Garage** | `src/views/GarageView.jsx`, `WorkspaceViews.css` | Displays built-in fleet + user-added custom vehicles (`All`/`Motorcycle`/`Scooter`/`Car` filters), active profile tabs (`overview`, `timeline` milestones, `documents` placeholder), `"Add vehicle"` `<dialog>`, milestone logger, and chronological `"Service log"`. | Filter fleet, switch active profile, create custom vehicle, add milestone, add service log entry (title, work, optional INR cost). | Reads `vehiclesData`, `selectedVehicle`, `serviceHistory`. Reads/writes `localStorage` keys `enginium_custom_vehicles` and `enginium_service_history`. | **Partially Functional (`localStorage` + In-Memory)** | **Yes** (persistent user garage, service records, file/document upload) | **Milestones (`handleAddMilestone`) mutate React state only (`setSelectedVehicle`) and are NOT saved to `localStorage`** — lost on refresh or vehicle switch! Custom vehicles lack `parts`/`specs`, breaking full compatibility if ever selected (Note: UI omits `"Use this profile"` or breaks `GarageView` expectations? Actually `"Use this profile"` IS rendered on custom vehicles if `!isActive`, which would switch `selectedVehicle` to an object with `parts: undefined`, risking runtime crashes in `LearnView`/`DiagnoseView`!). `documents` tab is pure placeholder UI. |
| 11 | **Settings / Profile** | `src/views/ProfileView.jsx`, `ToolViews.css` | Preview screen for identity card (`Kamanasis`, `kamanasis@enginium.app`), roadside shortcut, local unit/language/notification toggles, and availability table. | Toggle `Metric`/`Imperial`, select language (`English`/`Hindi`/`Bengali`), toggle reminders, open SOS modal, click `tel:1033`. | Reads/writes `localStorage`: `enginium_pref_units`, `enginium_pref_language`, `enginium_pref_notifications`. | **Simulated UI Preview** | **Yes** (Auth, user profile, multi-language i18n, push/email reminders) | Units/language/notification settings do **not** convert units, translate strings, or schedule notifications anywhere else in the app. `"Location sharing unavailable"` button is permanently `disabled`. |
| 12 | **Emergency SOS** | `src/App.jsx` (`renderEmergencyModal`) | Full-screen backdrop modal displaying static checklists for `1. Engine Stall & Won't Start` and `2. Flat Tyre / Puncture`, plus `tel:1033` & `tel:112` hotline links. | Open via sidebar/topbar/Profile/Home; press `Esc` or Close; tap phone links. | Uses hardcoded JSX checklist strings inside `App.jsx` (`renderEmergencyModal`). Does **not** read `selectedVehicle.emergencyGuides`. | **Working UI / Static Checklist** | Optional (roadside API / live GPS sharing) | Ignores vehicle-specific `emergencyGuides` from `vehicles.js` (e.g., scooter vs motorcycle steps). |
| 13 | **CommunityView** | `src/views/CommunityView.jsx`, `ToolViews.css` | Local garage stories feed with starter posts, room switcher (`Splendor owners`, `Activa maintenance`, `Enthusiast zone`), new tip composer (title, story, optional ₹ cost saved), and like toggles. | Switch room label, create local post, toggle likes on posts. | Hardcoded `STARTER_POSTS`; reads/writes `localStorage` keys `enginium_community_posts` and `enginium_liked_posts`. | **Unmounted / `localStorage` Demo** | **Yes** (multi-user feed, comments, auth, moderation) | **Currently NOT mounted in `App.jsx` routing or sidebar.** Room filter only updates label text without filtering posts; comments (`post.commentsCount`) are static numbers with no comment UI. |
| 14 | **Legacy / Standalone Components** | `DesignBoardView.jsx`, `EngineeringStation.jsx`, `ThreeEngineViewer.jsx`, `EngineBlueprintAnimation.jsx`, `MobileFrame.jsx` | `DesignBoardView`: Mounted via `viewMode === 'flow'`, previews 10 miniature screens + 2 animated 2D engine HUDs. `EngineeringStation` & `ThreeEngineViewer`: Unused standalone 2D+3D engine inspection widget. `EngineBlueprintAnimation`: 2D canvas crank/piston loop used in `DesignBoardView`, `App.jsx` unused splash, and `EngineSchematic3D` WebGL fallback. `MobileFrame`: Unused mobile bezel component. | `DesignBoardView` supports zoom controls and clicking `Open` to jump into `website` mode screens. | `DesignBoardView` reads `vehiclesData` and `selectedVehicle.symptomMap['chain-noise']`. | **Mixed (Flow board active; Station/Frame unmounted)** | No (except flow preview reflects underlying views) | `EngineeringStation`, `ThreeEngineViewer`, and `MobileFrame` add bundle/maintenance surface without active routes; `App.jsx` `showSplash` is hardcoded `false`. |

---

## 4. Existing Data and Storage Audit

### 4.1 Browser Storage Mechanisms (`localStorage` Only)
Search across `src/` confirms: **zero** uses of `sessionStorage`, `IndexedDB`, `CacheStorage`, cookies, WebSockets, or HTTP API requests (`fetch`/`axios`). Everything persistent runs on browser `localStorage`:

| `localStorage` Key | Files Reading / Writing | Exact Data Structure | User-Specific? | Survives Refresh? | Cross-Device Shareable? |
|---|---|---|---|---|---|
| `enginium_selected_vehicle_id` | `src/App.jsx` (lines 51, 120) | String ID, e.g. `"splendor"`, `"activa"`, `"pulsar"` | Per browser | Yes | No |
| `enginium_service_history` | `src/App.jsx` (lines 107, 129), appended via `GarageView.jsx` & `DiagnoseView.jsx` | Array of `{ id: number, title: string, desc: string, date: string ('YYYY-MM-DD') }` | Per browser (global across all bikes — **not keyed by `vehicleId`!**) | Yes | No |
| `enginium_custom_vehicles` | `src/views/GarageView.jsx` (lines 59, 69) | Array of `{ id: "session-<timestamp>", source: "session", name: string, model: string, type: "Motorcycle"\|"Scooter"\|"Car", engine: string, mileage: string, lastService?: string }` | Per browser | Yes | No |
| `enginium_pref_units` | `src/views/ProfileView.jsx` (lines 8, 33) | `"metric"` \| `"imperial"` | Per browser | Yes | No |
| `enginium_pref_language` | `src/views/ProfileView.jsx` (lines 16, 34) | `"english"` \| `"hindi"` \| `"bengali"` | Per browser | Yes | No |
| `enginium_pref_notifications` | `src/views/ProfileView.jsx` (lines 24, 35) | Boolean (`true` / `false` JSON stringified) | Per browser | Yes | No |
| `enginium_community_posts` *(unmounted screen)* | `src/views/CommunityView.jsx` (lines 42, 62) | Array of `{ id: number, author: string, avatar: string, vehicle: string, time: string, title: string, content: string, likes: number, costSaved: string ('₹...'), commentsCount: number }` | Per browser | Yes | No |
| `enginium_liked_posts` *(unmounted screen)* | `src/views/CommunityView.jsx` (lines 52, 70) | Array of numeric post IDs (`Set` serialized via `Array.from`) | Per browser | Yes | No |

### 4.2 Ephemeral Browser State & Hardcoded Data Catalogues
- **Ephemeral React State Only (Lost on Refresh):**
  - `DiagnoseView` conversation `messages`, `answersLog`, `diagnosticQuestions`, and `activeDiagnosis`.
  - Newly added **Legacy Milestones** (`handleAddMilestone` in `App.jsx` updates `selectedVehicle` state in memory only, so refreshing reverts to static `vehiclesData` milestones).
  - Quiz score (`quizScore`, `quizIndex`) and module completion % (hardcoded `78` / `15` in `LearnView.jsx`).
  - `AcousticView` `recordedPeaksRef` and `analyzedResult`.
  - `HudDiagnosticsView` `selectedHotspot` and calibration message.
- **Static JS Catalogues:**
  - `src/data/vehicles.js` (`3,645` lines)
  - `src/data/bikeParts.js` (`312` lines)
  - `src/data/diagnosis.js` (`280` lines)
- **External Network Requests:** Only passive Google Fonts CSS stylesheet requests in `index.html` and outbound `<a href>` links in `LandingView.jsx` footer (`github.com/kamanasis/Enginium`, `commons.wikimedia.org`). No file uploads (`<input type="file">`, `FileReader`) exist.

---

## 5. Vehicle Catalogue and Component Taxonomy (`src/data/vehicles.js` & `public/images/parts/`)

### 5.1 Supported Vehicles & Completeness Gap
`vehiclesData` in `src/data/vehicles.js` defines **6 vehicles**:

| Vehicle ID | Display Name | Type | Engine & Power | Stored `specs` | Parts Count | Milestones | Parts with Image / Category Coverage |
|---|---|---|---|---|---|---|---|
| `splendor` | Hero Splendor Plus | `Motorcycle` | `97.2cc, Air-cooled, Single Cylinder` · `8.02 PS @ 8000 rpm` | `10W-30 MA2`, `0.9 Litres`, `0.7 mm`, `25 psi`, `32 psi (Solo) / 36 psi (Pillion)` | **41** | 2 | `41/41` images, full DIY steps & categories |
| `activa` | Honda Activa 6G | `Scooter` | `109.5cc, Fan-cooled, 4-stroke, ESP Engine` · `7.79 PS @ 8000 rpm` | `10W-30 MB (Scooter Spec)`, `0.8 Litres`, `0.8 mm`, `22 psi`, `29 psi (Solo) / 36 psi (Pillion)` | **34** | 1 | `34/34` images, full DIY steps & categories |
| `pulsar` | Bajaj Pulsar 150 | `Motorcycle` | `149.5cc, DTS-i Twin Spark, Air-cooled` · `14 PS @ 8500 rpm` | `20W-50 MA2`, `1.15 Litres`, `0.7 - 0.8 mm`, `28 psi`, `32 psi (Solo) / 38 psi (Pillion)` | **42** | 1 | `42/42` images, full DIY steps & categories |
| `classic350` | Royal Enfield Classic 350 | `Motorcycle` | `349cc, J-Series Single Cylinder, Air-Oil Cooled` · `20.2 BHP @ 6100 rpm` | `15W-50 API SL (Semi Synthetic)`, `1.9 Litres`, `0.8 mm`, `22 psi`, `32 psi` | **2** *(Stub)* | 1 | `2/2` images; **`category` is `undefined`** on both parts |
| `continental-gt-650` | Royal Enfield Continental GT 650 | `Motorcycle` | `648cc, Parallel-Twin, 4-Stroke, SOHC, Air/Oil-Cooled, 270° Crank` · `47.0 BHP @ 7250 rpm` | `10W-50 Fully Synthetic (JASO MA2)`, `3.1 Litres`, `0.7 - 0.8 mm (Twin NGK CR8E)`, `32 psi`, `36 psi / 39 psi` | **2** *(Stub)* | 2 | `2/2` images; **`category` is `undefined`** on both parts |
| `hunter-350` | Royal Enfield Hunter 350 | `Motorcycle` | `349cc, Single Cylinder, 4-Stroke, Air-Oil Cooled J-Series` · `20.2 BHP @ 6100 rpm` | `15W-50 Semi-Synthetic`, `1.9 Litres`, `0.8 mm`, `29 psi`, `32 psi (Solo) / 36 psi (Pillion)` | **1** *(Stub)* | 1 | `1/1` image; **`category` is `undefined`** |

### 5.2 Taxonomy, Part IDs & 3D Mapping
- **Selection & Persistence:** Active vehicle is held in `App.jsx` state (`selectedVehicle`) and persisted by ID in `enginium_selected_vehicle_id`. Switchable from `App.jsx` topbar dropdown, `GarageView` fleet cards, and `LandingView` hero strip.
- **Type Distinction:** `vehicle.type` (`"Motorcycle"` vs `"Scooter"`) and `vehicle.id` govern behavior in `HomeView`, `HudDiagnosticsView`, `EngineSchematic3D`, and `BikeBlueprintViewer`. **Note critical ID mismatch bug in `HudDiagnosticsView.jsx:20`**: checks `'gt650'` and `'hunter350'` instead of `'continental-gt-650'` and `'hunter-350'`.
- **Part ID Scope & Multi-Vehicle Overrides:**
  - Across all 6 vehicles there are **68 unique `part.id` strings**.
  - Core IDs are **canonical across vehicles** (e.g., `spark-plug` exists in 5 vehicles with completely different `name`, `cost`, `diySteps`, and `interval` values—e.g. Hero Splendor `"Spark Plug"` vs Bajaj Pulsar `"Twin Spark Plugs (DTS-i System)"` vs GT 650 `"Twin NGK Spark Plugs"`). Platform-unique parts use distinct IDs (`v-belt`, `centrifugal-clutch`, `variator-rollers`, `acg-starter` on Activa 6G).
- **Vehicle → Subsystem → Component Relationship:**
  1. `LearnView` defines 5 `CAD_ASSEMBLIES` groups (`Engine & Combustion Core`, `Transmission & Drive`, `Fuel, Intake & Exhaust`, `Electrical & Ignition Circuit`, `Chassis, Brakes & Suspension`) mapped via `part.category` (`Engine`, `Transmission`, `Fuel & Exhaust`, `Electrical`, `Brakes`, `Suspension`, `Wheels`, `Chassis`).
  2. `src/data/bikeParts.js` defines **`33` selectable 3D blueprint node IDs** (out of 39 entries in `BIKE_PARTS`, 6 have `selectable: false`) grouped into 5 subsystem groups (`chassis`, `fuel`, `engine`, `electrical`, `wheels`, `drive`).
  3. `VEHICLE_PART_TO_3D` and `D3_TO_VEHICLE_PARTS` act as a many-to-many bridge translating 68 catalogue IDs onto the 33 interactive 3D wireframe nodes (for example, both `'v-belt'` and `'chain'` map to 3D node `'chain'`; `'piston-rings'` and `'engine-oil'` highlight `'cylinder-block'`), while `getVehicleBlueprintNames()` overrides node labels with the active vehicle's authentic part names.
- **Image & Static Assets:**
  - `public/images/parts/` contains **42 photographic assets** (`39` `.jpg`, `2` `.png`, `1` `.JPG` — note uppercase extensions `crankshaft.JPG`, `front-tyre.JPG`). Verified zero missing file paths referenced by `vehicles.js`. `PartImagePreview` in `LearnView.jsx` renders an automatic retry once (`?retry=1`) and falls back to a styled CSS CAD schematic badge if an image fails to load.
  - Note: `public/hud_motorcycle_wireframe.jpg` is shared across HUD & Overview hero previews for every vehicle.

---

## 6. Diagnostic Engine (`src/data/diagnosis.js` & `DiagnoseView.jsx`)

### 6.1 Rule Architecture & Execution Flow
`src/data/diagnosis.js` implements a transparent, non-LLM deterministic scoring tree:
1. **Emergency `STOP_RULES` (Checked First via Regex):**
   - `fuel-leak` (`fuel/petrol/gas` + `leak/dripping/smell`) -> Immediate stop warning, zero parts/DIY steps.
   - `smoke-fire` (`on fire/fire/flames/smoking/thick smoke`) -> Immediate stop + emergency services warning.
   - `brake-failure` (`no brakes/brakes fail/lost brakes/spongy/weak`) -> Do not ride warning.
   - Stop conditions return `buildStopResult(stop)` (`confidenceList: []`, no `inspectionRequest`, no 3D locate action).
2. **6 Supported Symptom `FAMILIES`:**
   - `hard-start` (*Starting trouble*) — 6 base parts, 3 questions (`cranks`, `cold`, `fuel`)
   - `poor-pickup` (*Poor pickup or misfire*) — 4 base parts, 3 questions (`load`, `filter`, `plug`)
   - `rattle` (*Metallic rattle or tapping*) — 4 base parts, 3 questions (`revs`, `cold`, `exhaust`)
   - `clutch` (*Clutch or gear shifting*) — 3 base parts, 3 questions (`lever`, `slip`, `jump`)
   - `brakes` (*Braking concern*, `safetyCritical: true`) — 4 base parts, 2 questions (`travel`, `noise`)
   - `electrical` (*Lights or electrical*) — 5 base parts, 2 questions (`revs`, `bumps`)
3. **Classification & Question Handling (`classifySymptom`, `DiagnoseView`):**
   - Counts `\b${keyword}` regex hits across `FAMILIES`; highest hit count wins (`unknown` returns static `UNKNOWN_SYMPTOM_HELP`).
   - Steps sequentially through `family.questions` accepting `Yes` (`true`), `No` (`false`), or `Not sure` (`null` — zero delta).
4. **Candidate Ranking & `90%` Cap (`rankCauses`):**
   - Filters `Object.keys(family.base)` strictly against `vehicle.parts` IDs so unavailable parts (e.g., `carburetor` or `chain` on scooters, or missing parts on stub Royal Enfield bikes) are excluded cleanly.
   - Accumulates `score` from `base` + question deltas (`yes`/`no`), floored at `0`.
   - Computes theoretical ceiling `max = base + sum(max(0, yes, no))`, normalizes by `ceiling = max(1, ...max)`, and clamps match ratio to **`MATCH_CAP = 0.9` (90%)** (`Math.min(0.9, score / ceiling)`).
   - Filters `score > 0`, sorts descending, slices top **`MAX_CAUSES = 3`**.
5. **Result Structure, Saving & 3D / HUD Integration:**
   - `buildDiagnosis()` outputs `{ familyLabel, cause, confidenceList[], difficulty, partCost, canDrive, warning, diySteps[], tools[], inspectionRequest }`. Note `safetyCritical` families override DIY steps & tools to `"Professional inspection recommended"` while still allowing `"Locate in 3D"`.
   - `"Add check to Digital Garage"` calls `onAddServiceRecord` -> writes to `enginium_service_history`.
   - `"Locate in 3D"` invokes `App.jsx` `handleInspectPart(inspectionRequest)` -> checks `request.vehicleId === selectedVehicle.id`, sets `selectedPart`, `activeSegment = 'parts'`, stores `inspectionRequest`, switches `activeTab` to `'learn'`. `LearnView` resolves IDs through `resolveBlueprintPartId` into `BikeBlueprintViewer`'s `markerPartIds` (primary blinking circle `1`, related `2`, `3`).
   - **HUD → Diagnose Communication:** Clicking `"Ask the service guide"` in `HudDiagnosticsView` sets `diagnoseInput` in `App.jsx` and switches `activeTab` to `'diagnose'`. `DiagnoseView` auto-submits incoming `diagnoseInput` text on mount (`useEffect`), which then passes through `classifySymptom`.

### 6.2 Decoupling into a Backend Service
- **Directly Movable to Backend:** `STOP_RULES`, `FAMILIES` rules/weights/translations, `classifySymptom()`, `rankCauses()`, `buildDiagnosis()`, `buildStopResult()`, plus persistence of diagnostic chat sessions & outcomes (`messages` + `answersLog` + `inspectionRequest`)—all without altering the frontend `PartInspectionRequest` or `activeDiagnosis` render contract (`DiagnoseView` simply fetches questions & final diagnosis JSON rather than calling local synchronous helpers with `500–600ms` simulated `setTimeout`s).

---

## 7. 3D & Engineering Systems Audit

| Component / File | Status | Format / Engine | Selection & Highlighting | Camera & Animation | Part Metadata Linked? | Fallbacks |
|---|---|---|---|---|---|---|
| `src/components/BikeBlueprintViewer.jsx` + `src/viewer/bikeScene.js` + `src/viewer/bikeGeometry.js` | **Active / Mounted** (`LearnView.jsx` lazy import) | Procedural Three.js geometry (`LatheGeometry`, `TubeGeometry`, `TorusGeometry`, `CylinderGeometry`, `BoxGeometry`, `EdgesGeometry`) across `3` platform silhouettes (`commuter`, `cruiser`, `scooter`) and `3` modes (`Holo`, `CAD`, `X-Ray`). | **Full 33-part interactive picking:** raycaster (`Line.threshold = 0.14`) + compact invisible `BoxGeometry` interior proxies + 8-point fuzzy offset sampling; active/hovered emissive color + pulsing markers (`1`, `2`, `3`). | `OrbitControls` (damped, no pan), auto-rotate when idle, smooth tween zoom, zoom-to-explode OR explicit HUD Explode slider (`0–100%`) with tether leader lines & scan ring. | **Yes:** bidirectional ID resolution via `bikeParts.js` (`VEHICLE_PART_TO_3D` / `D3_TO_VEHICLE_PARTS`) + per-part `placement` confidence (`manual`, `inferred`, `approximate`) and source notes. | Checks `WebGLRenderer` failure (`data-unavailable="true"` shows fallback text notice); respects `prefers-reduced-motion`. |
| `src/components/EngineSchematic3D.jsx` | **Active / Mounted** (`LandingView.jsx` hero) | Procedural Three.js shaded SOHC 4-stroke engine cutaway (crankshaft webs, I-beam conrod, stepped piston & rings, valves, rockers, stator coils, wet clutch, spark plug + dynamic volumetric combustion glow). Adapts fin count (`4` vs `7`) via `vehicleType`. | Not clickable per-part; showcases real-time 4-stroke cycle and emits `onPhaseChange` (`INTAKE / COMPRESSION / POWER / EXHAUST`). | Orbit drag + zoom controls, speed synced to `rpm` prop (`1450`). | No part click metadata; reads `vehicleType` and `rpm`. | Catches WebGL errors (`webglUnavailable` state) and swaps in `<EngineBlueprintAnimation />` 2D canvas. |
| `src/components/EngineBlueprintAnimation.jsx` | **Active (Sub-view / Fallback)** (`DesignBoardView.jsx` & `EngineSchematic3D` fallback) | HTML5 2D `<canvas>` crank-slider wireframe loop. | None. | Continuous trigonometric piston/crank rotation. | None. | 2D Canvas supported natively. |
| `src/components/KineticBackground.jsx` (via `EngineeringBackdrop.jsx`) | **Active / Mounted** (`App.jsx` shell, `DesignBoardView.jsx`, `LandingView.jsx`) | Procedural Three.js dark drafting grid & chrome/crimson telemetry backdrop. | None (`pointer-events` ambient). | Continuous ambient camera/scene motion. | None. | No explicit WebGL try/catch fallback in `KineticBackground.jsx`! *(Risk on headless/disabled-WebGL browsers.)* |
| `src/components/EngineeringStation.jsx` & `ThreeEngineViewer.jsx` | **Unmounted / Legacy** | 2D blueprint `<canvas>` + standalone primitive Three.js engine viewer (`box/cylinder` basic meshes). | `ThreeEngineViewer` has basic group selection (`selectedPartId`). | Slow orbital spin / RPM crank speed. | Hardcoded IDs (`spark-plug`). | Sets `dataset.webglUnavailable`. |

**What the Backend Needs to Provide for the 3D Viewer:**
1. **Per-Vehicle Model Manifest:** Reference to real `.glb`/`.gltf` asset URL (or procedural silhouette config `vehicleProfile` + accurate `BIKE_SPEC` dimensions like `wheelbaseMm`, `seatHeightMm`, `groundClearanceMm`, `casterDeg`, `engineCc`, `boreStrokeMm`).
2. **Mesh-to-Part Mapping & Explode Vectors:** JSON mapping `{ meshNodeName / partId, subsystemGroup, explodeOffset: [x,y,z], explodeStart: 0..1, placementConfidence, manualSourceCitation }`.
3. **Variant-Aware Part Catalog:** Filtered list of component metadata tied to that exact bike's model year & trim (carb vs FI, drum vs disc, single vs parallel-twin).

---

## 8. Sound Profile & HUD Audit

### 8.1 Acoustic Analyzer (`src/views/AcousticView.jsx`)
- **Live Microphone Data (Actual Hardware):**
  - Uses `navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })`.
  - Connects `MediaStreamSource` to Web Audio `AnalyserNode` (`fftSize = 256`, yielding `frequencyBinCount = 128` FFT bins, `smoothingTimeConstant = 0.8`).
  - Samples via `requestAnimationFrame` over 6 seconds (`6000 ms`): maps bins onto 32 bars, computes `peakHz = (maxIndex / bufferLength) * (sampleRate / 2)` and `approxDb` RMS log approximation (`38–105` clamped).
  - **Storage / Transmission:** **None.** Raw PCM/audio blobs are never recorded (`MediaRecorder` is unused); only transient `{ hz, db }` frame peak objects live in `recordedPeaksRef` during the 6s scan and are averaged upon completion (`avgHz >= 1900` = tappet chatter, `>= 750` = chain/drive vibration, `< 750` = normal idle).
  - Handles `denied` and `unsupported` WebAudio gracefully by switching cleanly to `'synth'` mode with alert banner.
- **Synthetic Demo Data:**
  - `PROFILE_OPTIONS` & `SAMPLE_RESULTS` are hardcoded constants (`tappet`, `chain`, `normal`).
  - `"Play sample"` updates a percentage timer (`demoProgress` `0->100%`) and animates bars via CSS, **without producing audible sound**.
- **Future Hardware / ML Needs:** Real engine-RPM correlation (RPM sensor / tachometer pulse or harmonic order tracking), vehicle-calibrated fault signatures (a 648cc 270° twin GT 650 vs 110cc CVT Activa have completely different acoustic baselines), optional audio clip upload for remote mechanic or ML classification.

### 8.2 HUD & Scanner (`src/views/HudDiagnosticsView.jsx`, `ScannerView.jsx`)
- **What is Calculated / Dynamic vs Hardcoded:**
  - Switches dynamically across 3 config branches (`Scooter`, `Cruiser`, `Standard Motorcycle`) based on `vehicle.type` & `vehicle.id`.
  - Injects `vehicle.specs.oilType`, `oilCapacity`, `sparkPlugGap`, `tirePressureFront`, `tirePressureRear` dynamically where present.
  - **Hardcoded / Fictional Readings:** Status badges (`"Looks good"`, `"Review soon"`), chain slack (`"34 mm measured"`, `"32 mm measured"`), brake wear (`"12% normal wear"`), battery voltages (`"12.6 V"` / `"12.8 V"`), cooling shroud/radiator status, and `"Scanning telemetry..."` 1.6s timeout are **all static simulation data**.
- **OBD-II / Hardware Status:** **Zero** Bluetooth WebBLE, WebSerial, USB, or ELM327/CAN-bus communication exists (`ProfileView` explicitly confirms: `"OBD-II connection: Not connected"`). Needs native/bridge telemetry ingestion or OBD-II Bluetooth gateway for real live metrics.

---

## 9. Authentication & User Management Readiness

Inspecting the entire repository confirms **complete absence** of authentication and user management:
- **Missing Capabilities:** No login/registration routes or forms, no OAuth/OTP/password providers, no JWT/cookie/session handling, no role/permission guards (`admin` vs `rider` vs `mechanic`), no password reset or email/phone verification, no multi-tenant isolation.
- **Hardcoded Mock Identity:** `ProfileView.jsx` line 56 displays static demo identity: `"Kamanasis"`, `"kamanasis@enginium.app"`, avatar `"KA"`, labeled `"Enginium pilot · demo"`. `CommunityView.jsx` authors new posts as `"You · local demo"` (`"ME"`).
- **Frontend Changes Required for Future Auth (Not Implemented):**
  1. Introduce an Auth Context / provider in `App.jsx` holding `{ user, sessionStatus, accessToken, signOut }` alongside an API client with auth headers/refresh handling.
  2. Build sign-in / sign-up / recovery UI flows (or modal entry) and clearly isolate authenticated vs guest/demo mode (`"Add vehicle"` / `"Service log"` / `"Settings"` currently assume instant anonymous local state).
  3. Namespace or migrate existing `localStorage` data (`enginium_service_history`, `enginium_custom_vehicles`, `enginium_selected_vehicle_id`) cleanly per authenticated `userId` upon first login so prior local entries aren't lost or leaked across accounts on a shared browser.

---

## 10. Backend Capabilities Required

*(Listed by capability without inventing database schemas or REST routes.)*

| Capability | Why Needed | Dependent Screens | Input Data Needed | Data Stored | Phase 1 MVP vs Later |
|---|---|---|---|---|---|
| **1. Auth & User Profile** | Persist rider identity, units, language, preferences across devices | `App`, `ProfileView`, `GarageView`, `CommunityView` | Credentials/OTP/OAuth, units, language, reminder flags | User account, session/tokens, profile preferences | **Phase 1 MVP** |
| **2. Vehicle Catalogue & Specifications** | Replace 3 incomplete Royal Enfield stubs (`classic350`, `gt650`, `hunter350`), fix hardcoded strings/specs, add new vehicles without rebuilding frontend | `App` (topbar), `LandingView`, `HomeView`, `HudDiagnosticsView`, `GarageView`, `LearnView`, `DiagnoseView` | Queries by make/model/year/type/search | Master vehicles (`make`, `model`, `year`, `type`, `engine`, `power`, `specs`, chassis metrics) | **Phase 1 MVP** |
| **3. Vehicle-Specific Parts & Media Metadata** | Store accurate parts per bike, categories, DIY steps, costs, safety alerts, and 3D node links | `LearnView`, `BikeBlueprintViewer`, `DiagnoseView` | `vehicleId`, category/search filters, part ID | Parts catalog, vehicle-to-part specs/costs/DIY overrides, 3D mapping metadata, image URLs | **Phase 1 MVP** |
| **4. User Garage, Custom Vehicles & Milestones** | Save user's owned bikes (`enginium_custom_vehicles`), odometer updates, and heritage milestones (currently lost on refresh!) | `GarageView`, `HomeView`, `App` | Custom vehicle form, milestone form (`title`, `desc`, `date`), vehicle selection | User-owned garage bikes, active bike pointer, odometer readings, milestones, document attachments | **Phase 1 MVP** *(Documents vault can follow in Phase 2)* |
| **5. Service Logs & Maintenance Schedules** | Scope service records to specific bikes (fix current global `enginium_service_history` bleed across vehicles!) and compute real due intervals | `GarageView`, `HomeView`, `DiagnoseView` | `{ vehicleId, title, desc, cost, odometerKm, date, linkedDiagnosisId? }` | Vehicle-scoped service history & scheduled reminder state | **Phase 1 MVP** |
| **6. Diagnostic Engine & Session History** | Centralize `STOP_RULES` + `FAMILIES` rules/translations, persist diagnostic chats & outcomes, log triage history | `DiagnoseView`, `HudDiagnosticsView` | `vehicleId`, symptom text, Q&A answers (`true/false/null`) | Diagnostic sessions, messages, ranked results, saved triage snapshots | **Phase 1 MVP** *(Rules/History)* |
| **7. 3D Model Assets & Parametric Manifest** | Deliver real `.glb` assemblies or vehicle-accurate procedural dimension/part configs + high-res part imagery via CDN | `BikeBlueprintViewer`, `LearnView`, `HudDiagnosticsView` | `vehicleId` / asset key | `.glb` models, `BIKE_SPEC` physical dimensions, mesh-to-part coordinates/explode vectors, part images | **Phase 1 (Media/Manifest)** → **Phase 2 (Real `.glb`)** |
| **8. Learning Progress & Quiz Scoring** | Replace hardcoded `78%`/`15%` progress and preserve quiz mastery per user | `LearnView` (`Modules`), `DesignBoardView` | Module ID, submitted answers | Learning modules, quiz bank, user progress & scores | **Phase 2** |
| **9. AI Mechanic Integration (LLM / Guided Fallback)** | Handle the high volume of symptoms that miss the 6 keyword `FAMILIES` while keeping deterministic safety `STOP_RULES` mandatory on top | `DiagnoseView` | Free-text symptoms + active vehicle specs/service logs (grounded in catalogue) | AI conversation turns, safety audit logs, feedback | **Phase 2** |
| **10. Community Posts, Comments & Cost Savings** | Make `CommunityView` real, mount it in navigation, support filtering by room/bike, replies, and likes | `CommunityView` (once mounted) | Post payload (`title`, `content`, `vehicleId`, `costSaved`), comment, like toggle | Posts, room tags, comments, user likes | **Phase 2** |
| **11. Acoustic Telemetry Storage & Classification** | Store real mic audio/FFT signatures, synthesize real demo audio or serve reference WAV/MP3s, refine bike-specific fault detection | `AcousticView` | Audio recording or FFT signature + `vehicleId` | Acoustic recordings, FFT snapshots, predicted mechanical patterns | **Phase 2 / 3** |
| **12. Notifications & Maintenance Reminders** | Honor reminder toggles in `ProfileView` based on odometer/service dates | `ProfileView`, `HomeView`, `GarageView` | Push tokens / email pref / mileage triggers | Notification queue, user schedule rules | **Phase 2 / 3** |
| **13. Admin Catalogue & Content Management** | Internal/partner workflow to publish, verify (`placement: manual` vs `approximate`), and update bike specs, parts, images, and safety notices | Internal admin (outside current rider UI) | CRUD edits for vehicles, parts, rules, modules | Audit trail, draft/published versions, source citations | **Phase 2** |
| **14. OBD-II / IoT Telemetry & Roadside Dispatch** | Replace simulated HUD sensor metrics & disabled Location Sharing button | `HudDiagnosticsView`, `HomeView`, `ProfileView`, `App` Emergency SOS | BLE/OBD PID packets, GPS coordinates | Time-series telemetry snapshots, fault DTC logs | **Phase 3 (Hardware/IoT)** |

---

## 11. Existing Data Contracts (JavaScript Structures Consumed by UI)

### 11.1 Vehicle Object (`src/data/vehicles.js`)
```js
{
  id: string,                // e.g. "splendor", "activa", "continental-gt-650"
  name: string,
  make: string,
  model: string,
  type: "Motorcycle" | "Scooter" | "Car",
  engine: string,
  power: string,
  specs: {
    oilType: string,
    oilCapacity: string,
    sparkPlugGap: string,
    tirePressureFront: string,
    tirePressureRear: string
  },
  legacyMilestones: Array<{ id: string, title: string, desc: string, date: string }>,
  parts: Array<ComponentPart>,
  symptomMap?: Object,       // Unused in DiagnoseView; only referenced in DesignBoardView:191
  emergencyGuides?: Array<{ id: string, title: string, steps: string[] }> // Unused at runtime
}
```
- **Consumed By:** `App.jsx`, `LandingView`, `HomeView`, `GarageView`, `HudDiagnosticsView`, `DiagnoseView`, `LearnView`, `AcousticView`, `CommunityView`, `DesignBoardView`.
- **Backend Modifications Needed:** Split static global `vehiclesData` into user-owned `garageVehicle` (with `odometerKm`, `vin/regNumber`, `customSpecs`, `milestones`) referencing a normalized master `catalogVehicle`.

### 11.2 Component / Part Object (`src/data/vehicles.js` & `src/data/bikeParts.js`)
```js
// Catalogue item in vehicles.js:
{
  id: string,                // e.g. "spark-plug" (canonical across bikes)
  name: string,
  category?: string,         // "Engine" | "Transmission" | "Fuel & Exhaust" | "Electrical" | "Brakes" | "Suspension" | "Wheels" | "Chassis" (missing on Royal Enfield stubs!)
  icon: string,              // Lucide icon lookup key in LearnView
  image: string,             // Relative public URL e.g. "/images/parts/spark-plug.jpg"
  imageCredit?: string,
  function: string,
  failures: string,
  symptoms: string,
  interval: string,
  cost: string,              // Formatted currency range e.g. "₹120 - ₹180"
  difficulty: string,        // "Basic DIY" | "Yellow" | "Workshop" etc.
  safety: string,
  diySteps: string[],
  tools: string[]
}
```
- **3D Link Extension (`src/data/bikeParts.js`):** `{ id, group, offset: [x,y,z], start: number, selectable?: boolean, placement: "manual"|"inferred"|"approximate", source: string }`.
- **Backend Modifications Needed:** Enforce mandatory `category` field, separate numeric `minCost`/`maxCost`/`currencyCode` from display strings (needed if `Metric/Imperial` or localization is activated), and include `blueprintNodeId` explicitly from backend instead of relying strictly on hardcoded client `VEHICLE_PART_TO_3D`.

### 11.3 Diagnostic Result & `PartInspectionRequest` (`src/data/diagnosis.js`)
```js
{
  familyLabel: string,       // e.g. "Starting trouble" or "Stop condition"
  cause: string,             // e.g. "Start with: Spark Plug"
  confidenceList: Array<{
    partId: string,
    name: string,
    confidence: string,      // e.g. "85%" (capped at 90%)
    reason: string
  }>,
  difficulty: string,
  partCost?: string,
  repairTime?: string,       // Note: DiagnoseView:249 reads activeDiagnosis.repairTime, though buildDiagnosis never populates it!
  canDrive: string,
  warning: string,
  diySteps: string[],
  tools: string[],
  inspectionRequest?: {
    vehicleId: string,
    targetPartId: string,
    confidence?: number,     // 0..1
    reason?: string,
    inspectionLevel?: "component" | "subsystem" | "assembly",
    relatedPartIds?: string[]
  }
}
```
- **Noticeable Schema Drift Detected:** `DiagnoseView.jsx:249` renders `{activeDiagnosis.repairTime || 'Not estimated'}` and `DesignBoardView.jsx:191` passes `selectedVehicle.symptomMap['chain-noise']` (which has `repairTime`, `partCost`, `confidence`, `cause` but lacks `confidenceList` and `diySteps`). Backend diagnostic response should standardize `repairTime`, `costEstimate`, `confidenceList`, `diySteps`, and `inspectionRequest` cleanly!

### 11.4 Service Record & Custom Session Vehicle (`App.jsx`, `GarageView.jsx`)
- **Service Record:** `{ id: number | string, title: string, desc: string, date: string }` — **Needs `vehicleId` and structured `costAmount` added** so logs don't mix across bikes.
- **Custom Vehicle (`enginium_custom_vehicles`):** `{ id, source: "session", name, model, type, engine, mileage }` — **Needs `catalogVehicleId` (optional template link) and default empty arrays (`parts: []`, `legacyMilestones: []`, `specs: {}`)** to prevent crashes when selected as active vehicle!

---

## 12. Frontend-to-Backend Dependency Map

```text
LandingView ────────► vehiclesData, symptomDemos, EngineSchematic3D
                      └──► Backend: Master Vehicle Catalogue, Featured Specs

HomeView ───────────► selectedVehicle, serviceHistory (localStorage), hardcoded odometers
                      └──► Backend: Active Garage Vehicle, Odometer & Service Schedule Summary

HudDiagnosticsView ─► selectedVehicle, hardcoded config map, /hud_motorcycle_wireframe.jpg
(ScannerView alias)   └──► Backend: Vehicle Platform Metadata, Future Telemetry/OBD-II Metrics

DiagnoseView ───────► diagnosis.js rules, selectedVehicle.parts, serviceHistory
                      └──► Backend: Symptom Rules / AI Fallback, Diagnosis History, Service Logs

LearnView + ────────► selectedVehicle.parts, bikeParts.js, public/images/parts/*
BikeBlueprintViewer   └──► Backend: Vehicle-Specific Parts & Media CDN, 3D Manifest / .glb Assets
                      └──► Backend (Phase 2): Learning Modules, Quiz Bank, User Module Progress

AcousticView ───────► Web Audio Mic FFT (live) + SAMPLE_RESULTS (demo)
                      └──► Backend (Phase 2): Reference Fault Audio / Acoustic Classification Service

GarageView ─────────► vehiclesData, enginium_custom_vehicles, enginium_service_history, React state milestones
                      └──► Backend: Auth-Scoped User Fleet, Milestones, Service History, Doc Storage

ProfileView ────────► enginium_pref_* (localStorage), hardcoded "Kamanasis" identity
                      └──► Backend: Authentication, User Profile Sync, Notification Preferences

App Emergency SOS ──► Hardcoded JSX checklist in App.jsx
                      └──► Backend (Optional): Vehicle-Specific Roadside Guides, Live Location/Dispatch

CommunityView ──────► enginium_community_posts, enginium_liked_posts (Unmounted)
                      └──► Backend (Phase 2): Multi-User Forum Posts, Comments, Likes
```

---

## 13. Security, Reliability, and Production Readiness Assessment

- **Sensitive Data / Secrets Audit:**
  - **No API keys or secrets** exist anywhere in source files or config files. `.gitignore` ignores `*.local`, `node_modules`, `dist`, `.reticle`.
  - Browser `localStorage` stores non-sensitive local demo data (`enginium_*` keys), though unencrypted profile info in future auth setups must never mirror `ProfileView`'s hardcoded credentials or tokens in plain unguarded storage if cookies/HttpOnly sessions are chosen.
- **Runtime Crashes & Data Consistency Risks Found in Code:**
  1. **Critical — Custom Vehicle Selection Crash Risk (`GarageView.jsx` → `App.jsx` → `LearnView`/`DiagnoseView`):** Selecting a user-created custom vehicle (`source: 'session'`) via `"Use this profile"` sets `selectedVehicle` to an object **without `.parts`, `.specs`, or `.legacyMilestones`**. Navigating to `LearnView` (`selectedVehicle.parts.filter(...)` at line 180) or `DiagnoseView` (`vehicle.parts.map(...)` at `diagnosis.js:187`) will throw a **`TypeError: Cannot read properties of undefined (reading 'filter'/'map')`**!
  2. **Crucial Data Bug — Service History Not Scoped to Vehicle:** `App.jsx` stores one shared `serviceHistory` array in `enginium_service_history`, causing a Spark Plug clean logged for Hero Splendor to appear under Royal Enfield Classic 350 or Honda Activa 6G.
  3. **Crucial ID Bug in HUD (`HudDiagnosticsView.jsx:20`):** `isCruiser` checks `'gt650'` and `'hunter350'`, whereas `vehicles.js` uses `'continental-gt-650'` and `'hunter-350'`. Both bikes silently fall back to the Splendor commuter HUD config.
  4. **Silent Data Loss on Milestones (`App.jsx:139`):** Adding a milestone updates React state (`setSelectedVehicle`) without writing to `localStorage`; refreshing or switching vehicles permanently erases newly created milestones.
  5. **DesignBoard Crash Risk Across Vehicles (`DesignBoardView.jsx:191`):** Passes `selectedVehicle.symptomMap['chain-noise']`. While all 6 current bikes happen to define `'chain-noise'`, selecting a newly added custom vehicle or future bike lacking `symptomMap['chain-noise']` will render blank/stale or error if `symptomMap` is undefined.
  6. **Case-Sensitive Static Filenames (`public/images/parts/`):** `crankshaft.JPG` and `front-tyre.JPG` use uppercase `.JPG` extensions; fine on case-insensitive Windows local dev, guaranteed 404 risk on Linux CDN/containers unless normalized or kept consistent.
- **Error Handling, Loading States & Offline Behaviour:**
  - `BikeBlueprintViewer`, `EngineSchematic3D`, and `ThreeEngineViewer` handle unavailable WebGL contexts gracefully. However, **`KineticBackground.jsx` constructs `new THREE.WebGLRenderer(...)` without a `try/catch`**—if WebGL fails/blocks on a client device, `App.jsx` / `LandingView.jsx` could fail to mount!
  - App works well offline once cached as a static bundle (save for Google Fonts in `index.html`), though there is no Service Worker / PWA manifest yet.
- **Safety & Liability Risks (Client-Side Diagnostic & Cost Estimates):**
  - `diagnosis.js` displays DIY instructions and ₹ cost estimates (`₹120 - ₹180` etc.) directly from static client JS. Once moved to production with user uploads or AI assistance, **server-side validation, explicit disclaimers, safety-gate enforcement (especially `STOP_RULES` and `safetyCritical` brake/fuel rules), and versioned specification sources** are critical so clients cannot bypass or tamper with safety warnings or present stale workshop pricing as guaranteed quotes.
- **Performance Concerns:**
  - `src/data/vehicles.js` is `3,645` lines loaded eagerly into the main `index.js` bundle (`~505 kB` JS). Once a backend serves catalogue & parts lazily per selected vehicle, initial bundle weight and parse time drop significantly.
  - Three.js (`three-vendor` chunk `~587 kB`) is properly isolated; `BikeBlueprintViewer` is already lazy-loaded inside `LearnView.jsx`.
- **Accessibility Notes:**
  - Good baseline ARIA roles, live regions (`bp-sr`, `aria-live="polite"`), keyboard shortcuts (`+`/`-`/`0`/`Esc`), `prefers-reduced-motion` awareness in `BikeBlueprintViewer`, and custom `focus-visible` outlines.
  - Gaps: Interactive `<div>` cards with `onClick` in `LandingView.jsx` (`en-part-preview-card` line 738, `en-system-card` line 786) lack `role="button"`, `tabIndex`, and keyboard `onKeyDown` handlers.

---

## 14. Incomplete and Legacy Features

1. **Royal Enfield Incomplete Catalogs (`vehicles.js`):** `Classic 350` (`2` parts), `Continental GT 650` (`2` parts), `Hunter 350` (`1` part) — missing `category` fields and 35+ subsystem parts.
2. **Unmounted `CommunityView.jsx`:** Fully built local feed UI with `localStorage`, unreachable from sidebar, topbar, or landing nav.
3. **Unmounted Legacy Widgets (`EngineeringStation.jsx`, `ThreeEngineViewer.jsx`, `MobileFrame.jsx`):** Present in `src/components/`, replaced in practice by `EngineSchematic3D`, `BikeBlueprintViewer`, and responsive Tailwind CSS (`viewMode === 'app'` has no UI toggle).
4. **Dead Fields in `vehicles.js`:** `symptomMap` and `emergencyGuides` are populated on Splendor/Activa/Pulsar (`[]` on Royal Enfields) but ignored by runtime `DiagnoseView` and Emergency SOS modal.
5. **Simulated Preview UI in `ProfileView` & `GarageView Documents` & `AcousticView Demo Play`:** Language translation, unit conversion, notifications, location sharing, document uploads, and demo sound audio synthesis are UI stubs only.
6. **Legacy Splash Screen & Template CSS:** `App.jsx` keeps `showSplash` (`false`) dead branch and `src/App.css` keeps Vite template counter CSS.

---

## 15. Recommended Backend Implementation Priorities

- **Phase 1 — Foundation & Core Persistence (First Backend Release):**
  1. **User Authentication & Profile Preferences** (migrate hardcoded `Kamanasis` preview + `ProfileView` settings).
  2. **Master Vehicle & Part Catalogue Service** (replace `vehicles.js` eager bundle, fill Royal Enfield 350/650 part gaps, enforce `category`, add `repairTime`, and fix the `HudDiagnosticsView` `isCruiser` ID mismatch + `Chassis` filter bug on frontend).
  3. **User Garage, Bike-Scoped Service Logs & Milestones** (fix `serviceHistory` cross-bike leakage, persist milestones, ensure custom vehicles inherit safe defaults/catalogue links so `LearnView`/`DiagnoseView` never crash).
  4. **Deterministic Diagnostic Rule Service + History Storage** (preserve `diagnosis.js` safety rules & 90% cap behavior, persist triage history & linked service logs).
  5. **Media & Image Asset Hosting** (normalize image filenames `.JPG`/`.jpg`, serve part photos reliably).

- **Phase 2 — Intelligence, Community & Education:**
  1. **AI Mechanic Hybrid Triage** (LLM handling unknown free-text queries while wrapped strictly inside server-enforced `STOP_RULES` and active vehicle constraints).
  2. **Community Feed Activation** (wire `CommunityView` into `App.jsx` navigation backed by moderated multi-user posts, room filtering, likes, comments).
  3. **Learning Modules & Persistent Quiz Progress** (CMS-managed modules + saved user mastery scores).
  4. **Real 3D Asset Manifest + Admin Catalogue Editor** (deliver model-accurate `.glb` assemblies and verified placement specs).

- **Phase 3 — Live Hardware, Acoustics & Roadside Ecosystem:**
  1. **Acoustic Reference Audio & ML/Signal Analysis** (real demo audio files + vehicle-calibrated engine acoustic scoring).
  2. **Reminder Scheduler / Notifications** (push/email triggered by service intervals & odometer updates).
  3. **OBD-II / BLE Telemetry Ingestion & Live Roadside Location Dispatch**.

---

## 16. Open Questions and Missing Information

1. **Custom Vehicle Parts Strategy:** Should user-added vehicles (`Add vehicle` in `GarageView`) require picking a closest base template from the master catalogue (so `Learn`, `Diagnose`, and `3D` work immediately), or exist as "logbook-only" bikes with those tools gracefully disabled?
2. **Real 3D `.glb` Pipeline:** Will the production 3D viewer continue expanding procedural Three.js silhouettes per bike class (`bikeGeometry.js`), or are real manufacturer/commissioned multi-mesh `.glb` files planned for Splendor, Activa, Pulsar, and Royal Enfields?
3. **Diagnostic Safety Liability Boundaries:** How will DIY steps, torque specs, and regional ₹ repair cost ranges be verified, versioned, and legally disclaimed once served dynamically or augmented by an AI mechanic?
4. **Community Scope (`CommunityView`):** Is the owner forum planned for Day-1 backend launch (requiring mounting into `App.jsx`, comment threads, and moderation) or deferred to Phase 2?
5. **Multi-Language & Unit Conversion:** `ProfileView` offers `English / Hindi / Bengali` and `Metric / Imperial` previews — does backend need localized part catalogues/rules (`i18n`) and unit conversion support?

---

## BACKEND PLANNING DECISIONS REQUIRED

Before finalizing backend database schemas and API design, please decide on the following:

1. **Scope of Release 1 (MVP):** Confirm which capabilities belong in Release 1 — specifically whether **Community (`CommunityView`)**, **Learning Progress Sync**, **Document File Uploads**, and **AI LLM Diagnostics** ship in V1 or Phase 2.
2. **Authentication Model & Guest Mode:** Will Enginium require login to use core tools, or allow anonymous guest exploration (`Landing`, `3D Parts`, `Rule-Based Diagnosis`) with login required only to save Garage bikes, Milestones, and Service Logs? Also confirm preferred auth method (Email/Password, Phone OTP for Indian riders, or Google OAuth).
3. **Master Catalogue Ownership & Royal Enfield Gap:** Who will curate and verify the missing parts data (`Classic 350`, `Continental GT 650`, `Hunter 350`), and should an Admin CMS endpoint/workflow be part of the initial backend build?
4. **Currency, Units & Localization (`i18n`):** Confirm whether Release 1 targets India only (`INR ₹`, Metric `km/mm/psi`, English) or must structurally support multi-currency, Imperial units, and Hindi/Bengali translations in stored vehicle/part records.
5. **Custom Vehicle Architecture:** Decide whether custom user vehicles must map to a supported base model template (`vehicles.js` parts inheritance) or support custom free-form specs without interactive 3D/part breakdown.
6. **Diagnostic Engine Mode (Rule-Only vs Hybrid AI):** Confirm whether V1 backend runs strictly on the current deterministic `diagnosis.js` rule tree or integrates an LLM API fallback for unmatched symptom text (and your preferred LLM provider/latency/cost budget).
7. **Media & 3D Asset Hosting:** Confirm where the `42+` component photos, real engine demo audio clips, future user document uploads (RC/insurance), and any `.glb` 3D models should be stored (e.g., S3/Cloudflare R2/Supabase Storage/CDN).
8. **Hardware / OBD-II Timeline:** Confirm whether OBD-II Bluetooth data ingestion and GPS emergency sharing are strictly post-V1 Phase 3, or if any telemetry ingestion endpoints need to be stubbed now.
