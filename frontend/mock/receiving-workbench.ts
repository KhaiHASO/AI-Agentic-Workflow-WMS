export interface ReceiptLine {
  id: string;
  lineNo: string;
  itemCode: string;
  itemName: string;
  barcode: string;
  expectedQty: number;
  receivedQty: number;
  acceptedQty: number;
  qcQty: number;
  damagedQty: number;
  rejectedQty: number;
  unexpectedQty: number;
  uom: string;
  overTolerancePct: number;
  requiresLot: boolean;
  requiresSerial: boolean;
  requiresExpiry: boolean;
  qcPolicy: 'None' | 'Full' | 'Sample';
  allowsSubstitution: boolean;
  substitutionCandidates: { itemCode: string; itemName: string }[];
  status: 'Not Started' | 'Partial' | 'Ready' | 'Exception' | 'QC Pending' | 'Completed' | 'Closed Short' | 'Unexpected';
  variance: number;
  notes: string;
  lots?: { lotNo: string; mfgDate: string; expiryDate: string; qty: number }[];
  serials?: string[];
}

export interface ReceiptHeader {
  receiptNo: string;
  poNumber: string;
  supplier: string;
  warehouse: string;
  dock: string;
  status: string;
  startedAt: string;
  operator: string;
  expectedTotalQty: number;
  receivedTotalQty: number;
}

export interface ScanEvent {
  id: string;
  timestamp: string;
  barcode: string;
  itemCode: string;
  qty: number;
  matchedLineNo: string | null;
  resultType: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export const mockReceivingDraft: { header: ReceiptHeader; lines: ReceiptLine[] } = {
  header: {
    receiptNo: 'MR-24001',
    poNumber: 'PO-24001',
    supplier: 'Vinamilk',
    warehouse: 'WH-HCM',
    dock: 'DOCK-01',
    status: 'Scanning',
    startedAt: '2024-05-18 08:30',
    operator: 'Nguyễn Văn A',
    expectedTotalQty: 350,
    receivedTotalQty: 0,
  },
  lines: [
    {
      id: 'l1',
      lineNo: '001',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      barcode: 'MILK001',
      expectedQty: 100,
      receivedQty: 0,
      acceptedQty: 0,
      qcQty: 0,
      damagedQty: 0,
      rejectedQty: 0,
      unexpectedQty: 0,
      uom: 'Thùng',
      overTolerancePct: 5,
      requiresLot: true,
      requiresSerial: false,
      requiresExpiry: true,
      qcPolicy: 'Sample',
      allowsSubstitution: true,
      substitutionCandidates: [{ itemCode: 'ITM-MILK-02', itemName: 'Sữa tươi TH True Milk 1L' }],
      status: 'Not Started',
      variance: 0,
      notes: '',
    },
    {
      id: 'l2',
      lineNo: '002',
      itemCode: 'ITM-YOGURT-01',
      itemName: 'Sữa chua Vinamilk Có Đường',
      barcode: 'YOG001',
      expectedQty: 200,
      receivedQty: 0,
      acceptedQty: 0,
      qcQty: 0,
      damagedQty: 0,
      rejectedQty: 0,
      unexpectedQty: 0,
      uom: 'Khay',
      overTolerancePct: 0,
      requiresLot: false,
      requiresSerial: false,
      requiresExpiry: true,
      qcPolicy: 'None',
      allowsSubstitution: false,
      substitutionCandidates: [],
      status: 'Not Started',
      variance: 0,
      notes: '',
    },
    {
      id: 'l3',
      lineNo: '003',
      itemCode: 'ITM-CHEESE-01',
      itemName: 'Phô mai bò cười',
      barcode: 'CHS001',
      expectedQty: 50,
      receivedQty: 0,
      acceptedQty: 0,
      qcQty: 0,
      damagedQty: 0,
      rejectedQty: 0,
      unexpectedQty: 0,
      uom: 'Hộp',
      overTolerancePct: 10,
      requiresLot: false,
      requiresSerial: true,
      requiresExpiry: false,
      qcPolicy: 'Full',
      allowsSubstitution: false,
      substitutionCandidates: [],
      status: 'Not Started',
      variance: 0,
      notes: '',
    }
  ]
};
