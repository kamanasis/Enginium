# Enginium: App Audit and Real-World Readiness Roadmap

Date: 9 October 2026

## Scope and evidence

This report consolidates the application analysis, missing capabilities, current flaws, and recommended priorities discussed in the review.

Evidence: application source-code review, production build, lint, and targeted data checks. No browser end-to-end testing, real-device performance testing, road testing, hardware integration testing, or independent mechanical validation was completed. Functional consequences identified from code are not all browser-reproduced defects.

No application source changes were made during the audit. The build generated production output.

## Executive summary

Enginium is an interactive digital-mechanic frontend prototype, not yet a functioning AI or vehicle-diagnostics platform. Its intended purpose is useful: help owners understand vehicle problems, maintain their rides, learn safe basic maintenance, and preserve family vehicle history.

The main blocker is trust rather than feature count. The app must distinguish measured readings, user reports, estimates, and demonstrations. Its interface currently promises more than its underlying diagnostic and storage functionality delivers.

## 1. Current application

- Stack: React 19, Vite, Tailwind CSS, Three.js, and Canvas animations.
- Eight main sections: HUD Diagnostics, Dashboard, AI Diagnostic, Acoustic Sound AI, Garage Fleet, Parts & Quiz, Community, and Profile & OBD-II.
- Three presentation modes: desktop website, mobile-frame preview, and internal Figma-style design board.
- Six predefined vehicles: Hero Splendor Plus, Honda Activa 6G, Bajaj Pulsar 150, Royal Enfield Classic 350, Continental GT 650, and Hunter 350.
- Fifteen parts entries containing descriptions, maintenance information, costs, tools, warnings, and repair steps.
- No backend, database, authentication, or actual vehicle connection in the reviewed project.
- Mobile mode is a browser preview, not a native mobile application.
- Figma Flow is an internal presentation board, not a Figma integration.

### Feature inventory

| Feature | Implemented | Simulated, incomplete, or missing |
|---|---|---|
| Dashboard | Vehicle selection and navigation | Hardcoded health, mileage, alerts, and OBD-linked status |
| HUD Diagnostics | Hotspots, subsystem cards, scan animation, chat handoff | Static motorcycle image; no sensor readings; refresh only runs a timer |
| AI Mechanic | Chat UI, questionnaire, result cards, garage logging | No AI API requests; two hardcoded diagnostic branches |
| Acoustic AI | Waveform animation, timer, demo-result selection | No microphone capture, audio playback, FFT, or classification |
| Garage | Add-ride form, service logging, milestones, profile tabs | No durable storage; disconnected fleet; placeholder documents |
| Parts & Learning | Search, categories, guides, generic 3D model, scored quizzes | Limited content; hardcoded progress; non-vehicle-specific model |
| Community | Local posts and like increments | No shared service, comments, accounts, moderation, or persistence |
| Profile & SOS | Preference controls, checklist, telephone links | Preferences do not affect the app; location sharing is an alert; OBD is demo text |

## 2. Missing capabilities for real-world use

### 2.1 Trustworthy diagnosis and safety: essential

- Symptom-specific reasoning and questions.
- Questionnaire answers that change the result.
- Vehicle model, year, and variant-specific guidance.
- Early danger screening for issues such as braking problems, fuel leaks, and severe overheating.
- An explicit insufficient-information or inconclusive outcome.
- Recommendations grounded in applicable manuals or reviewed technical sources.
- Honest confidence reporting supported by validation, not fixed percentages.
- Clear separation between owner-safe checks and work requiring a qualified mechanic.
- Mechanical review, content versioning, and a correction process.
- An explanation of evidence, assumptions, and limitations for each recommendation.

Adding an AI model alone does not solve diagnostic reliability. Without verified information and safety controls, it can produce more convincing incorrect advice.

### 2.2 Dependable digital garage: essential

- Persistent vehicles, service records, diagnoses, and milestones.
- One shared vehicle list throughout the app.
- Vehicle-scoped histories and documents.
- Year, variant, mileage, and relevant configuration fields.
- Editable service records with date, mileage, parts, and cost.
- Edit/delete controls with confirmation and appropriate recovery.
- Maintenance schedules using elapsed time and distance.
- User-entered mileage updates.
- Actual document upload, viewing, download, and expiry tracking.
- Backup, restore, export, and storage-failure handling.

### 2.3 Maintenance and ownership support: essential for adoption

- Real service and document-expiry reminders.
- Dashboard values derived from records rather than fixed health percentages.
- Pre-ride and periodic inspection checklists.
- Cost estimates with region, date, assumptions, and uncertainty.
- A structured summary to take to a mechanic.
- Follow-up recording whether a check resolved the problem.
- Alternatives for users without tools, experience, or a safe working location.

### 2.4 Accessibility and practical usability: essential

- Plain-language explanations.
- Actual local-language translations, including the languages offered in settings.
- Keyboard and screen-reader support.
- Readable text, sufficient contrast, and usable touch targets.
- Reduced-motion support.
- Low-end phone and slow-network usability.
- Offline access to saved guides and emergency information.
- Clear loading, empty, error, unsupported, and disconnected states.

### 2.5 Emergency assistance: essential if advertised

- Permission-based location acquisition and real location sharing.
- Clear distinction between a phone shortcut and an assistance request.
- Verified, region-appropriate emergency contacts.
- Vehicle-appropriate checklists.
- Offline emergency information.
- Honest handling when location, connectivity, or a telephone handler is unavailable.

Never claim help has been contacted when only a screen or dialer has opened.

### 2.6 Privacy, security, and recovery

- Secure provider-credential handling.
- Consent and retention rules for recordings and documents.
- Export and deletion controls.
- Protection for registration, insurance, location, and identity information.
- Authentication and authorization if cloud sync or shared services are introduced.
- Backup, recovery, and clear privacy disclosures.

An account is not mandatory for a local-first MVP. Secure storage and honest handling of data are mandatory when sensitive information is collected.

### 2.7 Acoustic analysis: required only if this promise remains

- Microphone permission, real recording, and playback.
- Recording-quality, clipping, and background-noise checks.
- Real signal processing and vehicle-aware interpretation.
- A labeled dataset and independently evaluated performance.
- An inconclusive result and explicit limitations.

Recording audio and showing an FFT are not equivalent to diagnosing an engine. This requires substantial research and validation.

### 2.8 OBD integration: required only if advertised

- Supported adapter and vehicle compatibility information.
- Connection, disconnect, and reconnection handling.
- Actual supported trouble-code and sensor reads.
- Timestamped readings and source information.
- Unsupported-data handling and initially read-only operation.

OBD does not automatically provide oil quality, chain slack, brake-pad wear, or every value shown in the HUD. Some require additional sensors or physical inspection.

### 2.9 Community: optional for an initial release

