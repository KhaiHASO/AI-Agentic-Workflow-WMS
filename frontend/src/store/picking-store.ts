import { create } from 'zustand';

interface PickTask {
  id: string;
  taskNo: string;
  waveId: string;
  itemCode: string;
  itemName: string;
  barcode: string;
  qty: number;
  uom: string;
  sourceLocation: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Short Pick';
  zone: string;
}

interface PickingState {
  tasks: PickTask[];
  currentTaskId: string | null;
  
  // Actions
  startPicking: (id: string) => void;
  confirmPick: (id: string, pickedQty: number) => void;
}

export const usePickingStore = create<PickingState>((set) => ({
  tasks: [
    {
      id: 'ptk-1',
      taskNo: 'PK-24001',
      waveId: 'WV-24001',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      barcode: 'MILK001',
      qty: 20,
      uom: 'Thùng',
      sourceLocation: 'ZONE-A-05-10',
      status: 'Open',
      zone: 'Zone A',
    },
    {
      id: 'ptk-2',
      taskNo: 'PK-24002',
      waveId: 'WV-24001',
      itemCode: 'ITM-YOGURT-01',
      itemName: 'Sữa chua Vinamilk',
      barcode: 'YOG001',
      qty: 15,
      uom: 'Khay',
      sourceLocation: 'ZONE-B-02-05',
      status: 'Open',
      zone: 'Zone B',
    }
  ],
  currentTaskId: null,

  startPicking: (id) => set({ currentTaskId: id }),
  confirmPick: (id, pickedQty) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: pickedQty < t.qty ? 'Short Pick' : 'Completed' } : t),
    currentTaskId: null
  })),
}));
