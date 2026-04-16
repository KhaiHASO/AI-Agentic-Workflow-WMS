// Mock ERP Fast Data - Synchronized with SQL Server WMS Schema
// Path: frontend/src/mockData/erp/erpOrders.js

export const MOCK_ERP_PURCHASE_ORDERS = [
  {
    po_number: "PO-ERP-2026-001",
    supplier_code: "SUP-FAST-01", // Khớp với mdm.Supplier
    supplier_name: "Công ty Cung ứng Toàn Cầu",
    expected_date: "2026-04-20",
    status: "Released",
    items: [
      { line_no: 1, item_code: "SKU-A", name: "Hàng chuẩn - Máy in HP", uom: "PCS", qty: 100, open_qty: 100 },
      { line_no: 2, item_code: "SKU-B", name: "Hàng Lot/Date - Mực in (FEFO)", uom: "PCS", qty: 50, open_qty: 50 },
    ]
  },
  {
    po_number: "PO-ERP-2026-002",
    supplier_code: "SUP-EPE-02", // Khớp với mdm.Supplier
    supplier_name: "Nhà máy Sản xuất EPE",
    expected_date: "2026-04-21",
    status: "Released",
    items: [
      { line_no: 1, item_code: "SKU-C", name: "Hàng quy đổi - Giấy cuộn", uom: "BOX", qty: 10, open_qty: 10 },
    ]
  }
];

export const MOCK_ERP_SALES_ORDERS = [
  {
    so_number: "SO-ERP-2026-001",
    customer_code: "CUS-RETAIL-01",
    customer_name: "Hệ thống Bán lẻ WinMart",
    expected_date: "2026-04-22",
    status: "Confirmed",
    items: [
      { line_no: 1, item_code: "SKU-A", name: "Hàng chuẩn - Máy in HP", uom: "PCS", qty: 10, open_qty: 10 },
      { line_no: 2, item_code: "SKU-B", name: "Hàng Lot/Date - Mực in (FEFO)", uom: "PCS", qty: 5, open_qty: 5 },
    ]
  }
];

export const MOCK_ERP_MASTER_DATA = {
  items: [
    { code: "SKU-A", name: "Hàng chuẩn - Máy in HP", uom: "PCS", is_lot: false },
    { code: "SKU-B", name: "Hàng Lot/Date - Mực in (FEFO)", uom: "PCS", is_lot: true },
    { code: "SKU-C", name: "Hàng quy đổi - Giấy cuộn", uom: "ROLL", is_lot: false },
    { code: "SKU-D", name: "Hàng chính - Chip điều khiển", uom: "PCS", is_lot: false },
  ],
  suppliers: [
    { code: "SUP-FAST-01", name: "Công ty Cung ứng Toàn Cầu" },
    { code: "SUP-EPE-02", name: "Nhà máy Sản xuất EPE" },
  ],
  customers: [
    { code: "CUS-RETAIL-01", name: "Hệ thống Bán lẻ WinMart" },
    { code: "CUS-EXPORT-02", name: "Đối tác Xuất khẩu Nhật Bản" },
  ]
};