- Shared server-backed posts and accountable identities.
- Comments, replies, and one-user/one-like behavior.
- Vehicle/topic filtering.
- Reporting, moderation, spam prevention, and dangerous-advice review.
- Clear separation of owner anecdotes from verified guidance.

Community features introduce continuing moderation responsibilities and should not delay a reliable maintenance product.

## 3. Current flaws reducing capability

### 3.1 Critical: misleading or potentially unsafe functionality

| Flaw | Impact |
|---|---|
| Saving an API key displays API Live without making an AI request | Creates a false impression of live AI analysis |
| Diagnosis only distinguishes starting/cranking from a generic fallback | Unrelated complaints can receive spark-plug advice |
| Questionnaire answers do not affect the result | The apparent investigation has no diagnostic effect |
| Confidence scores are fixed | Presents unsupported precision |
| Acoustic Record does not capture audio | Results reflect demo selection rather than engine sound |
| Demo playback does not play sound | Controls imply missing functionality |
| HUD refresh only animates and waits | No new readings are obtained or assessed |
| OBD-linked labels and live-looking readings are hardcoded | Simulation is difficult to distinguish from measurement |
| Identical HUD components/readings across vehicles | Information may not match the selected machine |
| Mechanical causes and repair references are inconsistent | Users may be directed to an unrelated component or procedure |

Evidence: `src/views/DiagnoseView.jsx:42-50,70-163`, `src/views/AcousticView.jsx:99-152`, `src/views/HudDiagnosticsView.jsx:9-165`, and `src/views/HomeView.jsx:109-119`.

### 3.2 High: data loss and disconnected features

- Added garage rides are stored only inside GarageView and reset when that view unmounts.
- Added rides never reach the application's main vehicle selector.
- Service history is global, with no vehicle IDs, so records appear under different selected vehicles.
- Service records disappear on reload despite a permanently-registered confirmation.
- Added milestones modify only the selected object and are lost after switching away and back.
- Posts and likes are local to CommunityView and reset on navigation.
- Preferences are local, temporary, and disconnected from application behavior.
- Selected learning parts are not synchronized with vehicle changes; previous-vehicle instructions can remain visible.
- Chat and active diagnosis are not scoped to individual vehicles.

Evidence: `src/App.jsx:31-70`, `src/views/GarageView.jsx:22-55`, `src/views/CommunityView.jsx:9-67`, `src/views/ProfileView.jsx:5-7`, and `src/views/DiagnoseView.jsx:174-185`.

### 3.3 Specific functional defects

1. **Garage filters fail:** plural labels (Motorcycles, Scooters, Cars) are compared with singular stored types. Source: `src/views/GarageView.jsx:91-115`.
2. **Design-board logging throws for applicable demo diagnoses:** the supplied symptomMap entry lacks tools, while logging calls tools.join(). The data-shape failure was reproduced for Splendor and Hunter. Sources: `src/views/DesignBoardView.jsx:189`, `src/views/DiagnoseView.jsx:177`.
3. **Continental GT has a missing-part reference:** its starting diagnosis refers to battery, absent from its parts list. Source: `src/data/vehicles.js:537-547`.
4. **Pulsar has an unrelated repair reference:** poor pickup names clutch/air-filter causes but points to chain. Source: `src/data/vehicles.js:384-395`.
5. **Clutch cable is categorized as Brakes:** incorrect learning classification. Source: `src/views/LearnView.jsx:115-116`.
6. **The 3D viewer can retain a stale selection callback:** onSelectPart is omitted from the effect dependencies, potentially retaining previous-vehicle context. Source: `src/components/ThreeEngineViewer.jsx:195`.
7. **Community heading can become stale:** its forum name is initialized from the vehicle but not synchronized afterward. Source: `src/views/CommunityView.jsx:5-7`.
8. **Two vehicle dropdowns share one open state:** on the dashboard, toggling one can open both. Sources: `src/App.jsx:34,328`, `src/views/HomeView.jsx:43`.

### 3.4 Incomplete and nonfunctional controls

- Registration and insurance cards do not open real documents.
- Chat camera, audio, and document buttons only display alerts.
- Share Location does not acquire or copy a location.
- Notification preference does not request or manage notifications.
- Language selection does not translate the interface.
- Unit selection does not convert displayed values.
- Comment counts have no commenting flow.
- Completing quizzes does not update module progress.
- Many design-board controls use no-op callbacks.
- Community has no entry in the mobile bottom navigation.
- Main splash starts disabled and has no normal activation path.
- Diagnostic objects contain repair steps and tools, but the main result panel does not display those instructions before offering Complete & Log.

### 3.5 Presentation inconsistencies

- The board advertises 10 screens and 3 schematics, but renders 9 screen panels and 2 dedicated schematic panels.
- Quiz Open does not explicitly choose the educational segment.
- Board SOS actions set emergency state, but the flow-mode early return does not render the emergency overlay.
- Health scores, expiry countdowns, and several status values are fixed rather than calculated.
- The 3D assembly is generic rather than vehicle-specific.
- Model/year-specific maintenance specifications and safety advice lack cited manufacturer references and independent validation.

## 4. Engineering weaknesses

### Architecture

- Vehicle state is divided between App and individual views.
- No unified model relates vehicles, diagnoses, service records, and documents.
- Business rules are embedded directly in UI components.
- Main diagnosis does not use the populated symptomMap.
- Main SOS does not use vehicle-specific emergencyGuides.
- No URL routing, deep links, or browser-history navigation.

### Reliability

- No automated test suite or configured typecheck command.
- Missing effect dependencies risk stale callbacks.
- Delayed diagnostic callbacks are not cancelled when context changes.
- Repeated submissions can overlap.
- Repeated Complete & Log actions can duplicate service records.
- Form validation is inconsistent; numeric inputs have limited invalid/negative-value handling.
- Persistence, network, hardware, and authentication failure handling are not implemented because those integrations are absent.

### Performance and rendering

- Large production JavaScript bundle triggers a Vite warning.
- Heavy screens and Three.js are eagerly imported.
- Three.js recreates its scene on part selection changes.
- Geometry and materials are not explicitly disposed during cleanup.
- Continuously animated canvases may waste resources, especially on the design board.
- Animation speed is frame-rate-dependent rather than elapsed-time-based.
- No reduced-motion or off-screen animation suspension.

These are code-level concerns; real-device frame rate, memory use, and battery impact were not measured.

### Accessibility

- Clickable hotspot divs lack native keyboard-button behavior.
- Several icon-only controls lack accessible names.
- Forms rely heavily on placeholders instead of persistent labels.
- Modal focus management and keyboard dismissal are missing.
- Much of the interface uses very small text.

### Security and maintainability

- An unused Gemini key is retained in browser localStorage.
- No secure backend boundary exists for provider integration.
- README remains the Vite template rather than project documentation.
- Many unused imports and states obscure unfinished work.
- Lint reports 66 warnings, including missing effect dependencies.

