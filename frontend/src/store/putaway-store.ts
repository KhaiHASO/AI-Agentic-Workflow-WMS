import { create } from 'zustand';

export type InventoryStatus = 'Available' | 'Hold' | 'QC' | 'Damaged';
export type TaskStatus = 'Open' | 'Assigned' | 'InProgress' | 'Completed' | 'Exception' | 'Cancelled';
export type SourceType = 'HU' | 'Item' | 'Pallet';

export interface HUContent {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
  uom: string;
  lotNo?: string;
  expiryDate?: string;
}

export interface SuggestedLocation {
  locationCode: string;
  zone: string;
  binType: string;
  availableCapacity: number;
  compatible: boolean;
  recommendationReason: 'Best Fit' | 'Near Picking' | 'Reserve Area' | 'Same Lot Zone' | 'FEFO Preferred';
}

export interface PutawayTask {
  id: string;
  taskNo: string;
  receiptNo: string;
  sourceType: SourceType;
  sourceHuId?: string;
  itemCode: string;
  itemName: string;
  lotNo?: string;
  expiryDate?: string;
  serialCount?: number;
  sourceLocation: string;
  suggestedLocation: string;
  status: TaskStatus;
  qtyTotal: number;
  qtyMoved: number;
  qtyRemaining: number;
  inventoryStatus: InventoryStatus;
  assignee: string | null;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueAt: string;
  overdue: boolean;
  allowedZones: string[];
  alternativeLocations: SuggestedLocation[];
  huContents?: HUContent[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  qty?: number;
  source?: string;
  destination?: string;
  message: string;
}

interface PutawayState {
  tasks: PutawayTask[];
  activeTaskId: string | null;
  scanStep: 'SOURCE' | 'LOCATION' | 'QTY' | 'REVIEW' | 'COMPLETE';
  moveHistory: AuditEvent[];
  isHULevel: boolean;
  
  // Actions
  startTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  setScanStep: (step: PutawayState['scanStep']) => void;
  setIsHULevel: (val: boolean) => void;
  
