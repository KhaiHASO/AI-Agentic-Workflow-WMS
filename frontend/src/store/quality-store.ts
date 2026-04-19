import { create } from 'zustand';

export interface QCOrder {
  id: string;
  orderNo: string;
  itemCode: string;
  itemName: string;
  qty: number;
  sourceDoc: string;
  status: 'Pending' | 'In Progress' | 'Accepted' | 'Rejected' | 'Hold';
  result?: {
    acceptedQty: number;
    rejectedQty: number;
    holdQty: number;
    reason?: string;
  };
}

export interface QuarantineItem {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
  location: string;
  reason: string;
  status: 'Under Review' | 'Released' | 'Disposed';
}

interface QualityState {
  qcOrders: QCOrder[];
  quarantineItems: QuarantineItem[];
  
  // Actions
  updateQCResult: (id: string, result: QCOrder['result']) => void;
  releaseQuarantine: (id: string) => void;
  disposeQuarantine: (id: string) => void;
}

export const useQualityStore = create<QualityState>((set) => ({
  qcOrders: [
    { id: 'qc-1', orderNo: 'QC-24001', itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', qty: 100, sourceDoc: 'IR-24001', status: 'Pending' },
    { id: 'qc-2', orderNo: 'QC-24002', itemCode: 'ITM-CHEESE-01', itemName: 'Phô mai bò cười', qty: 50, sourceDoc: 'IR-24001', status: 'In Progress' },
  ],
  quarantineItems: [
    { id: 'q-1', itemCode: 'ITM-YOGURT-01', itemName: 'Sữa chua TH True Milk', qty: 10, location: 'QUARANTINE-01', reason: 'Damaged during receiving', status: 'Under Review' }
  ],

  updateQCResult: (id, result) => set((state) => ({
    qcOrders: state.qcOrders.map(o => {
      if (o.id === id) {
        const status = result?.rejectedQty && result.rejectedQty > 0 ? 'Rejected' : 'Accepted';
        return { ...o, status, result };
      }
      return o;
    })
  })),

  releaseQuarantine: (id) => set((state) => ({
    quarantineItems: state.quarantineItems.map(i => i.id === id ? { ...i, status: 'Released' } : i)
  })),

  disposeQuarantine: (id) => set((state) => ({
    quarantineItems: state.quarantineItems.map(i => i.id === id ? { ...i, status: 'Disposed' } : i)
  })),
}));
