You are a senior BA + solution architect + frontend lead for a WMS project.

Your first task is NOT to code. Your first task is to read and understand all project materials.

Input folders:
- ./docs/source contains BRD/SRS, detailed specification, use case, API, UAT documents.
- ./references contains all UI reference images.

You must:
1. Read every .docx, .pdf, .md, .txt file inside ./docs/source.
2. Inspect every image inside ./references.
3. Create the following files:

docs/agent/00_PROJECT_CONTEXT.md
- Summarize the system purpose.
- Explain that this is a WMS integrated with ERP FAST.
- Explain Web Admin vs Mobile/Scanner App.
- Explain the Core MVP scope.
- Explain the key workflows:
  ERP sync, master data, location management, inbound Draft, putaway, outbound scan-to-pick, inventory ledger, cycle count, dashboard, integration audit.

docs/agent/01_TRACEABILITY_MATRIX.md
Create a traceability matrix with columns:
- Requirement ID
- Source document
- Business meaning
- Screen/component affected
- Data/mock/API affected
- Priority: Must/Should/Could
- Status: Not Started / In Progress / Done / Needs Review

The matrix must cover at least:
- ERP Sync
- User/role/device
- Warehouse/location layout
- Inbound Master Receipt
- Dynamic Inbound Draft
- Scan-to-Draft
- Inbound exception handling
- Putaway
- Outbound SO sync
- Reservation/allocation
- Scan-to-pick
- Inventory ledger
- Real-time inventory
- Cycle count
- Quality/Hold/Quarantine
- Dashboard and alerts
- Integration audit/retry/idempotency
- Mobile/Scanner UI

docs/agent/02_ACCEPTANCE_CRITERIA.md
Create clear pass/fail acceptance criteria for the frontend.
Include functional, visual, responsive, mobile-first, performance, handover, and UAT criteria.

docs/agent/03_MOBILE_FIRST_CHECKLIST.md
Create a mobile/scanner checklist.
Must include:
- 360px, 390px, 430px, 768px, 1024px, 1440px checks
- Large touch targets
- Font readability
- 1–2 tap rule for core scanner actions
- Scan event UX
- Draft line status colors
- Offline/retry/idempotency UI hints
- No desktop-only blocking behavior
- Bottom action bar or sticky primary actions on mobile
- Fast exception actions

docs/agent/04_UAT_CHECKLIST.md
Create UAT checklist mapped to use cases.
Must cover:
- UC-01 Master data sync
- UC-02 PO sync
- UC-03 Master Receipt
- UC-04 Scan to Draft
- UC-05 Inbound exceptions
- UC-06 QA Hold / Return
- UC-07 UoM / Substitute item
- UC-09 Submit Draft / GRN / Backorder
- UC-10 Putaway
- UC-11 SO sync / Pick task
- UC-12 Scan-to-pick
- UC-13 Cycle count
- UC-14 Dashboard
- UC-15 Integration audit/retry

docs/agent/05_HANDOVER_CHECKLIST.md
Create a client handover checklist.
Must include:
- README
- install guide
- run guide
- build guide
- environment file
- mock data guide
- Docker option
- screenshots
- UAT evidence folder
- known limitations
- browser/mobile support
- demo script
- change log

docs/agent/06_ITERATION_LOG.md
Create an iteration log template:
- Iteration number
- What was checked
- Failed items
- Fixes applied
- Remaining issues
- Build status
- Mobile status
- UAT status
- Handover status

Important:
Do not start coding yet.
At the end, print a short summary of what documents were read and what agent files were created.