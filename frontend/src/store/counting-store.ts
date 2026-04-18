import { create } from 'zustand';

interface CountLine {
  id: string;
  location: string;
  itemCode: string;
  itemName: string;
  expectedQty: number;
  countedQty: number | null;
  status: 'Pending' | 'Counted' | 'Discrepancy';
}

interface CountingState {
  lines: CountLine[];
  processCount: (id: string, qty: number) => void;
}

export const useCountingStore = create<CountingState>((set) => ({
  lines: [
    { id: 'cl-1', location: 'ZONE-A-01-01', itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', expectedQty: 500, countedQty: null, status: 'Pending' },
    { id: 'cl-2', location: 'ZONE-B-02-05', itemCode: 'ITM-YOGURT-01', itemName: 'Sữa chua TH True Milk', expectedQty: 200, countedQty: null, status: 'Pending' },
  ],
  processCount: (id, qty) => set((state) => ({
    lines: state.lines.map(l => {
      if (l.id === id) {
        const status = qty === l.expectedQty ? 'Counted' : 'Discrepancy';
        return { ...l, countedQty: qty, status };
      }
      return l;
    })
  })),
}));
