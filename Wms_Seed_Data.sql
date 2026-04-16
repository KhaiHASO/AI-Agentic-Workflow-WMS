-- SEED DATA FOR EPE WMS - COVERING 18 SCENARIOS
-- ====================================================================================

-- 1. MASTER DATA (MDM)
INSERT INTO mdm.Uom (Code, Name) VALUES ('PCS', 'Cái/Chiếc'), ('BOX', 'Thùng/Hộp'), ('ROLL', 'Cuộn');

INSERT INTO mdm.InventoryStatus (StatusCode, IsAllocatable) VALUES 
('Available', 1), ('QA Hold', 0), ('Damaged', 0), ('Blocked', 0);

INSERT INTO mdm.ReasonCode (Code, Type, Description) VALUES 
('SHORT', 'Inbound', 'Giao thiếu hàng'), ('DAMAGED', 'Inbound', 'Hàng móp méo'), 
('SUB', 'Inbound', 'Hàng thay thế'), ('FEFO_OVR', 'Outbound', 'Ghi đè quy tắc FEFO'), 
('CYC_VAR', 'Adjustment', 'Chênh lệch kiểm kê');

INSERT INTO mdm.Supplier (Code, Name) VALUES ('SUP-FAST-01', 'Công ty Cung ứng Toàn Cầu'), ('SUP-EPE-02', 'Nhà máy Sản xuất EPE');
INSERT INTO mdm.Customer (Code, Name) VALUES ('CUS-RETAIL-01', 'Hệ thống Bán lẻ WinMart'), ('CUS-EXPORT-02', 'Đối tác Xuất khẩu Nhật Bản');

-- Item A: Hàng chuẩn
INSERT INTO mdm.Item (ItemCode, Name, BaseUomId, IsLotControlled, IsSerialControlled, ShelfLifeDays, PickStrategy)
SELECT 'SKU-A', 'Hàng chuẩn - Máy in HP', Id, 0, 0, NULL, 'FIFO' FROM mdm.Uom WHERE Code = 'PCS';

-- Item B: Hàng Lot/FEFO
INSERT INTO mdm.Item (ItemCode, Name, BaseUomId, IsLotControlled, IsSerialControlled, ShelfLifeDays, PickStrategy)
SELECT 'SKU-B', 'Hàng Lot/Date - Mực in (FEFO)', Id, 1, 0, 180, 'FEFO' FROM mdm.Uom WHERE Code = 'PCS';

-- Item C: Hàng quy đổi
INSERT INTO mdm.Item (ItemCode, Name, BaseUomId, IsLotControlled, IsSerialControlled, ShelfLifeDays, PickStrategy)
SELECT 'SKU-C', 'Hàng quy đổi - Giấy cuộn', Id, 0, 0, NULL, 'FIFO' FROM mdm.Uom WHERE Code = 'ROLL';

-- Item D & DP: Hàng thay thế
INSERT INTO mdm.Item (ItemCode, Name, BaseUomId, IsLotControlled, IsSerialControlled, ShelfLifeDays, PickStrategy)
SELECT 'SKU-D', 'Hàng chính - Chip điều khiển', Id, 0, 0, NULL, 'FIFO' FROM mdm.Uom WHERE Code = 'PCS';
INSERT INTO mdm.Item (ItemCode, Name, BaseUomId, IsLotControlled, IsSerialControlled, ShelfLifeDays, PickStrategy)
SELECT 'SKU-DP', 'Hàng thay thế - Chip v2.0', Id, 0, 0, NULL, 'FIFO' FROM mdm.Uom WHERE Code = 'PCS';

-- Quy đổi 1 BOX = 10 ROLL cho SKU-C
INSERT INTO mdm.UomConversion (FromUomId, ToUomId, ItemId, ConversionRate)
SELECT u1.Id, u2.Id, i.Id, 10.0 FROM mdm.Uom u1, mdm.Uom u2, mdm.Item i 
WHERE u1.Code = 'BOX' AND u2.Code = 'ROLL' AND i.ItemCode = 'SKU-C';

-- Warehouse & Zone
INSERT INTO mdm.Warehouse (Code, Name, Address) VALUES ('WH-MAIN', 'Kho chính EPE', 'KCN Vsip 1');
INSERT INTO mdm.Zone (WarehouseId, ZoneCode, ZoneType) 
SELECT Id, 'Z-INBOUND', 'Inbound' FROM mdm.Warehouse WHERE Code = 'WH-MAIN' UNION
SELECT Id, 'Z-STORAGE', 'Storage' FROM mdm.Warehouse WHERE Code = 'WH-MAIN' UNION
SELECT Id, 'Z-QA', 'Storage' FROM mdm.Warehouse WHERE Code = 'WH-MAIN' UNION
SELECT Id, 'Z-OUTBOUND', 'Outbound' FROM mdm.Warehouse WHERE Code = 'WH-MAIN';

