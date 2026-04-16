// Mock Sync Logs - Integration Audit Data
// Path: frontend/src/mockData/integration/syncLogs.js

export const MOCK_SYNC_LOGS = [
  {
    id: 1,
    type: "PO_PULL", // WMS kéo PO từ ERP
    wms_doc: "PO-2026-001",
    erp_doc: "PO-ERP-2026-001",
    timestamp: "2026-04-17 08:30:25",
    status: "Success",
    message: "Successfully synchronized 2 items from ERP FAST.",
    payload: { source: "ERP_FAST", items_count: 2, raw_data: "..." }
  },
  {
    id: 2,
    type: "GRN_PUSH", // WMS đẩy xác nhận nhập kho lên ERP
    wms_doc: "RCT-100492",
    erp_doc: "PO-ERP-2026-001",
    timestamp: "2026-04-17 10:15:00",
    status: "Failed",
    message: "Error from ERP: PO status is 'Financial Locked' in FAST System.",
    payload: { endpoint: "/api/v1/receipt", error_code: "FAC_001", retry_count: 2 },
    can_retry: true
  },
  {
    id: 3,
    type: "SO_PULL",
    wms_doc: "SO-2026-015",
    erp_doc: "SO-ERP-2026-001",
    timestamp: "2026-04-17 11:00:10",
    status: "Processing",
    message: "Awaiting response from ERP Gateway...",
    payload: { status: "pending_ack" }
  },
  {
    id: 4,
    type: "INV_SYNC", // Đồng bộ tồn kho
    wms_doc: "INV-SYNC-001",
    erp_doc: "FAST-INV-UPDATE",
    timestamp: "2026-04-17 12:00:00",
    status: "Success",
    message: "Stock balance updated for 150 SKUs.",
    payload: { total_skus: 150, update_mode: "delta" }
  }
];
