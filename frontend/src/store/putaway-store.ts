import { create } from 'zustand';

export interface PutawayTask {
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
  status: 'Open' | 'Scanning' | 'Completed' | 'Exception';
  overdue: boolean;
  alternateLocations: string[];
}

interface RecentMove {
  id: string;
  taskNo: string;
  itemCode: string;
  location: string;
  timestamp: string;
}

interface PutawayState {
  tasks: PutawayTask[];
  recentMoves: RecentMove[];
  currentTaskId: string | null;
  scanStep: 'SOURCE' | 'LOCATION' | 'CONFIRM';
  
  // Actions
  startTask: (id: string) => void;
  confirmPutaway: (id: string, actualLocation: string, qty: number) => void;
  reportException: (id: string, reason: string) => void;
  setScanStep: (step: 'SOURCE' | 'LOCATION' | 'CONFIRM') => void;
  splitTask: (id: string, splitQty: number) => void;
}

export const usePutawayStore = create<PutawayState>((set, get) => ({
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
      alternateLocations: ['ZONE-A-01-03', 'ZONE-A-01-04'],
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
      alternateLocations: ['ZONE-B-02-06', 'ZONE-B-03-01'],
    }
  ],
  recentMoves: [],
  currentTaskId: null,
  scanStep: 'SOURCE',

  startTask: (id) => set({ currentTaskId: id, scanStep: 'SOURCE' }),

  confirmPutaway: (id, actualLocation, qty) => {
    const { tasks, recentMoves } = get();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTasks = tasks.map(t => 
      t.id === id ? { ...t, actualLocation, status: 'Completed' as const } : t
    );

    const newMove: RecentMove = {
      id: Math.random().toString(36).substr(2, 9),
      taskNo: task.taskNo,
      itemCode: task.itemCode,
      location: actualLocation,
      timestamp: new Date().toLocaleTimeString(),
    };

    set({
      tasks: updatedTasks,
      recentMoves: [newMove, ...recentMoves].slice(0, 10),
      currentTaskId: null,
      scanStep: 'SOURCE'
    });
  },

  reportException: (id, reason) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'Exception' as const, notes: reason } : t),
    currentTaskId: null
  })),

  setScanStep: (step) => set({ scanStep: step }),

  splitTask: (id, splitQty) => {
    const { tasks } = get();
    const task = tasks.find(t => t.id === id);
    if (!task || splitQty >= task.qty) return;

    const newTask: PutawayTask = {
      ...task,
      id: `pt-split-${Math.random().toString(36).substr(2, 5)}`,
      taskNo: `${task.taskNo}-B`,
      qty: task.qty - splitQty,
      status: 'Open'
    };

    const updatedTasks = tasks.map(t => 
      t.id === id ? { ...t, taskNo: `${task.taskNo}-A`, qty: splitQty } : t
    );

    set({ tasks: [...updatedTasks, newTask] });
  }
}));