-- Locations
INSERT INTO mdm.Location (WarehouseId, ZoneId, Code, Status)
SELECT w.Id, z.Id, 'LOC-IN-001', 'Active' FROM mdm.Warehouse w, mdm.Zone z WHERE w.Code = 'WH-MAIN' AND z.ZoneCode = 'Z-INBOUND';
INSERT INTO mdm.Location (WarehouseId, ZoneId, Code, Status)
SELECT w.Id, z.Id, 'LOC-ST-001', 'Active' FROM mdm.Warehouse w, mdm.Zone z WHERE w.Code = 'WH-MAIN' AND z.ZoneCode = 'Z-STORAGE';
INSERT INTO mdm.Location (WarehouseId, ZoneId, Code, Status)
SELECT w.Id, z.Id, 'LOC-ST-002', 'Active' FROM mdm.Warehouse w, mdm.Zone z WHERE w.Code = 'WH-MAIN' AND z.ZoneCode = 'Z-STORAGE';
INSERT INTO mdm.Location (WarehouseId, ZoneId, Code, Status)
SELECT w.Id, z.Id, 'LOC-QA-001', 'Active' FROM mdm.Warehouse w, mdm.Zone z WHERE w.Code = 'WH-MAIN' AND z.ZoneCode = 'Z-QA';
INSERT INTO mdm.Location (WarehouseId, ZoneId, Code, Status)
SELECT w.Id, z.Id, 'LOC-OUT-001', 'Active' FROM mdm.Warehouse w, mdm.Zone z WHERE w.Code = 'WH-MAIN' AND z.ZoneCode = 'Z-OUTBOUND';

-- ERP Stage: PO
INSERT INTO erp_stage.ErpPurchaseOrderHeader (PoNumber, SupplierId, ExpectedDate, ErpStatus)
SELECT 'PO-2026-001', Id, GETDATE(), 'Open' FROM mdm.Supplier WHERE Code = 'SUP-FAST-01';
INSERT INTO erp_stage.ErpPurchaseOrderLine (PoHeaderId, [LineNo], ItemId, UomId, OrderedQty, OpenQty)
SELECT h.Id, 1, i.Id, u.Id, 100, 100 FROM erp_stage.ErpPurchaseOrderHeader h, mdm.Item i, mdm.Uom u WHERE h.PoNumber = 'PO-2026-001' AND i.ItemCode = 'SKU-A' AND u.Code = 'PCS';

INSERT INTO erp_stage.ErpPurchaseOrderHeader (PoNumber, SupplierId, ExpectedDate, ErpStatus)
SELECT 'PO-2026-002', Id, GETDATE(), 'Open' FROM mdm.Supplier WHERE Code = 'SUP-EPE-02';
INSERT INTO erp_stage.ErpPurchaseOrderLine (PoHeaderId, [LineNo], ItemId, UomId, OrderedQty, OpenQty)
SELECT h.Id, 1, i.Id, u.Id, 50, 50 FROM erp_stage.ErpPurchaseOrderHeader h, mdm.Item i, mdm.Uom u WHERE h.PoNumber = 'PO-2026-002' AND i.ItemCode = 'SKU-B' AND u.Code = 'PCS';

INSERT INTO erp_stage.ErpPurchaseOrderHeader (PoNumber, SupplierId, ExpectedDate, ErpStatus)
SELECT 'PO-2026-003', Id, GETDATE(), 'Open' FROM mdm.Supplier WHERE Code = 'SUP-FAST-01';
INSERT INTO erp_stage.ErpPurchaseOrderLine (PoHeaderId, [LineNo], ItemId, UomId, OrderedQty, OpenQty)
SELECT h.Id, 1, i.Id, u.Id, 10, 10 FROM erp_stage.ErpPurchaseOrderHeader h, mdm.Item i, mdm.Uom u WHERE h.PoNumber = 'PO-2026-003' AND i.ItemCode = 'SKU-C' AND u.Code = 'BOX';

-- ERP Stage: SO
INSERT INTO erp_stage.ErpSalesOrderHeader (SoNumber, CustomerId, ExpectedDate, ErpStatus)
SELECT 'SO-2026-001', Id, GETDATE(), 'Open' FROM mdm.Customer WHERE Code = 'CUS-RETAIL-01';
INSERT INTO erp_stage.ErpSalesOrderLine (SoHeaderId, [LineNo], ItemId, UomId, OrderedQty, OpenQty)
SELECT h.Id, 1, i.Id, u.Id, 10, 10 FROM erp_stage.ErpSalesOrderHeader h, mdm.Item i, mdm.Uom u WHERE h.SoNumber = 'SO-2026-001' AND i.ItemCode = 'SKU-A' AND u.Code = 'PCS';
GO