## 5. Verification results

| Check | Result |
|---|---|
| npm run build | Passed, exit code 0 |
| npm run lint | Exit code 0; 66 warnings and 0 errors |
| Production JavaScript | 886.92 kB minified; 235.90 kB gzip; large-chunk warning |
| Vehicle/parts data count | 6 vehicles; 15 parts entries |
| Missing solution part check | Continental GT starting diagnosis references absent battery part |
| Board logging data-shape check | Missing tools.join() input reproduced for Splendor and Hunter |
| Category comparison check | Plural category labels match zero predefined vehicle types |
| Git state after audit checks | Clean before this report was added |
| Automated application tests | No test suite configured; not run |
| Browser/hardware/road checks | Not performed |

A passing build confirms compilation, not diagnostic correctness, mechanical safety, or end-to-end reliability.

## 6. Societal usefulness: hypotheses to validate

Demand cannot be established from source code. Interview intended users and run a small, consent-based pilot of non-safety-critical functionality.

| User need | Useful outcome |
|---|---|
| I forget maintenance | Date- and mileage-based reminders |
| I do not understand the mechanic | Plain-language explanations and a repair summary |
| I am unsure whether to keep riding | Conservative, reviewed triage rather than unsupported reassurance |
| My family shares an older vehicle | Durable maintenance and ownership history |
| I cannot afford unnecessary repairs | Safe basic checks and clear limits on DIY work |
| I have limited connectivity or English | Offline guides, local languages, and accessible controls |

The strongest potential differentiator is trustworthy maintenance history plus understandable guidance and family ownership continuity, not the animated HUD alone.

## 7. Prioritized roadmap

### Priority 0: accurate claims and safety

- Clearly identify demo readings, scans, AI responses, and audio profiles.
- Remove false live-connection and permanent-storage claims.
- Stop unrelated generic diagnoses from being presented as reliable advice.
- Correct broken references and review mechanical content.
- Add uncertainty, limitations, and appropriate escalation boundaries.

### Priority 1: reliable core records

- Create one vehicle-scoped data model.
- Persist rides, service records, and milestones.
- Connect garage additions to the main selector.
- Fix filters, stale selections, and board failures.
- Implement edit/delete/export and storage-error handling.
- Add regression tests for persistence, navigation, and vehicle isolation.

### Priority 2: everyday value

- Maintenance schedules and real reminders.
- Validated guides and mechanic handoff summaries.
- Real document management and expiry tracking.
- Accessible controls, readable layouts, translation, and offline saved content.
- Validate usefulness with actual owners and mechanics.

### Priority 3: validated intelligence and integrations

- Build a diagnostic flow that uses evidence and answers.
- Integrate AI through a secure boundary with reviewed reference material.
- Evaluate diagnostic quality before expanding coverage.
- Treat acoustic classification and OBD as separate projects with explicit compatibility and validation requirements.

### Priority 4: growth

- Optional cloud synchronization and family sharing.
- Moderated community features.
- Service-provider integrations only after the core proves useful.
- Lazy-load heavy screens and profile real-device performance.

## Final assessment

Enginium has a coherent concept and a substantial frontend foundation. It is not ready to be relied on for real vehicle diagnosis. The next milestone should be a trustworthy vehicle-to-guidance-to-saved-service-history journey, not more screens.

Accurate claims, durable data, safe guidance, and dependable everyday workflows will do more for its real-world value than additional visual effects.

## 8. Researched backend specification

Research date: 9 October 2026. This section is a proposed implementation plan, not a claim that backend services have been built. It combines the reviewed Enginium code with public technical documentation. Source identifiers [S1]-[S10] are listed in section 8.15. Framework choices, database design, priorities, and acceptance criteria are engineering recommendations specific to this app, not requirements dictated by those sources.

The scope covers the existing product plus practical maintenance functionality. Optional marketplace, payments, and research features are distinguished from launch requirements. No finite checklist guarantees production safety or societal demand; those need validation and ongoing operations.

### 8.1 Backend versus client versus external dependencies

| Capability | Backend responsibility | Work outside the backend |
|---|---|---|
| Garage | Authorized persistence, validation, history, sharing | Forms, active-vehicle state, offline cache |
| AI diagnosis | Sessions, evidence retrieval, rules, model gateway, output validation | Question UI, consent, clear limitations |
| Acoustic analysis | Private media storage, processing jobs, model versioning, results | Microphone permission, recording, device testing; labeled mechanical data |
| OBD | Session storage, supported-signal metadata, ingestion, trends | Compatible adapter, actual vehicle, protocol support, local Bluetooth/serial bridge |
| HUD | Timestamped observations and justified assessments | Render observations, distinguish stale/unknown/demo states |
| Reminders | Due calculations, job delivery, preferences, retries | Push permission, service worker/native integration, visible notifications |
| Documents | Private objects, metadata, scan/OCR jobs, expiry dates | Upload/view UI and user verification of extracted fields |
| SOS | Optional consented sharing, regional directory, provider receipts | Phone dialer, location permission, contracted responders if dispatch is offered |
| Learning | Versioned guides, quiz grading, stored progress | Accessible lessons, translations, illustrations |
| Community | Shared content, authorization, moderation | Reporting UI, staffing and policy enforcement |

Web Bluetooth is limited-availability, permissioned, secure-context BLE/GATT functionality; it is not universal access to Bluetooth Classic serial adapters [S5]. Microphone capture also requires client permission and a secure context [S6]. A remote backend cannot directly pair with a nearby vehicle adapter.

### 8.2 Recommended starting architecture

Keep the existing React/Vite frontend. Start with a modular backend application and background worker, not one microservice per feature.

Proposed components:

1. **Versioned HTTPS API:** TypeScript/Node.js is a practical fit with the existing JavaScript project. Fastify or NestJS are possible choices; choose one after team/hosting decisions rather than installing both.
2. **Relational database:** PostgreSQL for accounts, memberships, vehicles, logs, content, diagnostic metadata, and durable jobs/outbox records.
3. **Private object storage:** S3-compatible storage for documents, images, and recordings; keep metadata and access rules in the database.
4. **Authentication provider:** managed identity or a mature established auth library; do not invent password/session cryptography.
5. **Durable job processing:** one queue/worker system for reminders, media scans, exports, and inference. A database-backed queue may suffice initially; add Redis-backed infrastructure only when justified.
6. **Provider adapters:** isolate AI, notification, map, and optional roadside-provider calls behind interfaces, with timeouts and quotas.
7. **Administrative interface:** restricted content review, support, safety incident review, moderation, and job operations.
8. **Operational foundation:** secret management, monitoring, deployment pipeline, backups, restore testing, and security controls.

Use ordinary REST requests initially. Add server-sent events for job/chat progress when needed; WebSockets are optional for genuine real-time needs. Add a dedicated Python inference worker only if the audio pipeline warrants it. Separate vector databases, Kubernetes, Kafka, and a time-series database are not prerequisites for the MVP.

