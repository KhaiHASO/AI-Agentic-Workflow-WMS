// users, roles, devices
export const users = [
  { id: 'u1', name: 'Nguyễn Văn A', role: 'Thủ kho', pin: '1234' },
  { id: 'u2', name: 'Trần Thị B', role: 'Supervisor', pin: '5678' },
  { id: 'u3', name: 'Lê Văn C', role: 'Công nhân kho', pin: '0000' }
];

export const locations = [
  { id: 'LOC01', name: 'Khu nhận hàng (Staging)', type: 'Inbound', warehouse: 'Kho 1' },
  { id: 'LOC02', name: 'Dãy A - Ô 01', type: 'Storage', warehouse: 'Kho 1' },
  { id: 'LOC03', name: 'Dãy A - Ô 02', type: 'Storage', warehouse: 'Kho 1' },
  { id: 'LOC04', name: 'Khu QA', type: 'Quarantine', warehouse: 'Kho 1' },
  { id: 'LOC05', name: 'Khu đóng gói', type: 'Packing', warehouse: 'Kho 1' }
];

export const items = [
  { id: 'RM-001', name: 'Màng PE 5kg', unit: 'Cuộn', barcodes: ['893001', 'PE5KG'], isLot: true },
  { id: 'RM-002', name: 'Băng keo 48mm', unit: 'Thùng', barcodes: ['893002', 'BK48'], isLot: false },
  { id: 'FG-001', name: 'Sản phẩm hoàn thiện A', unit: 'Cái', barcodes: ['893101', 'SPA'], isLot: true }
];

export const uomConversions = [
  { itemId: 'RM-002', fromUnit: 'Cuộn', toUnit: 'Thùng', rate: 12 }
];

// ERP Sync Data
export const erpPurchaseOrders = [
  {
    id: 'PO2026001',
    vendor: 'Nhà cung cấp Nhựa Việt',
    expectedDate: '2026-05-10',
    status: 'Mở',
    lines: [
      { itemId: 'RM-001', itemName: 'Màng PE 5kg', expectedQty: 100, receivedQty: 0, unit: 'Cuộn' },
      { itemId: 'RM-002', itemName: 'Băng keo 48mm', expectedQty: 20, receivedQty: 0, unit: 'Thùng' }
    ]
  },
  {
    id: 'PO2026002',
    vendor: 'Công ty Bao bì ABC',
    expectedDate: '2026-05-12',
    status: 'Mở',
    lines: [
      { itemId: 'RM-001', itemName: 'Màng PE 5kg', expectedQty: 50, receivedQty: 0, unit: 'Cuộn' }
    ]
  }
];

export const erpSalesOrders = [
  {
    id: 'SO2026001',
    customer: 'Đại lý Miền Tây',
    status: 'Đã duyệt',
    lines: [
      { itemId: 'FG-001', qty: 200, unit: 'Cái' }
    ]
  }
];

// WMS Operational Data
export const masterReceipts = [
  {
    id: 'MR-001',
    supplier: 'Nhà cung cấp Nhựa Việt',
    vehicle: '60C-12345',
    status: 'Đang xử lý',
    poRefs: ['PO2026001'],
    createdAt: '2026-05-02T08:00:00Z'
  }
];

export const draftLines = [
  { id: 'DL1', masterReceiptId: 'MR-001', itemId: 'RM-001', expectedQty: 100, scannedQty: 55, status: 'Partial' },
  { id: 'DL2', masterReceiptId: 'MR-001', itemId: 'RM-002', expectedQty: 20, scannedQty: 0, status: 'Pending' }
];

export const scanEvents = [
  { id: 'SC1', draftId: 'DR1', barcode: '893001', qty: 10, time: '2026-05-02T08:10:00Z', user: 'u1' }
];

export const tasks = [
  { id: 'T1', type: 'Putaway', itemId: 'RM-001', qty: 55, from: 'LOC01', to: 'LOC02', status: 'Open' },
  { id: 'T2', type: 'Pick', itemId: 'FG-001', qty: 20, from: 'LOC03', to: 'LOC05', status: 'Open' }
];

export const inventoryOnHand = [
  { loc: 'LOC02', itemId: 'RM-001', lot: 'LOT202601', qty: 500, unit: 'Cuộn', status: 'Available' },
  { loc: 'LOC03', itemId: 'FG-001', lot: 'LOT202605', qty: 1200, unit: 'Cái', status: 'Available' },
  { loc: 'LOC04', itemId: 'RM-001', lot: 'LOT-BAD-01', qty: 10, unit: 'Cuộn', status: 'Quarantine' }
];

export const inventoryLedger = [
  { id: 'L1', time: '2026-05-02T09:00:00Z', type: 'Inbound', itemId: 'RM-001', qty: 100, loc: 'LOC01', ref: 'GRN-001' }
];

export const integrationLogs = [
  { id: 'IL1', time: '2026-05-02T09:01:00Z', direction: 'Out', api: 'GRN_PUSH', status: 'Success', payload: '...' },
  { id: 'IL2', time: '2026-05-02T09:05:00Z', direction: 'Out', api: 'SHIP_PUSH', status: 'Failed', error: 'ERP Timeout', retriable: true }
];

export const kpis = {
  activeWorkers: 12,
  pendingInbound: 5,
  pendingOutbound: 8,
  throughput: 345,
  inventoryAccuracy: 99.2
};

export const analytics = {
  warehouseWorkload: {
    value: "5.867",
    percentage: 84,
    data: [10, 20, 15, 30, 25, 40, 20, 10, 50, 45, 60, 40, 70]
  },
  dailyPickedOrders: {
    value: "125.321",
    percentage: 62,
    data: [40, 30, 45, 35, 60, 55, 70, 65, 80, 75, 90]
  }
};