  processScan: (barcode: string) => { success: boolean; message: string; type?: 'info' | 'warning' | 'error' | 'success' };
  confirmMove: (qty: number, destination: string) => void;
  undoLastMove: () => void;
  reportException: (reason: string) => void;
  reassignTask: (taskId: string, user: string) => void;
  skipTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
}

// Initial Mock Data
const mockAlternativeLocations: SuggestedLocation[] = [
  { locationCode: 'ZONE-A-01-05', zone: 'ZONE-A', binType: 'Small Bin', availableCapacity: 80, compatible: true, recommendationReason: 'Best Fit' },
  { locationCode: 'ZONE-A-02-10', zone: 'ZONE-A', binType: 'Small Bin', availableCapacity: 100, compatible: true, recommendationReason: 'Near Picking' },
  { locationCode: 'RSV-01-01', zone: 'RESERVE', binType: 'Pallet Rack', availableCapacity: 500, compatible: true, recommendationReason: 'Reserve Area' },
];

const mockTasks: PutawayTask[] = [
  {
    id: 'pt-1',
    taskNo: 'PT-24001',
    receiptNo: 'REC-001',
    sourceType: 'Item',
    itemCode: 'ITM-MILK-01',
    itemName: 'Sữa tươi Vinamilk 1L',
    lotNo: 'LOT2024A',
    expiryDate: '2025-01-01',
    sourceLocation: 'GR-STAGING-01',
    suggestedLocation: 'ZONE-A-01-02',
    status: 'Assigned',
    qtyTotal: 100,
    qtyMoved: 0,
    qtyRemaining: 100,
    inventoryStatus: 'Available',
    assignee: 'User01',
    priority: 'High',
    dueAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    overdue: true,
    allowedZones: ['ZONE-A', 'RESERVE'],
    alternativeLocations: mockAlternativeLocations,
  },
  {
    id: 'pt-2',
    taskNo: 'PT-24002',
    receiptNo: 'REC-002',
    sourceType: 'HU',
    sourceHuId: 'HU-99001',
    itemCode: 'ITM-YOGURT-01',
    itemName: 'Sữa chua Vinamilk 100g',
    sourceLocation: 'GR-DOCK-04',
    suggestedLocation: 'ZONE-B-05-11',
    status: 'Open',
    qtyTotal: 50,
    qtyMoved: 0,
    qtyRemaining: 50,
    inventoryStatus: 'Available',
    assignee: null,
    priority: 'Medium',
    dueAt: new Date(Date.now() + 7200000).toISOString(),
    overdue: false,
    allowedZones: ['ZONE-B'],
    alternativeLocations: mockAlternativeLocations.map(l => ({ ...l, zone: 'ZONE-B' })),
    huContents: [
      { id: 'huc-1', itemCode: 'ITM-YOGURT-01', itemName: 'Sữa chua Vinamilk 100g', qty: 50, uom: 'Hộp' }
    ]
  },
  {
    id: 'pt-3',
    taskNo: 'PT-24003',
    receiptNo: 'REC-003',
    sourceType: 'HU',
    sourceHuId: 'HU-MIX-505',
    itemCode: 'MIXED',
    itemName: 'Mixed Pallet (Bánh kẹo)',
    sourceLocation: 'GR-STAGING-02',
    suggestedLocation: 'RSV-05-02',
    status: 'InProgress',
    qtyTotal: 200,
    qtyMoved: 80,
    qtyRemaining: 120,
    inventoryStatus: 'Available',
    assignee: 'User01',
    priority: 'Low',
    dueAt: new Date(Date.now() + 86400000).toISOString(),
    overdue: false,
    allowedZones: ['RESERVE'],
    alternativeLocations: mockAlternativeLocations,
    huContents: [
      { id: 'huc-2', itemCode: 'ITM-CAKE-01', itemName: 'Bánh Chocopie', qty: 100, uom: 'Thùng' },
      { id: 'huc-3', itemCode: 'ITM-CANDY-02', itemName: 'Kẹo mút Alpenliebe', qty: 100, uom: 'Gói' },
    ]
  },
  {
    id: 'pt-4',
    taskNo: 'PT-24004',
    receiptNo: 'REC-004',
    sourceType: 'Item',
    itemCode: 'ITM-GLASS-99',
    itemName: 'Ly thủy tinh cao cấp (Dễ vỡ)',
    sourceLocation: 'GR-QC-AREA',
    suggestedLocation: 'HLD-01-01',
    status: 'Exception',
    qtyTotal: 24,
    qtyMoved: 0,
    qtyRemaining: 24,
    inventoryStatus: 'Hold',
    assignee: 'Supervisor01',
    priority: 'Urgent',
    dueAt: new Date().toISOString(),
    overdue: false,
    allowedZones: ['HOLD', 'QUARANTINE'],
    alternativeLocations: [
      { locationCode: 'HLD-01-02', zone: 'HOLD', binType: 'Secured Bin', availableCapacity: 10, compatible: true, recommendationReason: 'Best Fit' }
    ],
  }
];

export const usePutawayStore = create<PutawayState>((set, get) => ({
  tasks: mockTasks,
  activeTaskId: null,
  scanStep: 'SOURCE',
  moveHistory: [],
  isHULevel: true,

  startTask: (id) => {
    set((state) => ({
      activeTaskId: id,
      scanStep: 'SOURCE',
      tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'InProgress' } : t)
    }));
  },

  setActiveTask: (id) => set({ activeTaskId: id }),
  setScanStep: (step) => set({ scanStep: step }),
  setIsHULevel: (val) => set({ isHULevel: val }),

  processScan: (barcode: string) => {
    const { activeTaskId, tasks, scanStep } = get();
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task) return { success: false, message: "Không tìm thấy tác vụ active", type: 'error' };

    barcode = barcode.trim().toUpperCase();

    if (scanStep === 'SOURCE') {
      const match = barcode === task.itemCode.toUpperCase() || 
                    barcode === task.sourceHuId?.toUpperCase() ||
                    (task.huContents?.some(c => c.itemCode.toUpperCase() === barcode));
      
      if (match) {
        set({ scanStep: 'LOCATION' });
        return { success: true, message: "Xác nhận nguồn hàng thành công!", type: 'success' };
      } else {
        return { success: false, message: `Mã vạch ${barcode} không khớp với yêu cầu!`, type: 'error' };
      }
    }

    if (scanStep === 'LOCATION') {
      // Mock validation logic
      if (barcode.startsWith('LOCK')) {
        return { success: false, message: "Vị trí này đang bị khóa!", type: 'error' };
      }

      if (barcode.includes('FULL')) {
        return { success: false, message: "Vị trí đã đầy dung lượng!", type: 'warning' };
      }

      const isSuggested = barcode === task.suggestedLocation.toUpperCase();
      const isAlt = task.alternativeLocations.some(l => l.locationCode.toUpperCase() === barcode);

      if (isSuggested || isAlt) {
        set({ scanStep: 'QTY' });
        return { success: true, message: `Vị trí hợp lệ: ${barcode}`, type: 'success' };
      } else {
        // Allow anyway but with warning if it exists in mock logic
        set({ scanStep: 'QTY' });
        return { success: true, message: `Vị trí ${barcode} không nằm trong đề xuất, nhưng đã được ghi nhận.`, type: 'warning' };
      }
    }

    return { success: false, message: "Trạng thái scan không hợp lệ", type: 'error' };
  },