A managed backend platform may combine auth, PostgreSQL, storage, and functions. It does not remove the need for authorization policies, domain rules, workers, data migrations, or tests. No platform, account, model, or hosting choice has been changed by this report.

### 8.3 Core backend modules: identity, garage, maintenance, and files

#### B01. Identity, profiles, sessions, and preferences — launch requirement for cloud accounts

- Signup/sign-in, verification, recovery, logout, session expiry, and session revocation.
- Rate limits for login, recovery, and any OTP delivery; prevent account enumeration and messaging abuse.
- Persist display name, locale, measurement units, IANA timezone, and communication preferences.
- Require stronger authentication for administrators; reauthenticate for sensitive changes.
- Derive identity from verified sessions, never a userId supplied by a browser form.
- For same-origin cookie sessions, use HttpOnly/Secure cookies and CSRF defenses. Native clients need platform-appropriate secure token storage.
- Keep guest/local-only use possible if desired; account linking must explicitly migrate local records without duplicates.

Acceptance: revoked sessions stop working; two accounts cannot read each other's records; preferences survive a new session.

#### B02. Vehicle ownership and family access — authorization is mandatory; sharing can follow

- Every private record belongs to an authorized vehicle/account boundary.
- Define owner, editor, and viewer permissions; separately define content reviewer, moderator, and system administrator roles.
- Expiring invitations, explicit acceptance, revocation, and audited ownership transfer if family sharing is enabled.
- Check object-level and field-level permissions on every read, update, export, attachment, and job-status request [S1].
- A claimed registration number is not proof of ownership. Avoid unnecessary identity-document collection.
- PostgreSQL row-level security can provide defense in depth, but privileged roles and table owners can bypass it; do not run ordinary user requests as a bypass role [S4].

Acceptance: changing a vehicle/document ID in a request never grants access; a revoked family member cannot obtain new download links.

#### B03. Vehicle catalog and owned vehicles — launch requirement

- Separate catalog model/variant records from actual user-owned vehicle instances.
- Catalog: make, model, year range, market, variant, engine/transmission configuration, applicable parts, service schedules, supported diagnostics, source references, review state.
- Owned vehicle: catalog reference, nickname, acquisition date, optional registration, current mileage, ownership/membership, archive state.
- One canonical type enum fixes plural/singular filtering; UI labels are translations of enum values.
- Support unknown/custom models without inventing specifications or inheriting an unrelated model's repair guide.
- Version catalog corrections and validate references before publication.

Acceptance: an added ride is selectable everywhere; unsupported models receive an explicit limited-support response.

#### B04. Service history, odometer, expenses, and milestones — launch requirement

- Vehicle-scoped create/read/update/archive operations with stable IDs and server timestamps.
- Service records: performed date, odometer, work performed, parts, provider or DIY flag, cost/currency, attachments, notes, and completion status.
- Separate recommended work, attempted check, and completed repair; chat output must not automatically become a completed repair.
- Store currency as integer minor units or an appropriate exact decimal, not floating-point arithmetic.
- Odometer readings include unit, time, source, and correction reason; support legitimate replacement/correction rather than blindly rejecting all decreases.
- Store milestones with ownership and optional photos. Redact personal details when exporting for a future vehicle owner.
- Maintain edit history where appropriate and deduplicate submissions with idempotency keys.

Acceptance: a saved service survives reload and another device; switching vehicles never mixes history; retrying the same save creates one record.

#### B05. Maintenance schedules and dashboard assessments — launch requirement

- Model-specific interval rules, break-in service, recurring work, and documented usage-condition exceptions.
- Calculate time-based and mileage-based due status independently; whichever applicable threshold arrives first makes the item due.
- Recompute after service completion, mileage update, schedule correction, or timezone/preference change.
- Unknown mileage or missing history remains unknown; do not fabricate usage.
- Use explainable states: up-to-date, due soon, overdue, insufficient data. Maintenance status is not proof of mechanical health.
- Every assessment includes evidence IDs, computation time, rule version, and data freshness.
- Show source-specific observations instead of an unexplained overall percentage. Any future score requires validation and an explanation of coverage.

Acceptance: boundary tests cover dates, leap years, timezones, mileage corrections, and missing history; recording applicable completed service updates the due item.

#### B06. Documents, photos, audio, and exports — required when uploads are enabled

- Authorized upload intent, generated object key, restricted type/size, and short-lived upload authorization.
- Verify actual content/signature, checksum, size, and object ownership after upload; do not trust a MIME header or client success claim [S2].
- Quarantine media until required checks complete; sandbox PDF/image/audio parsers and limit processing resources.
- Serve private files through authorized downloads or short-lived signed URLs; signed URLs are bearer credentials and may be reused until expiry [S3].
- Use unique staging keys and finalize immutable versions so a reusable upload URL cannot silently replace an approved document.
- Track type, issue/expiry dates, vehicle, storage reference, scan state, and retention policy.
- Optional OCR produces proposed fields; user confirmation is required before changing reminders or identity data.
- Generate user-requested CSV/JSON/PDF exports with access checks and expiry; clean up orphaned uploads and derived files.

Acceptance: disguised or oversized uploads are rejected; quarantined content cannot be downloaded; unauthorized users cannot request signed URLs.

### 8.4 Knowledge, diagnosis, and learning modules

#### B07. Reviewed mechanical knowledge and content administration — required before repair guidance

- A content management system for parts, procedures, tools, warnings, symptoms, diagnostic trees, emergency guides, and translations.
- Applicability by make/model/year/variant/market; no silent fallback to a different engine generation.
- Source title, publisher, manual edition, page/section, license/use permission, review date, reviewer, and content version.
- Draft, reviewed, published, withdrawn states; only published applicable content is served as verified guidance.
- Validate part references, units, required fields, and linked procedures during publishing.
- Higher-risk content needs qualified review; AI-generated drafts must not auto-publish.
- Withdraw or correct unsafe content, invalidate cached copies where possible, and identify affected saved reports.
- Begin with structured lookup and full-text search; add embeddings only when useful and evaluated.

Acceptance: publishing fails for missing part references; withdrawn instructions are excluded from new diagnoses; a procedure carries its exact applicability and provenance.

#### B08. Diagnostic sessions and safety rules — required before diagnosis launch

- Persist a vehicle snapshot, reported symptoms, observed conditions, answers, evidence references, and session state.
- Session states include collecting information, evaluating, needs information, result available, referred, cancelled, and failed.
- Deterministic, reviewed danger-screening rules run before routine troubleshooting and cannot be overridden by an LLM.
- Questions are selected by symptom and earlier answers; track unanswered questions explicitly.
- Distinguish hypotheses from confirmed faults, and distinguish a fault code from proof that a particular part needs replacement.
- Store possible causes, supporting/conflicting evidence, next safe checks, applicable guide links, limitations, and escalation advice.
- Numeric probabilities require calibration against representative cases; otherwise use clearly explained qualitative uncertainty.
- Vehicle switch creates/selects the correct session rather than changing the context of an existing result.
- Record user-reported resolution separately from mechanic-confirmed outcomes; collect feedback without treating it automatically as reliable training data.

