import { create } from 'zustand';

export interface SalesOrder {
  id: string;
  orderNo: string;
  customer: string;
  orderDate: string;
  status: 'Draft' | 'Released' | 'In Wave' | 'Completed';
  priority: 'Normal' | 'High' | 'Urgent';
  totalLines: number;
  warehouse: string;
}

export interface Wave {
  id: string;
  waveNo: string;
  status: 'Draft' | 'Released' | 'Picking' | 'Completed' | 'Cancelled';
  orders: SalesOrder[];
  createdAt: string;
  releasedAt?: string;
  totalTasks: number;
  completedTasks: number;
}

interface WaveState {
  orderPool: SalesOrder[];
  waves: Wave[];
  selectedOrderIds: string[];
  
  // Actions
  toggleOrderSelection: (orderId: string) => void;
  createWave: () => void;
  releaseWave: (waveId: string) => void;
  cancelWave: (waveId: string) => void;
}

export const useWaveStore = create<WaveState>((set, get) => ({
  orderPool: [
    { id: 'so-1', orderNo: 'SO-24001', customer: 'VinMart HCM', orderDate: '2024-05-18', status: 'Released', priority: 'High', totalLines: 5, warehouse: 'WH-HCM' },
    { id: 'so-2', orderNo: 'SO-24002', customer: 'Co.op Mart', orderDate: '2024-05-18', status: 'Released', priority: 'Normal', totalLines: 3, warehouse: 'WH-HCM' },
    { id: 'so-3', orderNo: 'SO-24003', customer: 'Lotte Mart', orderDate: '2024-05-19', status: 'Released', priority: 'Urgent', totalLines: 12, warehouse: 'WH-HCM' },
    { id: 'so-4', orderNo: 'SO-24004', customer: 'Bach Hoa Xanh', orderDate: '2024-05-19', status: 'Released', priority: 'Normal', totalLines: 8, warehouse: 'WH-HCM' },
    { id: 'so-5', orderNo: 'SO-24005', customer: 'Mega Market', orderDate: '2024-05-19', status: 'Released', priority: 'High', totalLines: 15, warehouse: 'WH-HCM' },
  ],
  waves: [
    { 
      id: 'wv-1', 
      waveNo: 'WV-24001', 
      status: 'Picking', 
      createdAt: '2024-05-18 10:00', 
      releasedAt: '2024-05-18 10:30', 
      totalTasks: 20, 
      completedTasks: 15, 
      orders: [] // Mocked for simplicity
    }
  ],
  selectedOrderIds: [],

  toggleOrderSelection: (orderId) => set((state) => ({
    selectedOrderIds: state.selectedOrderIds.includes(orderId)
      ? state.selectedOrderIds.filter(id => id !== orderId)
      : [...state.selectedOrderIds, orderId]
  })),

  createWave: () => {
    const { orderPool, selectedOrderIds, waves } = get();
    if (selectedOrderIds.length === 0) return;

    const selectedOrders = orderPool.filter(so => selectedOrderIds.includes(so.id));
    const newWave: Wave = {
      id: Math.random().toString(36).substr(2, 9),
      waveNo: `WV-2400${waves.length + 1}`,
      status: 'Draft',
      createdAt: new Date().toLocaleString(),
      totalTasks: selectedOrders.reduce((acc, o) => acc + o.totalLines, 0),
      completedTasks: 0,
      orders: selectedOrders
    };

    set({
      waves: [newWave, ...waves],
      orderPool: orderPool.map(so => selectedOrderIds.includes(so.id) ? { ...so, status: 'In Wave' } : so),
      selectedOrderIds: []
    });
  },

  releaseWave: (waveId) => set((state) => ({
    waves: state.waves.map(w => w.id === waveId ? { ...w, status: 'Released', releasedAt: new Date().toLocaleString() } : w)
  })),

  cancelWave: (waveId) => set((state) => {
     const wave = state.waves.find(w => w.id === waveId);
     if (!wave) return state;
     
     const orderIdsInWave = wave.orders.map(o => o.id);
     
     return {
        waves: state.waves.map(w => w.id === waveId ? { ...w, status: 'Cancelled' } : w),
        orderPool: state.orderPool.map(so => orderIdsInWave.includes(so.id) ? { ...so, status: 'Released' } : so)
     };
  }),
}));