  confirmMove: (qty: number, destination: string) => {
    const { activeTaskId, tasks, moveHistory } = get();
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task) return;

    const newQtyMoved = task.qtyMoved + qty;
    const newQtyRemaining = Math.max(0, task.qtyTotal - newQtyMoved);
    const newStatus: TaskStatus = newQtyRemaining === 0 ? 'Completed' : 'InProgress';

    const updatedTasks = tasks.map(t => 
      t.id === activeTaskId 
        ? { ...t, qtyMoved: newQtyMoved, qtyRemaining: newQtyRemaining, status: newStatus } 
        : t
    );

    const audit: AuditEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      user: 'Current User',
      action: 'Confirm Move',
      qty,
      source: task.sourceLocation,
      destination,
      message: `Cất ${qty} ${task.itemCode} vào ${destination}`
    };

    set({
      tasks: updatedTasks,
      moveHistory: [audit, ...moveHistory],
      scanStep: newQtyRemaining === 0 ? 'COMPLETE' : 'SOURCE'
    });
  },

  undoLastMove: () => {
    const { activeTaskId, tasks, moveHistory } = get();
    if (moveHistory.length === 0) return;

    const lastMove = moveHistory[0];
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task || lastMove.qty === undefined) return;

    const updatedTasks = tasks.map(t => 
      t.id === activeTaskId 
        ? { 
            ...t, 
            qtyMoved: Math.max(0, t.qtyMoved - lastMove.qty!), 
            qtyRemaining: t.qtyRemaining + lastMove.qty!,
            status: 'InProgress' as TaskStatus
          } 
        : t
    );

    set({
      tasks: updatedTasks,
      moveHistory: moveHistory.slice(1),
      scanStep: 'SOURCE'
    });
  },

  reportException: (reason) => {
    const { activeTaskId, tasks } = get();
    set({
      tasks: tasks.map(t => t.id === activeTaskId ? { ...t, status: 'Exception', notes: reason } : t),
      scanStep: 'SOURCE'
    });
  },

  reassignTask: (taskId, user) => {
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, assignee: user } : t)
    }));
  },

  skipTask: (taskId) => {
    set(state => ({
      activeTaskId: null,
      scanStep: 'SOURCE'
    }));
  },

  completeTask: (taskId) => {
     set(state => ({
       tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'Completed', qtyRemaining: 0, qtyMoved: t.qtyTotal } : t),
       activeTaskId: null,
       scanStep: 'SOURCE'
     }));
  }
}));