Acceptance: changing a meaningful answer changes the eligible diagnostic path; a brake complaint cannot default to a spark-plug repair; unsupported cases return inconclusive.

#### B09. Secure AI gateway and retrieval — required if live AI is offered

- Make provider calls from a controlled server boundary using the selected approved provider; the existing Gemini key UI is not an integration.
- Store provider credentials in a secret manager, with access controls, rotation/revocation, and redacted logs [S10]. Never put server secrets in Vite client environment variables.
- Build context from authorized vehicle data and reviewed, applicable knowledge; exclude unrelated users and unnecessary identifiers.
- Enforce output schemas and validate guide IDs, citations, units, safety classification, and applicability. Valid JSON does not guarantee correct mechanics.
- Store provider/model identifier, prompt version, retrieval references, safety-rule version, timestamps, and usage metadata sufficient for review.
- Handle timeouts, refusal, unavailable models, rate limits, cancellation, and partial streams without inventing a successful result.
- Add per-account budgets, maximum input/output sizes, provider concurrency controls, and cost alerts.
- Treat uploaded manuals, OCR, community posts, and retrieved text as untrusted data. Apply prompt-injection defenses and strict tool permissions, not just a safety prompt [S9].
- Do not let the model autonomously purchase parts, dispatch assistance, alter service records, or send vehicle-control commands.
- Keep deterministic maintenance features usable when the provider is down.

Acceptance: secrets never appear in client bundles or logs; injected document instructions cannot change permissions; citation/model/version metadata is retained; failures return an honest fallback.

#### B10. Learning, quizzes, translations, and progress — required for the existing learning promise

- Versioned modules, questions, explanations, prerequisites, and translations.
- Store attempts and completion per user/module version; calculate progress from actual activity.
- Server-side grading if scores have cross-device or reward significance; return explanations after answering rather than trusting submitted scores.
- Localized content fallback is explicit; safety-critical translations need review.
- Keep glossary, units, and procedure terminology consistent. Unit preferences change presentation, not underlying source specifications.
- Version 3D asset manifests and part-to-guide mappings; model rendering remains frontend work.

Acceptance: progress survives sign-in elsewhere; changing language retrieves genuine translated content; unsupported 3D components do not open unrelated guides.

### 8.5 Notifications, sharing, community, and support

#### B11. Notifications and durable background jobs — required for reminders

- Store reminder rules, scheduled occurrences, timezone, quiet hours, opt-in channels, and delivery attempts.
- Maintain device registrations/subscriptions with freshness timestamps and cleanup of invalid registrations [S7]. Use the chosen provider's current supported SDK/API rather than hardcoding obsolete token assumptions.
- Support in-app inbox first, then push/email; SMS is optional and needs cost and abuse controls.
- Separate queued, provider-accepted, delivered where verifiable, opened, failed, expired, and cancelled states. Provider acceptance is not proof the person received help or read a reminder.
- Use retry/backoff, bounded attempts, dead-letter review, job leases, and recovery after worker restarts.
- Deduplicate per vehicle/task/due-cycle/channel. Workers must be safe to retry [S8].
- Use a transactional outbox or equivalent so saving a reminder and requesting delivery cannot silently diverge.
- Recheck access and preferences at execution time, especially after vehicle sharing revocation or account deletion.

Acceptance: restarting workers does not lose reminders; duplicate deliveries do not create duplicate in-app records; disabled channels are not used.

#### B12. Emergency directory and location sharing — basic support; dispatch is conditional

- Versioned regional emergency contacts, source, verification date, jurisdiction, and applicability.
- Consent-based, expiring location shares with recipient scope, accuracy, timestamp, and revocation.
- Minimize location retention and exclude coordinates from routine analytics and notification previews.
- An assistance request workflow only if a real provider contract/API exists: requested, provider-acknowledged, accepted, en route, completed, cancelled, failed.
- Verify provider callbacks and reconcile uncertain outcomes; do not automatically duplicate dispatch requests after timeouts.
- Keep dialer links and cached guidance available independently of login or server availability where feasible.

Acceptance: expired share links stop revealing location; no provider acknowledgement means no dispatched-help claim.

#### B13. Community and moderation — only when launching the community

- Persistent posts, comments, edits, reactions, bookmarks, topic/vehicle filters, and cursor-paginated feeds.
- Unique user/post reaction constraints and atomic counters; support unlike rather than unlimited increments.
- Content ownership checks, reporting, blocking, rate limits, spam controls, and attachment checks.
- Moderation queue, reviewer decisions, appeal workflow, and audit records.
- Separate verified technical guidance from anecdotes; community posts never automatically enter the trusted diagnostic knowledge base.
- Procedures for harmful repair advice, harassment, exposed personal documents, and copyright complaints.

Acceptance: one account cannot inflate likes by replaying requests; blocked/removed material is excluded appropriately; moderator actions are permissioned and auditable.

#### B14. Administration, safety incidents, and support — launch requirement

- Least-privilege admin roles and MFA; no universal access through a hidden frontend URL.
- Tools to correct catalogs, review guides/translations, investigate failed jobs, resolve user reports, and withdraw unsafe advice.
- Audited, purpose-limited support access to user records; default to metadata rather than private document contents.
- Feature flags and kill switches for AI, acoustic output, uploads, or an unsafe guide revision.
- Safety incident intake, affected-result lookup, documented response ownership, and corrective communication.

Acceptance: a content editor cannot access private insurance files; an unsafe guide can be withdrawn without redeploying the frontend.

### 8.6 Advanced modules: audio and OBD are separate validation projects

#### B15. Acoustic processing and inference — conditional on validated capability

- Private upload pipeline tied to a vehicle/session and explicit recording consent.
- Metadata: duration, codec, sample rate, device characteristics where available, engine state, recording position, and user-reported operating conditions.
- Sandboxed decoding, bounded duration/size, clipping/silence/noise rejection, and supported-input checks.
- Versioned preprocessing and feature extraction; preserve enough metadata to reproduce a result without retaining recordings indefinitely.
- Queued inference with honest job states, cancellation, failure handling, and resource quotas.
- Model registry with supported vehicles/faults, training-data provenance, evaluation results, thresholds, rollout history, and rollback.
- A clearly separated dataset-labeling process with consent and qualified ground truth, preferably inspection-confirmed faults.
- Split evaluation by vehicle/recording session to avoid leakage from near-duplicate clips. Test across devices, noise, operating conditions, and unseen vehicles.
- Track false alarms, missed faults, calibration, and inconclusive rates by supported category; do not publish a single impressive accuracy number without context.
- Return unsupported or insufficient-quality rather than a forced diagnosis.

