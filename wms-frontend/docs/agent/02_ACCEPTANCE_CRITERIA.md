# 02_ACCEPTANCE_CRITERIA

## 1. Functional Gates
- [ ] **ERP Sync:** Successfully fetch mock POs/SOs and update local snapshot.
- [ ] **Inbound Draft:** Ability to scan barcodes and auto-match to PO lines.
- [ ] **Exceptions:** UI must allow splitting lines, marking items as "Error", and handling "Substitute Items".
- [ ] **Putaway:** Generate and confirm tasks to move stock to specific locations.
- [ ] **Picking:** Guide users to correct locations and require barcode confirmation.
- [ ] **Ledger:** Every action must generate an entry in the immutable inventory ledger.
- [ ] **Cycle Count:** Support blind counting where system quantity is hidden until submission.

## 2. Visual & UX Gates
- [ ] **Theme:** High-quality SaaS dashboard style matching reference images.
- [ ] **Warehouse Map:** SVG-based interactive map showing real-time shelf/robot/warning states.
- [ ] **Components:** Consistent use of cards, buttons, and typography.
- [ ] **Vietnamese Localization:** 100% of UI text must be in Vietnamese.

## 3. Responsive & Mobile-First Gates
- [ ] **Breakpoints:** Tested and functional at 360px, 390px, 430px, 768px, 1024px, 1440px.
- [ ] **Touch Optimization:** Buttons must be at least 44x44px; critical scanner actions must be 1-2 taps away.
- [ ] **Sticky Actions:** Primary buttons (Submit, Scan) must be easily accessible (fixed/bottom).

## 4. Technical & Handover Gates
- [ ] **Build:** `npm run build` passes with zero errors.
- [ ] **Docker:** App runs successfully within the provided Docker container.
- [ ] **Documentation:** Complete README, handover guide, and UAT evidence.
- [ ] **Idempotency:** Re-submitting the same transaction (mock) must not duplicate ledger entries.
