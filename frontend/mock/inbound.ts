export interface PO {
  id: string;
  poNo: string;
  supplier: string;
  eta: string;
  status: 'Open' | 'Closed';
  lines: POLine[];
}

export interface POLine {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
  uom: string;
}

export const mockPOs: PO[] = [
  { id: 'po-1', poNo: 'PO-24001', supplier: 'Vinamilk', eta: '2024-05-01', status: 'Open', lines: [{ id: 'l1', itemCode: 'ITM-01', itemName: 'Sữa tươi', qty: 100, uom: 'Thùng' }] },
  { id: 'po-2', poNo: 'PO-24002', supplier: 'TH True Milk', eta: '2024-05-02', status: 'Open', lines: [{ id: 'l2', itemCode: 'ITM-02', itemName: 'Sữa chua', qty: 50, uom: 'Thùng' }] },
  { id: 'po-3', poNo: 'PO-24003', supplier: 'Unilever', eta: '2024-05-03', status: 'Open', lines: [] },
  { id: 'po-4', poNo: 'PO-24004', supplier: 'P&G', eta: '2024-05-04', status: 'Open', lines: [] },
  { id: 'po-5', poNo: 'PO-24005', supplier: 'Nestle', eta: '2024-05-05', status: 'Open', lines: [] },
  { id: 'po-6', poNo: 'PO-24006', supplier: 'Kido', eta: '2024-05-06', status: 'Open', lines: [] },
];

export const mockMasterReceipts = [
  { id: 'mr-1', mrNo: 'MR-24001', poId: 'po-1', status: 'Draft', supplier: 'Vinamilk', expectedQty: 100, receivedQty: 0 },
  { id: 'mr-2', mrNo: 'MR-24002', poId: 'po-2', status: 'Scanning', supplier: 'TH True Milk', expectedQty: 50, receivedQty: 20 },
  { id: 'mr-3', mrNo: 'MR-24003', poId: 'po-3', status: 'Ready', supplier: 'Unilever', expectedQty: 200, receivedQty: 200 },
  { id: 'mr-4', mrNo: 'MR-24004', poId: 'po-4', status: 'Submitted', supplier: 'P&G', expectedQty: 150, receivedQty: 150 },
  { id: 'mr-5', mrNo: 'MR-24005', poId: 'po-5', status: 'Closed', supplier: 'Nestle', expectedQty: 300, receivedQty: 300 },
];

export const mockPutawayTasks = [
  { id: 'pt-1', taskNo: 'PT-24001', receiptId: 'mr-4', status: 'Open', assignee: null, overdue: true },
  { id: 'pt-2', taskNo: 'PT-24002', receiptId: 'mr-5', status: 'In Progress', assignee: 'usr-1', overdue: false },
  // ... (more mock tasks as requested: 8 total)
  { id: 'pt-3', taskNo: 'PT-24003', receiptId: 'mr-5', status: 'Open', assignee: null, overdue: false },
  { id: 'pt-4', taskNo: 'PT-24004', receiptId: 'mr-5', status: 'Completed', assignee: 'usr-2', overdue: false },
  { id: 'pt-5', taskNo: 'PT-24005', receiptId: 'mr-5', status: 'Open', assignee: null, overdue: false },
  { id: 'pt-6', taskNo: 'PT-24006', receiptId: 'mr-5', status: 'Open', assignee: null, overdue: false },
  { id: 'pt-7', taskNo: 'PT-24007', receiptId: 'mr-5', status: 'Open', assignee: null, overdue: false },
  { id: 'pt-8', taskNo: 'PT-24008', receiptId: 'mr-5', status: 'Open', assignee: null, overdue: false },
];