Limits: uncalibrated phone audio should not produce authoritative absolute sound-pressure dB readings. Do not infer precise valve clearance from a recording without evidence that the system can measure it. A general multimodal model is not automatically a validated mechanical acoustic classifier.

Acceptance: silence/noise/unsupported vehicles do not produce confident faults; saved results identify the actual model and pipeline; withheld test cases meet pre-agreed safety criteria before release.

#### B16. Device registry, telemetry ingestion, and OBD — conditional on compatible hardware

- Registry of supported adapters, transport types, firmware/protocol capabilities, and tested vehicle/year/market combinations.
- Explicit binding of adapter session to authorized user and vehicle; adapter names alone are not authentication.
- Client/native bridge reads permitted supported signals and trouble codes; backend accepts bounded authenticated batches.
- Each reading includes signal identifier, numeric value, unit, observed time, received time, sequence, session, source, and quality flags.
- Validate units, plausible ranges, timestamps, sequence/replays, batch sizes, and supported parameters; preserve unknown/invalid separately from zero.
- Deduplicate retries, accept documented out-of-order uploads, retain summaries, and expire unnecessary raw samples.
- Trouble-code definitions need applicable source/version; codes suggest investigation rather than confirm a replacement part.
- HUD query returns freshness, missing coverage, and evidence-linked warnings. It must never mark unavailable readings as healthy.
- Read-only initial integration: no clearing codes, actuator tests, ECU programming, or remote control.
- Partition/roll up telemetry only when actual volume requires it; do not prematurely introduce a second database.

Acceptance: disconnected data becomes stale; a repeated batch does not duplicate samples; unsupported signals remain unavailable; the app cannot issue arbitrary vehicle commands.

### 8.7 Cross-cutting production capabilities

#### B17. API contracts, validation, and consistency

- Versioned API schema/documentation, typed request/response contracts, consistent error codes, and bounded pagination.
- Server validation of enums, dates, units, costs, text lengths, identifiers, and relationship ownership.
- Optimistic concurrency using a record version or ETag; return a conflict instead of silently overwriting concurrent edits.
- Idempotency keys for service creation, uploads, exports, expensive analyses, and dispatch if ever supported; scope keys to actor/operation and compare payload hashes.
- Database constraints and transactions for membership, uniqueness, part references, and multi-record updates.
- Authenticate provider callbacks, check timestamps/signatures, prevent replay, and reconcile duplicated/out-of-order events.
- API resource limits, safe third-party responses, and SSRF protection if any URL fetching is introduced [S1].

#### B18. Offline synchronization and recovery

- Server-issued change cursors, entity versions, deletion tombstones, and deterministic conflict responses.
- Client-side durable mutation queue and locally generated operation IDs; replay only authorized outstanding changes.
- Treat service/history entries as independently identifiable events; never blindly last-write-wins important maintenance records.
- Revalidate access when reconnecting; revoked access must not permit queued writes.
- Show saved locally, syncing, saved to account, and failed distinctly.
- Logout/ownership changes must clear appropriate cached private data. Previously downloaded content cannot be remotely guaranteed erased; disclose this limitation.

#### B19. Privacy, retention, export, and deletion

- Data inventory and documented purpose for profile, documents, chat, audio, telemetry, and location.
- Versioned consent where applicable; separate core operation from optional training-data use and marketing.
- Data minimization and per-category retention schedules; no default indefinite location/audio storage.
- Export and deletion jobs cover primary records, object storage, derived files, embeddings, caches, and relevant processors.
- Backup expiry and restore procedures must respect deletion records so restored systems do not silently resurrect deleted accounts.
- Access-controlled audit evidence with bounded retention rather than logging full private payloads.
- Verify applicable Indian DPDP obligations, commencement/rules, age-related requirements, cross-border processing, and messaging restrictions before launch with qualified advice. These legal details were not verified by the retrievable sources in this research.

#### B20. Security and abuse prevention

- HTTPS, restrictive CORS, session/CSRF controls, appropriate security headers, least-privilege service identities, and encrypted managed storage/backups.
- Protect account, vehicle, file, export, and job endpoints with object-level checks, not only UI visibility [S1].
- Rate limits and spending ceilings for AI, uploads, OTP/email/SMS, and telemetry ingestion.
- Secret rotation and emergency revocation; no credentials, signed URLs, location payloads, or full private documents in logs [S10].
- Dependency updates, vulnerability checks, separate production/staging environments, and audited privileged access.
- Security review and abuse tests before collecting real sensitive documents or enabling shared access.

#### B21. Operations, observability, disaster recovery, and cost

- Structured redacted logs, correlation IDs, health/readiness checks, metrics, and alerts for error rate, latency, backlog, storage, provider spend, and delivery failures.
- Distinguish technical reliability metrics from diagnostic correctness and safety incident metrics.
- Reproducible deployment, schema migrations, staging smoke tests, backward-compatible releases, and rollback procedures.
- Automated encrypted database and object backups; choose recovery point/time targets, then test a full restore [S10 and PostgreSQL backup reference in section 8.15].
- Ensure backups include all authorized records; verify database-role/RLS behavior during backup and restore [S4].
- Set retention and quotas before unrestricted media/telemetry use.
- Model costs from active users, diagnoses/user, provider tokens, audio minutes, storage/egress, telemetry sampling, notifications, and operational staffing. No credible fixed cost estimate is possible without these inputs.

#### B22. Optional commercial/provider extensions — not required for the present core app

- Mechanic directory: verified providers, location/service coverage, contact accuracy, review moderation, and conflict-of-interest disclosure.
- Booking: provider availability, quote versions, acceptance, cancellation, no-show handling, and reconciliation.
- Payments/subscriptions only if selected: hosted checkout, server-verified receipts/webhooks, entitlements, refunds, invoicing, and dispute handling; never store raw card details.
- Parts pricing/catalog integration only through authorized sources; record fitment, region, stock timestamp, sponsorship, and uncertainty.
- Government vehicle records, insurance verification, recalls, and roadside dispatch require lawful access and real integrations. Do not assume public or free APIs exist.

### 8.8 Proposed logical data model

These are entity groups, not a demand for separate databases or immediately creating every table. Implement only entities needed for the enabled phase.

