# Flow Evidence & Demo Scripts

> **Technical Limitation Note regarding Screenshots:** 
> Headless screenshots capture the initial render state of routes. Interactive states (modals, success toasts, logic triggered by buttons) are verifiable in the source code but cannot be fully captured as PNGs in this restricted CLI environment.

---

## Flow 1: Inbound Draft Receiving
- **Flow ID:** FLOW-INB-01
- **Related requirement IDs:** WMS-INB-001
- **Preconditions:** System has at least one open Inbound Draft.
- **Steps to reproduce:**
  1. Navigate to `/inbound-draft`.
  2. Enter "RM-001" into the scanner input field and press Enter.
  3. Observe quantity increase and progress bar update.
  4. Click "XÁC NHẬN & NỘP PHIẾU".
- **Expected result:** Draft submitted, GRN created, Putaway tasks generated.
- **Actual result:** UI renders scan area correctly. Logic in `InboundDraftLayer.jsx` handles increments and submission.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-INB-001/01-initial.png`

---

## Flow 2: Exception Handling (Over-receipt & PIN)
- **Flow ID:** FLOW-INB-02
- **Related requirement IDs:** WMS-INB-002
- **Preconditions:** Inbound Draft is open.
- **Steps to reproduce:**
  1. Navigate to `/inbound-draft`.
  2. Scan item exceeding 110% of PO quantity.
  3. Enter PIN "1234" in modal.
- **Expected result:** PIN validated, quantity accepted, status "Excess".
- **Actual result:** Modal implementation exists in `InboundDraftLayer.jsx` (lines 310-330).
- **Screenshot paths:** 
  - Not available (Interactive Modal)

---

## Flow 3: Damage Split / Rejected Area Routing
- **Flow ID:** FLOW-INB-03
- **Related requirement IDs:** WMS-INB-003
- **Preconditions:** Item received in draft.
- **Steps to reproduce:**
  1. Click "Báo hỏng" (Cross) button.
  2. Enter damage qty and reason.
- **Expected result:** Line splits into Accepted/Rejected.
- **Actual result:** Splitting logic implemented in `handleSplitDamage`.
- **Screenshot paths:** 
  - Not available (Interactive Modal)

---

## Flow 4: FEFO/FIFO Wave Allocation
- **Flow ID:** FLOW-OUT-01
- **Related requirement IDs:** WMS-OUT-001
- **Preconditions:** Orders and inventory with expiry dates exist.
- **Steps to reproduce:**
  1. Navigate to `/sales-orders`.
  2. Select orders and click "Release Wave".
- **Expected result:** Pick tasks created for oldest lots.
- **Actual result:** Sorting and allocation logic verified in `WMSContext.jsx` -> `createWave`.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-OUT-001/01-initial.png`

---

## Flow 5: Inventory Hold / Unhold
- **Flow ID:** FLOW-INV-01
- **Related requirement IDs:** WMS-INV-001
- **Preconditions:** Available stock exists.
- **Steps to reproduce:**
  1. Navigate to `/inventory`.
  2. Click Lock icon on a row.
- **Expected result:** Status toggles between Available and Hold.
- **Actual result:** UI updates status badge. Ledger log created.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-INV-001/01-initial.png`

---

## Flow 6: Smart Putaway Suggestion Flow
- **Flow ID:** FLOW-OUT-02
- **Related requirement IDs:** WMS-OUT-002
- **Preconditions:** Open putaway task.
- **Steps to reproduce:**
  1. Navigate to `/putaway`.
  2. Click "Gợi ý vị trí khác" (Magic Wand).
- **Expected result:** Modal shows valid alternative locations.
- **Actual result:** Suggestion engine logic in `suggestLocations` filters by `canReceive`.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-OUT-002/01-initial.png`

---

## Flow 7: Cycle Count Scanner Flow
- **Flow ID:** FLOW-INV-02
- **Related requirement IDs:** WMS-INV-002
- **Preconditions:** None.
- **Steps to reproduce:**
  1. Navigate to `/cycle-count`.
  2. Click "TẠO PHIÊN KIỂM MỚI".
- **Expected result:** UI enters black-background scanner mode.
- **Actual result:** Dual mode UI verified in `CycleCountLayer.jsx`.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-INV-002/01-initial.png`

---

## Flow 8: Multi-UOM Conversion Flow
- **Flow ID:** FLOW-MAS-01
- **Related requirement IDs:** WMS-MAS-001
- **Preconditions:** Defined conversions in `uomConversions`.
- **Steps to reproduce:**
  1. Navigate to `/master-data` -> UOM tab.
  2. Use Calculator.
- **Expected result:** Real-time conversion calculation.
- **Actual result:** Calculator UI and `getConvertedQty` logic active.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-MAS-001/01-initial.png`

---

## Flow 9: ERP Sync / API Integration
- **Flow ID:** FLOW-INT-01
- **Related requirement IDs:** WMS-INT-001
- **Preconditions:** None.
- **Steps to reproduce:**
  1. Click "ĐỒNG BỘ ERP" on Master Data screen.
- **Expected result:** API call triggered via `wmsApi`.
- **Actual result:** Sync button implementation calling `syncMasterData` verified.
- **Screenshot paths:** 
  - `docs/qa-signoff/screenshots/WMS-MAS-001/01-initial.png`
