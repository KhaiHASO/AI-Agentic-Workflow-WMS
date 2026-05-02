You are now the QA lead, frontend lead, and delivery manager for this WMS frontend.

Your job is to audit the current implementation against:
- docs/source/*
- docs/agent/01_TRACEABILITY_MATRIX.md
- docs/agent/02_ACCEPTANCE_CRITERIA.md
- docs/agent/03_MOBILE_FIRST_CHECKLIST.md
- docs/agent/04_UAT_CHECKLIST.md
- docs/agent/05_HANDOVER_CHECKLIST.md
- reference images in ./references

You must perform an audit-fix loop.

Loop process:
1. Inspect current source code.
2. Run:
   npm install if needed
   npm run build
   npm run lint if available
   npm run test if available
3. Check functional coverage.
4. Check mobile-first coverage.
5. Check visual quality against reference images.
6. Check WMS business traceability.
7. Check client handover readiness.
8. Write findings into docs/agent/06_ITERATION_LOG.md.
9. Fix all failed items.
10. Repeat the audit mentally and by commands until all critical items are PASS.

Audit gates:

Gate 1 — Build quality
- npm run build passes
- no broken imports
- no runtime crash
- no missing core components
- no console-blocking errors

Gate 2 — WMS requirement coverage
Must have screens/components for:
- Dashboard
- ERP sync status
- Location/warehouse layout
- Inbound Master Receipt
- Dynamic Draft
- Scan-to-Draft
- Exception handling
- Putaway
- Outbound pick
- Scan-to-pick
- Inventory realtime
- Cycle count
- Quality/Hold/Quarantine
- Integration audit/retry

Gate 3 — Mobile-first UX
Must pass:
- 360px layout usable
- 390px layout usable
- 430px layout usable
- 768px tablet layout usable
- Touch targets are large
- Sticky primary actions on scanner screens
- Core scan flow works with 1–2 taps
- No important table is unusable on mobile
- Desktop dashboard can stack or scroll cleanly on mobile

Gate 4 — Visual quality
Must pass:
- Close to premium SaaS reference
- Clean spacing
- Consistent cards
- Soft shadows
- Clear color states
- Warehouse map is component-based, not screenshot background
- Charts are real components
- Icons consistent

Gate 5 — Business realism
Must pass:
- Mock data feels like WMS, not random dashboard data
- Scan events include clientTxnId/idempotency hints
- Inventory ledger exists in mock
- Integration logs exist in mock
- Draft statuses are meaningful
- Exception states are represented
- Dashboard KPIs come from mock data

Gate 6 — Handover
Must pass:
- README complete
- setup.ps1 works logically
- setup.sh works logically
- .env.example exists
- Dockerfile exists
- docker-compose.yml exists
- UAT checklist exists
- Traceability matrix updated
- Known limitations documented

If any gate fails:
- Fix the code or docs.
- Update iteration log.
- Do not claim complete.

When all gates pass:
- Write a final PASS summary in docs/agent/06_ITERATION_LOG.md.
- Print a concise delivery summary:
  - build status
  - mobile status
  - UAT status
  - handover status
  - remaining known limitations if any