| Domain | Proposed entities | Important relationships/invariants |
|---|---|---|
| Identity | users, profiles, sessions, consent_records, preferences | Verified actor; versioned consent; timezone/locale |
| Catalog | vehicle_models, variants, part_definitions, applicability, catalog_revisions | Valid source/review state; explicit year/market fitment |
| Ownership | vehicles, vehicle_memberships, invitations, transfers | Instance distinct from catalog; scoped role grants |
| History | service_records, service_items, odometer_readings, milestones, record_revisions | vehicle_id required; exact money/unit handling |
| Maintenance | schedule_rules, vehicle_tasks, due_assessments | Evidence and rule version; time and mileage thresholds |
| Files | upload_intents, media_objects, vehicle_documents, derived_assets | Private keys; quarantine state; lifecycle |
| Knowledge | sources, guides, guide_versions, translations, review_decisions | Source/license; approved applicability; withdrawal |
| Diagnosis | diagnostic_sessions, answers, observations, results, feedback | Vehicle snapshot; rule/model/guide versions |
| AI | inference_requests, usage_records, model_configurations | Authorized context; quotas; no raw secrets |
| Audio | recordings, analysis_jobs, acoustic_results, dataset_consents | Separate inference and training permissions |
| Devices | adapters, device_sessions, telemetry_batches, samples, fault_codes | Owner/session-bound; sequence/time/unit/source |
| Learning | modules, questions, attempts, responses, progress | User and content-version scoped |
| Messaging | subscriptions, reminders, notification_occurrences, delivery_attempts | Preferences; deduplication; provider receipts |
| Community | posts, comments, reactions, reports, moderation_actions | Unique reaction; visibility/moderation state |
| SOS | regional_contacts, location_shares, assistance_requests | Short retention; expiry; real-provider status |
| Operations | outbox_events, jobs, audit_events, exports, deletion_requests | Retry safety; leases; access-controlled audit |

Use opaque stable IDs, foreign keys, unique constraints, indexed ownership/vehicle lookups, created/updated timestamps, and explicit versions. Keep server receipt time separate from user/device event time. Store dates such as document expiry as dates with defined jurisdictional interpretation, not arbitrary UTC-midnight timestamps. Demo fixtures must be marked and isolated from actual owner records.

### 8.9 Proposed API inventory

Illustrative routes under `/api/v1`; these do not currently exist. Authentication routes depend on the chosen identity solution. All private routes require authenticated object-level authorization, including nested resources and asynchronous results.

| Area | Proposed operations |
|---|---|
| Profile | GET/PATCH /me; GET/DELETE /me/sessions/{id}; PATCH /me/preferences |
| Catalog | GET /catalog/models; GET /catalog/variants/{id}; GET /catalog/variants/{id}/parts |
| Garage | GET/POST /vehicles; GET/PATCH/DELETE /vehicles/{id} |
| Membership | GET /vehicles/{id}/members; POST /vehicles/{id}/invitations; DELETE /vehicles/{id}/members/{memberId} |
| Service | GET/POST /vehicles/{id}/services; PATCH/DELETE /vehicles/{id}/services/{recordId} |
| Mileage/history | GET/POST /vehicles/{id}/odometer-readings; GET/POST/PATCH/DELETE milestone resources |
| Maintenance | GET /vehicles/{id}/maintenance; GET /vehicles/{id}/summary; POST /vehicles/{id}/tasks/{taskId}/completion |
| Files | POST /uploads; POST /uploads/{id}/complete; GET /documents/{id}/download; DELETE /documents/{id} |
| Guides | GET /guides?variantId=...&locale=...; GET /guides/{id}/versions/{version} |
| Diagnosis | POST /vehicles/{id}/diagnostic-sessions; POST /diagnostic-sessions/{id}/answers; POST /diagnostic-sessions/{id}/messages; GET /diagnostic-sessions/{id}/result |
| Analysis | POST /vehicles/{id}/audio-analyses; GET /jobs/{id}; POST /jobs/{id}/cancel |
| Telemetry | POST /vehicles/{id}/device-sessions; POST /device-sessions/{id}/batches; GET /vehicles/{id}/observations |
| Learning | GET /learning/modules; POST /learning/attempts; POST /learning/attempts/{id}/answers; GET /me/progress |
| Notifications | POST/DELETE /me/push-subscriptions; GET /me/notifications; POST /me/notifications/{id}/read |
| Community | GET/POST /posts; PATCH/DELETE /posts/{id}; POST /posts/{id}/comments; PUT/DELETE /posts/{id}/reaction; POST /reports |
| Emergency | GET /emergency/contacts?region=...; POST /location-shares; DELETE /location-shares/{id} |
| Data rights | POST /me/exports; GET /me/exports/{id}; POST /me/deletion-requests |
| Admin | Restricted review/publish/withdraw, moderation, incident, and job-recovery endpoints |

Contracts should include:

- Success only after the intended durable write; 202 Accepted plus a job ID for unfinished background work.
- Stable machine-readable error code, safe message, correlation ID, and retryability.
- Idempotency key and version/precondition where relevant; conflict responses instead of silent overwrites.
- Observation fields such as source, measured/reported/estimated/demo status, observedAt, freshness, unit, and quality.
- Diagnostic fields such as triage, hypotheses, evidence, limitations, next checks, source references, and model/rule/content versions.
- Cursor pagination and bounded filters rather than unbounded history downloads.

### 8.10 Critical end-to-end transaction flows

**Add and maintain a vehicle:** authenticated request -> catalog/custom-model validation -> vehicle and owner membership committed together -> server returns durable record -> every screen reads the same vehicle ID. A service save writes history, updates applicable task state, and emits an outbox event atomically. Notifications are subsequent jobs, not a reason to lose a saved service.

**Diagnose a problem:** authorize vehicle -> snapshot relevant context -> safety triage -> targeted questions -> retrieve applicable reviewed evidence -> optional AI explanation -> validate output -> persist traceable result -> show uncertain/unsupported outcomes honestly. Logging completed work requires a separate user action.

**Upload a document:** authorize intent -> upload to unique private staging object -> verify completion -> scan/parse in isolated worker -> mark available or rejected -> user confirms extracted expiry -> schedule reminder. Uploading an object is not equivalent to approving its contents.

**Process audio:** client records with permission -> private upload -> quality gate -> supported-model gate -> queued inference -> threshold/uncertainty checks -> persist result and provenance. Failures remain failures, not a fallback demo result.

**Receive telemetry:** local adapter connection -> authenticated session -> bounded sequenced batch -> validation/deduplication -> storage/summary -> HUD query. Loss of connection changes freshness, not a synthetic healthy status.

**Retry a notification:** worker acquires occurrence -> rechecks preferences/access -> sends with available provider deduplication -> records receipt -> reconciles ambiguous timeouts. Exactly-once external delivery cannot be assumed; minimize duplicates and preserve uncertain status.

### 8.11 Migration from the current frontend

