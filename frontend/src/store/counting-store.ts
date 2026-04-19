import { create } from 'zustand';

export interface CountLine {
  id: string;
  location: string;
  itemCode: string;
  itemName: string;
  barcode: string;
  expectedQty: number;
  countedQty: number | null;
  uom: string;
  status: 'Pending' | 'Counted' | 'Discrepancy';
  discrepancyQty?: number;
}

interface CountingHeader {
  sessionNo: string;
  type: 'Cycle Count' | 'Physical Count' | 'Spot Check';
  status: 'Open' | 'Scanning' | 'Submitted' | 'Closed';
  startedAt: string;
  blindCount: boolean;
}

interface CountingState {
  header: CountingHeader;
  lines: CountLine[];
  currentLocation: string | null;
  scanStep: 'LOCATION' | 'ITEM' | 'QUANTITY' | 'CONFIRM';
  
  // Actions
  startSession: (sessionNo: string) => void;
  setScanStep: (step: 'LOCATION' | 'ITEM' | 'QUANTITY' | 'CONFIRM') => void;
  setCurrentLocation: (loc: string | null) => void;
  updateCount: (id: string, qty: number) => void;
  saveDraft: () => void;
  submitSession: () => void;
}

export const useCountingStore = create<CountingState>((set, get) => ({
  header: {
    sessionNo: 'CC-24001',
    type: 'Cycle Count',
    status: 'Open',
    startedAt: '2024-05-18 09:00',
    blindCount: true,
  },
  lines: [
    { id: 'cl-1', location: 'ZONE-A-01-01', itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', barcode: 'MILK001', expectedQty: 500, countedQty: null, uom: 'Hộp', status: 'Pending' },
    { id: 'cl-2', location: 'ZONE-B-02-05', itemCode: 'ITM-YOGURT-01', itemName: 'Sữa chua TH True Milk', barcode: 'YOG001', expectedQty: 200, countedQty: null, uom: 'Khay', status: 'Pending' },
    { id: 'cl-3', location: 'ZONE-B-02-05', itemCode: 'ITM-CHEESE-01', itemName: 'Phô mai bò cười', barcode: 'CHS001', expectedQty: 50, countedQty: null, uom: 'Hộp', status: 'Pending' },
  ],
  currentLocation: null,
  scanStep: 'LOCATION',

  startSession: (sessionNo) => set(state => ({ 
    header: { ...state.header, status: 'Scanning' },
    scanStep: 'LOCATION' 
  })),

  setScanStep: (step) => set({ scanStep: step }),

  setCurrentLocation: (loc) => set({ currentLocation: loc }),

  updateCount: (id, qty) => set((state) => ({
    lines: state.lines.map(l => {
      if (l.id === id) {
        const discrepancyQty = qty - l.expectedQty;
        const status = discrepancyQty === 0 ? 'Counted' : 'Discrepancy';
        return { ...l, countedQty: qty, status, discrepancyQty };
      }
      return l;
    })
  })),

  saveDraft: () => {
    // Mock save
  },

  submitSession: () => set(state => ({
    header: { ...state.header, status: 'Submitted' }
  })),
}));

