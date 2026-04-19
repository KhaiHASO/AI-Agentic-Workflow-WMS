import { create } from 'zustand';

export interface PickTask {
  id: string;
  taskNo: string;
  waveId: string;
  itemCode: string;
  itemName: string;
  barcode: string;
  qty: number;
  pickedQty: number;
  uom: string;
  sourceLocation: string;
  status: 'Open' | 'Scanning' | 'Completed' | 'Short Pick' | 'Skipped';
  zone: string;
  alternateSources?: { location: string; qty: number }[];
}

interface RecentPick {
  id: string;
  taskNo: string;
  itemCode: string;
  qty: number;
  timestamp: string;
}

interface PickingState {
  tasks: PickTask[];
  recentPicks: RecentPick[];
  currentTaskId: string | null;
  scanStep: 'LOCATION' | 'ITEM' | 'QUANTITY' | 'CONFIRM';
  
  // Actions
  startPicking: (id: string) => void;
  setScanStep: (step: 'LOCATION' | 'ITEM' | 'QUANTITY' | 'CONFIRM') => void;
  confirmPick: (id: string, pickedQty: number) => void;
  shortPick: (id: string, actualQty: number, reason: string) => void;
  skipTask: (id: string) => void;
  changeSource: (id: string, newLocation: string) => void;
}

export const usePickingStore = create<PickingState>((set, get) => ({
  tasks: [
    {
      id: 'ptk-1',
      taskNo: 'PK-24001',
      waveId: 'WV-24001',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      barcode: 'MILK001',
      qty: 20,
      pickedQty: 0,
      uom: 'Thùng',
      sourceLocation: 'ZONE-A-05-10',
      status: 'Open',
      zone: 'Zone A',
      alternateSources: [
        { location: 'ZONE-A-05-11', qty: 50 },
        { location: 'ZONE-A-06-01', qty: 100 }
      ]
    },
    {
      id: 'ptk-2',
      taskNo: 'PK-24002',
      waveId: 'WV-24001',
      itemCode: 'ITM-YOGURT-01',
      itemName: 'Sữa chua Vinamilk',
      barcode: 'YOG001',
      qty: 15,
      pickedQty: 0,
      uom: 'Khay',
      sourceLocation: 'ZONE-B-02-05',
      status: 'Open',
      zone: 'Zone B',
      alternateSources: [
        { location: 'ZONE-B-02-06', qty: 10 }
      ]
    }
  ],
  recentPicks: [],
  currentTaskId: null,
  scanStep: 'LOCATION',

  startPicking: (id) => set({ currentTaskId: id, scanStep: 'LOCATION' }),
  
  setScanStep: (step) => set({ scanStep: step }),

  confirmPick: (id, pickedQty) => {
    const { tasks, recentPicks } = get();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTasks = tasks.map(t => 
      t.id === id ? { ...t, pickedQty, status: 'Completed' as const } : t
    );

    const newPick: RecentPick = {
      id: Math.random().toString(36).substr(2, 9),
      taskNo: task.taskNo,
      itemCode: task.itemCode,
      qty: pickedQty,
      timestamp: new Date().toLocaleTimeString(),
    };

    set({
      tasks: updatedTasks,
      recentPicks: [newPick, ...recentPicks].slice(0, 10),
      currentTaskId: null,
      scanStep: 'LOCATION'
    });
  },

  shortPick: (id, actualQty, reason) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === id ? { ...t, pickedQty: actualQty, status: 'Short Pick' as const, notes: reason } : t
    ),
    currentTaskId: null,
    scanStep: 'LOCATION'
  })),

  skipTask: (id) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'Skipped' as const } : t),
    currentTaskId: null,
    scanStep: 'LOCATION'
  })),

  changeSource: (id, newLocation) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, sourceLocation: newLocation } : t),
    scanStep: 'LOCATION'
  })),
}));

