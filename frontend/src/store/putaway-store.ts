import { create } from 'zustand';

interface PutawayTask {
  id: string;
  taskNo: string;
  itemCode: string;
  itemName: string;
  barcode: string;
  qty: number;
  uom: string;
  sourceHU?: string;
  sourceLocation: string;
  suggestedLocation: string;
  actualLocation?: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Exception';
  overdue: boolean;
}

interface PutawayState {
  tasks: PutawayTask[];
  currentTaskId: string | null;
  
  // Actions
  startTask: (id: string) => void;
  confirmPutaway: (id: string, actualLocation: string) => void;
  reportException: (id: string, reason: string) => void;
}

export const usePutawayStore = create<PutawayState>((set) => ({
  tasks: [
    {
      id: 'pt-1',
      taskNo: 'PT-24001',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      barcode: 'MILK001',
      qty: 50,
      uom: 'Thùng',
      sourceLocation: 'GR-STAGING-01',
      suggestedLocation: 'ZONE-A-01-02',
      status: 'Open',
      overdue: true,
    },
    {
      id: 'pt-2',
      taskNo: 'PT-24002',
      itemCode: 'ITM-YOGURT-01',
      itemName: 'Sữa chua Vinamilk',
      barcode: 'YOG001',
      qty: 20,
      uom: 'Khay',
      sourceLocation: 'GR-STAGING-02',
      suggestedLocation: 'ZONE-B-02-05',
      status: 'Open',
      overdue: false,
    }
  ],
  currentTaskId: null,

  startTask: (id) => set({ currentTaskId: id }),
  confirmPutaway: (id, actualLocation) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, actualLocation, status: 'Completed' } : t),
    currentTaskId: null
  })),
  reportException: (id, reason) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'Exception' } : t),
    currentTaskId: null
  })),
}));
