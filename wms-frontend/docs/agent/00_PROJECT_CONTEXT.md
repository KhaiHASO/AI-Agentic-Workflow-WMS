# 00_PROJECT_CONTEXT - WMS EPE

## 1. System Purpose
The EPE Smart Warehouse Management System (EPE-SWMS) is a specialized warehouse execution platform designed to standardize operations via barcode/mobile scanning. It bridges the gap between flexible physical warehouse operations and rigid ERP financial records.

## 2. Integration Model (ERP FAST)
- **ERP FAST:** System of Record for financial, PO, and SO documents.
- **WMS:** Independent execution system.
- **Interface:** WMS reads from ERP via sync/views and pushes standardized results (GRN, Goods Issue) via API/Stored Procedures.
- **Mechanism:** Idempotent communication to prevent duplicate records.

## 3. Application Architecture
- **Web Admin:** Dashboard for management, master data configuration, role management, and integration audit.
- **Mobile/Scanner App:** Optimized for high-speed field operations (1-2 tap rule), focusing on barcode scanning and exception handling.

## 4. Core MVP Scope
- **Master Data:** Items, Barcodes, UoM, Locations (Warehouse/Zone/Aisle/Rack/Bin).
- **ERP Sync:** Automatic/manual sync of POs, SOs, and Master Data.
- **Dynamic Inbound:** Consolidation of POs, Scan-to-Draft, Exception Handling (Partial, Over, Error, Substitute).
- **Putaway:** Post-receipt task management to specific locations.
- **Outbound:** Reservation, Allocation (FIFO/FEFO), and Scan-to-Pick.
- **Inventory:** Real-time on-hand tracking, Inventory Ledger (immutable transactions).
- **Cycle Count:** Scheduled/blind counting via mobile scanners.
- **Dashboard:** Operational KPIs and integration status alerts.

## 5. Key Workflows
- **ERP Sync:** WMS pulls open POs/SOs and caches them locally for offline-safe scanning.
- **Dynamic Inbound via Draft:** Multiple POs -> Master Receipt -> Draft Area (Scan & Match) -> Exception Resolution -> Submit (Tăng tồn + Push GRN).
- **Scan-to-Pick:** Pick task generation -> Suggest location/lot -> Scan confirmation -> Shipment push.
- **Inventory Ledger:** Every movement (In/Out/Move/Adjust) creates a traceable transaction record.
