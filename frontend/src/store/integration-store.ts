import { create } from 'zustand';

export interface IntegrationMessage {
  id: string;
  topic: string;
  correlationId: string;
  status: 'Pending' | 'Success' | 'Failed';
  attempts: number;
  timestamp: string;
  direction: 'Inbound' | 'Outbound';
  payload?: string;
  error?: string;
}

interface IntegrationHealth {
  erpSync: 'Healthy' | 'Warning' | 'Down';
  apiLatency: string;
  successRate: number;
  pendingQueue: number;
}

interface SyncTask {
  id: string;
  name: string;
  description: string;
  lastSync: string;
  status: 'Idle' | 'Running' | 'Success' | 'Failed';
  progress: number;
  recordsSynced: number;
}

interface IntegrationState {
  health: IntegrationHealth;
  messages: IntegrationMessage[];
  syncTasks: SyncTask[];

  // Actions
  retryMessage: (id: string) => void;
  markResolved: (id: string) => void;
  runSyncTask: (taskId: string) => void;
  syncItems: () => void;
  syncOrders: () => void;
}

export const useIntegrationStore = create<IntegrationState>((set, get) => ({
  health: {
    erpSync: 'Healthy',
    apiLatency: '120ms',
    successRate: 98.5,
    pendingQueue: 4
  },
  syncTasks: [
    { id: 'master-data', name: 'Master Data', description: 'Đồng bộ Vật tư, Nhà cung cấp, Khách hàng, UoM', lastSync: '2024-05-18 08:00', status: 'Idle', progress: 0, recordsSynced: 0 },
    { id: 'inbound-po', name: 'Inbound POs', description: 'Kéo các Đơn mua hàng (PO) đang mở từ ERP', lastSync: '2024-05-18 11:45', status: 'Idle', progress: 0, recordsSynced: 0 },
    { id: 'outbound-so', name: 'Outbound SOs', description: 'Kéo các Lệnh xuất kho (SO) đã duyệt từ ERP', lastSync: '2024-05-18 11:50', status: 'Idle', progress: 0, recordsSynced: 0 },
    { id: 'inventory-snapshot', name: 'Inventory Snapshot', description: 'Đẩy số liệu tồn kho thực tế sang ERP để đối soát', lastSync: '2024-05-18 10:00', status: 'Idle', progress: 0, recordsSynced: 0 },
  ],
  messages: [
    {
      id: 'msg-1',
      topic: 'ERP.SO.SYNC',
      correlationId: 'CORR-9901',
      status: 'Failed',
      attempts: 3,
      timestamp: '2024-05-18 10:00',
      direction: 'Inbound',
      payload: '{"orderNo": "SO-24001", "customer": "VinMart"}',
      error: 'Connection timeout after 30s'
    },
    {
      id: 'msg-2',
      topic: 'WMS.GRN.PUSH',
      correlationId: 'CORR-9902',
      status: 'Success',
      attempts: 1,
      timestamp: '2024-05-18 10:05',
      direction: 'Outbound',
      payload: '{"receiptNo": "IR-24001", "items": [...]}'
    },
    {
      id: 'msg-3',
      topic: 'ERP.ITEM.SYNC',
      correlationId: 'CORR-9903',
      status: 'Failed',
      attempts: 1,
      timestamp: '2024-05-18 11:30',
      direction: 'Inbound',
      payload: '{"itemCode": "ITM-MILK-03", "price": -100}',
      error: 'Invalid price value: -100'
    }
  ],

  retryMessage: (id) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, status: 'Pending', attempts: m.attempts + 1 } : m)
  })),

  markResolved: (id) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, status: 'Success' } : m)
  })),

  syncItems: () => {
    // Mock sync
  },

  syncOrders: () => {
    // Mock sync
  },

  runSyncTask: (taskId: string) => {
    const { syncTasks } = get();
    set({
      syncTasks: syncTasks.map(t => t.id === taskId ? { ...t, status: 'Running', progress: 10 } : t)
    });

    // Giả lập tiến trình chạy
    let progress = 10;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        set(state => ({
          syncTasks: state.syncTasks.map(t => t.id === taskId ? { 
            ...t, 
            status: 'Success', 
            progress: 100, 
            lastSync: new Date().toLocaleString(),
            recordsSynced: Math.floor(Math.random() * 100) + 1
          } : t)
        }));
      } else {
        set(state => ({
          syncTasks: state.syncTasks.map(t => t.id === taskId ? { ...t, progress } : t)
        }));
      }
    }, 400);
  }
}));