| Existing code | Backend connection and required client change |
|---|---|
| src/data/vehicles.js | Import as unverified draft catalog fixtures; correct references and review before publication |
| src/App.jsx | Read canonical owned vehicles; maintain active ID; query vehicle-scoped records instead of global history |
| GarageView.jsx | Replace local list/forms with persistent CRUD and durable-save feedback |
| DiagnoseView.jsx | Remove misleading key/live flow; use diagnostic sessions and actual server responses |
| HudDiagnosticsView.jsx | Bind to evidence/freshness API; retain demonstration only in explicitly labeled mode |
| AcousticView.jsx | Add real client recording and job status; remove sample-based live-result claims |
| LearnView.jsx | Load applicable guide versions and persistent attempts/progress |
| CommunityView.jsx | Load paginated server feed; authenticated posts/reactions and reporting |
| ProfileView.jsx | Load current identity/preferences; implement client translation, unit conversion, and permission flows |
| DesignBoardView.jsx | Keep isolated read-only demo fixtures; do not accidentally create real records from showcase panels |

Do not silently upload browser data or an existing local API key during migration. Offer an explicit import with a preview and duplicate handling. Mechanical demo fixtures must not be migrated as verified facts.

### 8.12 Delivery phases and release gates

| Phase | Backend scope | Gate before progressing |
|---|---|---|
| A: reliable ownership MVP | B01-B06, minimal B07/B11/B14, B17-B21 as applicable | Cross-user isolation, durable history, secure uploads, retry safety, restore test |
| B: guidance and education | Full B07-B10 with reviewed supported vehicles | Expert-reviewed scenarios, evidence linkage, safe inconclusive outcomes, genuine progress |
| C: community and expanded sharing | B12-B13 and family access | Moderation staffing, revocation tests, location expiry, no false dispatch claims |
| D: controlled hardware/audio pilots | B15-B16 | Representative evaluation, tested compatibility, no confident results on unsupported inputs |
| E: optional commercial expansion | B22 | Real contracts, legal/security review, reconciliation and support readiness |

Security, privacy, backups, and monitoring are foundations, not features to postpone until phase E. An early launch may disable AI, community, audio, and OBD while delivering a fully functional maintenance product. Do not market disabled or experimental capabilities as production-ready.

### 8.13 Required verification checklist

- [ ] Sign-in, recovery, expiry, logout, and admin access tests.
- [ ] Cross-account ID substitution tests on every private resource, export, file, job, and stream.
- [ ] Family invitation, revocation, and ownership-transfer tests if sharing is enabled.
- [ ] Create/update/delete/reload tests for vehicles and all histories.
- [ ] Duplicate submission, concurrent update, interrupted upload, and worker-crash recovery tests.
- [ ] Time/mileage boundary, timezone, correction, and missing-data tests for maintenance.
- [ ] Upload content spoofing, oversized media, quarantine, signed-link expiry, and overwrite-race tests.
- [ ] Symptom/answer-sensitive diagnosis tests, safety red flags, missing sources, and provider failures.
- [ ] Prompt-injection and unauthorized tool-action tests using harmless fixtures.
- [ ] Quiz versioning, persistent grading, translations, and content-withdrawal tests.
- [ ] Notification opt-out, stale registrations, duplicate jobs, and uncertain-send recovery tests.
- [ ] Audio quality/unsupported-input rejection and independent model evaluation before audio launch.
- [ ] Telemetry replay, invalid units, wrong vehicle/session, disconnect, and stale-reading tests.
- [ ] Offline replay/conflicts, revoked membership while offline, and private cache clearing tests.
- [ ] Privacy export/deletion across objects, derived data, processors, and restored backups.
- [ ] Load tests with agreed user/media volume; cost/quota failure tests.
- [ ] Full restore rehearsal and rollback verification, including catalog and object references.

These are future acceptance checks. None is claimed as passed by the earlier frontend build/lint run.

### 8.14 Decisions and external blockers before implementation

1. Launch scope: maintenance-first product or broader diagnostic beta?
2. Initial supported vehicle models, years, and variants, with lawful source material and qualified reviewers.
3. Browser/PWA versus native companion strategy for adapters and background behavior.
4. Existing hosting/auth/storage choices, budget, expected users, uploads, and notification channels.
5. AI provider/model choice and approved data-processing terms; no automatic provider switch implied.
6. Whether owner audio may be used for research; default must not silently include training consent.
7. Hardware access and labeled recordings for genuine acoustic/OBD validation.
8. Family sharing, community moderation staffing, and support ownership.
9. Applicable legal review, data retention, recovery objectives, and incident response.
10. Real provider agreements before bookings, payments, official-record lookup, or roadside dispatch.

The biggest external blockers are reliable mechanical data, expert review, representative audio labels, adapter/vehicle testing, and real assistance partnerships. More backend code alone cannot replace them.

### 8.15 Research sources and limitations

Public sources consulted on 9 October 2026. Technical documentation supports the controls and platform boundaries below; it does not certify Enginium's mechanical advice or prescribe this complete architecture.

- **[S1] OWASP API Security Top 10 (2023):** object/property/function authorization, resource consumption, SSRF, inventory, and third-party API risks. https://owasp.org/API-Security/editions/2023/en/0x11-t10/
- **[S2] OWASP File Upload Cheat Sheet:** allowlists, content checks, size limits, authorized upload, isolated storage, and scanning. https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- **[S3] Amazon S3 presigned URLs:** time-limited bearer access, reuse before expiry, overwrite behavior, and checksums. https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
- **[S4] PostgreSQL row security:** policies, default deny when enabled without an applicable policy, privileged bypass, and backup considerations. https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- **[S5] MDN Web Bluetooth API:** limited browser availability, BLE/GATT scope, secure context, and user permission. https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API
- **[S6] MDN getUserMedia:** client-side media permission, secure contexts, and failure/ignored-permission handling. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- **[S7] Firebase messaging registration management:** server-side registration tracking, freshness, and invalid registration cleanup. SDK/API choices must be checked at implementation time. https://firebase.google.com/docs/cloud-messaging/manage-tokens
- **[S8] BullMQ idempotent jobs:** retry-safe final state and simple, atomic work units. This supports the pattern, not a mandatory queue-vendor choice. https://docs.bullmq.io/patterns/idempotent-jobs
- **[S9] OWASP LLM Prompt Injection Prevention:** untrusted retrieved content, least-privilege tools, validation, and defense in depth. https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
- **[S10] OWASP Secrets Management:** centralized lifecycle, least privilege, auditing, rotation/revocation, TLS, and recovery. https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- **Additional PostgreSQL reference:** SQL dumps, filesystem backup, and continuous archiving/PITR approaches. https://www.postgresql.org/docs/current/backup.html

Retrieval limitations: the Gemini API-key documentation timed out; the MeitY data-protection framework page returned no readable content, and an India Code request timed out. No provider-specific key policy, legal commencement date, legal deadline, or compliance certification is asserted from those unsuccessful requests. Verify current provider documentation and official Indian legal publications before deployment.

This was targeted public-document research, not an exhaustive review of every backend vendor or automotive standard. No private project data was submitted to an AI provider, no paid service was provisioned, and no backend was implemented as part of this documentation task.
