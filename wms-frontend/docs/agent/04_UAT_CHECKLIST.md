# 04_UAT_CHECKLIST

## Phase 1: Core Integration & Inbound
- [ ] **UC-01 Master Sync:** Fetch items and locations from ERP.
- [ ] **UC-02 PO Sync:** Pull open POs for a specific vendor.
- [ ] **UC-03 Master Receipt:** Group multiple POs into one receiving session.
- [ ] **UC-04 Scan-to-Draft:** Scan item barcodes to fill the Draft table.
- [ ] **UC-05 Inbound Exceptions:** Resolve a partial receipt and an over-receipt.
- [ ] **UC-07 UoM/Substitute:** Receive an item in "Box" unit and map a substitute item.
- [ ] **UC-09 Submit Draft:** Finalize receipt, generate GRN mock, and create Putaway tasks.

## Phase 2: Internal & Outbound
- [ ] **UC-10 Putaway:** Complete a task to move stock from "Inbound Stage" to "Rack A-01".
- [ ] **UC-11 SO Sync:** Pull sales orders and check stock allocation.
- [ ] **UC-12 Scan-to-Pick:** Navigate to location, scan item, and confirm pick.
- [ ] **UC-13 Cycle Count:** Perform a blind count on Location B-02.
- [ ] **UC-14 Dashboard:** Verify real-time inventory levels and workload charts.
- [ ] **UC-15 Audit/Retry:** View log of a failed (simulated) API call and retry it.
