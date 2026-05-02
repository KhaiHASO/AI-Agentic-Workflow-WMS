# 01_TRACEABILITY_MATRIX

| ID | Requirement (Source: BRD/SRS/UC) | Business Meaning | Affected Screen/Component | Affected Data/Mock | Priority | Status |
|----|---------------------------------|------------------|---------------------------|--------------------|----------|--------|
| R01| ERP Master Sync | Sync Items, Barcodes, UoM | Web Admin Sync Panel | `mockData.js`, Master API | Must | Done |
| R02| PO Sync | Pull Open POs for Inbound | Inbound Dashboard | PO Snapshot | Must | Done |
| R03| Warehouse Layout | Manage Zones/Locations | Layout Config Screen | Location Model | Must | Done |
| R04| Dynamic Inbound | Consolidate multiple POs | Master Receipt View | Receipt Header/Line | Must | Done |
| R05| Scan-to-Draft | Real-time scan matching | Mobile Draft Screen | ScanEvent Log | Must | Done |
| R06| Inbound Exception | Handle Short/Over/Error | Draft Exception UI | Exception Reason Codes | Must | Done |
| R07| Putaway | Move from Staging to Bin | Putaway Mobile Task | Inventory Ledger | Must | In Progress |
| R08| SO Sync | Pull Open SOs for Outbound | Outbound Dashboard | SO Snapshot | Must | In Progress |
| R09| Allocation (FIFO/FEFO)| Suggest lot/location | Pick Task Generation | Allocation Logic | Should | Not Started |
| R10| Scan-to-Pick | Confirm pick via scan | Mobile Picking Screen | Pick Confirmation | Must | In Progress |
| R11| Inventory Ledger | Immutable transaction log | Stock Movement Report | `inventoryLedger` | Must | Done (Mock) |
| R12| Real-time Inventory| On-hand by Location/Lot | Dashboard / Stock View | `onHandBalance` | Must | Done |
| R13| Cycle Count | Blind/Guided count | Mobile Count Screen | Adjustment Review | Should | Not Started |
| R14| QA Hold/Quarantine | Block stock from picking | Status Change UI | Stock Status | Should | Not Started |
| R15| Integration Audit | Log & Retry API calls | Integration Panel | Outbox/Log | Must | Done (Mock) |
| R16| Mobile-first UX | Optimized scanner UI | Entire Mobile App | Responsive CSS | Must | Done |
| R17| Warehouse Map | Visual SVG schematic | Dashboard Map | Map Components | Must | Done |
| R18| Routing & Auth | Web vs Mobile navigation | Router / App.jsx | Mock Auth | Must | Done |
