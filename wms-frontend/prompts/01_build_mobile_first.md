You are a senior React + Bootstrap frontend engineer building a client-ready WMS frontend.

Before coding:
1. Read all files in ./docs/agent.
2. Read all files in ./docs/source.
3. Inspect all images in ./references.
4. Use docs/agent/01_TRACEABILITY_MATRIX.md and docs/agent/02_ACCEPTANCE_CRITERIA.md as your source of truth.

Technology:
- React + Vite
- Bootstrap 5
- React Bootstrap if helpful
- Plain CSS/SCSS for exact UI
- Recharts or Chart.js for charts
- Lucide React or React Icons for icons
- No Tailwind
- Mock data only; no real backend required yet

Product direction:
This is not just a pretty dashboard. It is a WMS frontend for ERP FAST integration and warehouse operation.
It must include both:
1. Web Admin experience
2. Mobile/Scanner experience

Build requirements:

A. Web Admin Dashboard
Create a premium warehouse dashboard inspired by the reference image:
- Top navigation
- KPI cards
- Warehouse map
- Robot/task/status cards
- Realtime inventory summary
- Inbound/outbound workload
- Alerts
- Integration status
- Charts
- Clean SaaS style

B. Mobile/Scanner App
Create a mobile-first scanner workflow with routes/screens:
- Login/device selection mock
- Home task list
- Inbound Master Receipt list
- Create Master Receipt
- Scan-to-Draft screen
- Draft line detail
- Inbound exception handling
- Putaway task
- Outbound pick task
- Scan-to-pick screen
- Cycle count screen
- Dashboard mini view for supervisor

Mobile/scanner UX rules:
- Design mobile first from 360px width.
- Core scanner actions must require 1–2 taps.
- Use large readable typography.
- Touch targets should be large and easy for warehouse workers.
- Primary action should be sticky at bottom on mobile.
- Draft lines must use clear status colors:
  green = done/accepted
  yellow = partial/warning
  red = exception/error
  gray = pending/disabled
- The scan input area must be visually dominant.
- Show clientTxnId / retry / offline-safe mock hints where relevant.
- Use realistic mock scan events.
- Do not create a desktop-only UI.

C. Business workflows to represent in UI
Implement mock flows for:
- ERP master/PO/SO sync status
- Master Receipt creation by supplier/vehicle
- Dynamic inbound Draft
- Scan-to-Draft
- Partial receipt
- Over receipt warning/approval
- Unexpected item
- QA Hold / Quarantine
- Return to Vendor
- UoM conversion
- Substitute item approval
- Submit Draft
- Putaway
- SO allocation
- Pick task
- Scan-to-pick
- Cycle count
- Dashboard alerts
- Integration retry/audit log

D. Data and API mock
Create:
src/data/mockData.js
src/data/mockApi.js

Mock data must include:
- users, roles, devices
- suppliers, customers
- items, barcodes, UoM conversions
- warehouses, zones, locations
- purchase orders
- sales orders
- master receipts
- draft lines
- scan events
- putaway tasks
- pick tasks
- inventory on hand
- inventory ledger
- quality/quarantine records
- integration logs
- dashboard KPIs

E. Client-ready setup
Create or update:
- README.md
- .env.example
- scripts/setup.ps1
- scripts/setup.sh
- scripts/audit.ps1
- scripts/audit.sh
- Dockerfile
- docker-compose.yml

README must include:
- prerequisites
- install
- run dev
- build
- preview
- docker run
- project structure
- mock data location
- implemented features
- mobile testing guide
- handover notes

F. Package scripts
Ensure package.json has:
- dev
- build
- preview
- lint
- test if available
- audit:local

G. Acceptance
After implementation:
1. Run npm install if needed.
2. Run npm run build.
3. Fix all errors.
4. Run npm run lint if configured.
5. Review mobile breakpoints manually through CSS/responsive design.
6. Update docs/agent/01_TRACEABILITY_MATRIX.md status.
7. Update docs/agent/06_ITERATION_LOG.md with what was completed and what remains.

Do not stop at generic screens.
Every screen must clearly connect to WMS requirements.
If a requirement is not implemented, mark it clearly as TODO with reason.