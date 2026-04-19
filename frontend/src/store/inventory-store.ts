import { create } from 'zustand';

export interface OnHandItem {
  id: string;
  itemCode: string;
  itemName: string;
  location: string;
  huNo?: string;
  lotNo?: string;
  serialNo?: string;
  onHandQty: number;
  availableQty: number;
  qcQty: number;
  damagedQty: number;
  uom: string;
  status: 'Available' | 'In QC' | 'Quarantined' | 'Hold';
}

export interface InventoryLedger {
  id: string;
  timestamp: string;
  itemCode: string;
  location: string;
  type: 'Inbound' | 'Outbound' | 'Transfer' | 'Adjustment' | 'QC';
  changeQty: number;
  afterQty: number;
  docNo: string;
  user: string;
}

interface InventoryState {
  onHand: OnHandItem[];
  ledger: InventoryLedger[];
  
  // Actions
  transferStock: (id: string, toLoc: string, qty: number) => void;
  adjustStock: (id: string, changeQty: number, reason: string) => void;
  quarantineStock: (id: string, reason: string) => void;
  moveHU: (huNo: string, toLoc: string) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  onHand: [
    {
      id: 'inv-1',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      location: 'ZONE-A-01-01',
      huNo: 'HU-001',
      lotNo: 'LOT2405-A',
      onHandQty: 500,
      availableQty: 450,
      qcQty: 0,
      damagedQty: 0,
      uom: 'Thùng',
      status: 'Available'
    },
    {
      id: 'inv-2',
      itemCode: 'ITM-YOGURT-01',
      itemName: 'Sữa chua TH True Milk',
      location: 'ZONE-B-02-05',
      lotNo: 'LOT2405-B',
      onHandQty: 200,
      availableQty: 200,
      qcQty: 0,
      damagedQty: 0,
      uom: 'Khay',
      status: 'Available'
    },
    {
      id: 'inv-3',
      itemCode: 'ITM-CHEESE-01',
      itemName: 'Phô mai bò cười',
      location: 'QC-STAGING',
      huNo: 'HU-QC-01',
      onHandQty: 100,
      availableQty: 0,
      qcQty: 100,
      damagedQty: 0,
      uom: 'Hộp',
      status: 'In QC'
    }
  ],
  ledger: [
    { id: 'ldg-1', timestamp: '2024-05-18 10:00', itemCode: 'ITM-MILK-01', location: 'ZONE-A-01-01', type: 'Inbound', changeQty: 500, afterQty: 500, docNo: 'IR-24001', user: 'Admin' }
  ],

  transferStock: (id, toLoc, qty) => {
    const { onHand, ledger } = get();
    const item = onHand.find(i => i.id === id);
    if (!item || item.availableQty < qty) return;

    const updatedOnHand = onHand.map(i => {
      if (i.id === id) {
        return { ...i, onHandQty: i.onHandQty - qty, availableQty: i.availableQty - qty };
      }
      return i;
    });

    const newLedger: InventoryLedger = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      itemCode: item.itemCode,
      location: toLoc,
      type: 'Transfer',
      changeQty: qty,
      afterQty: qty, // Simplified
      docNo: 'TF-INTERNAL',
      user: 'Admin'
    };

    set({ onHand: updatedOnHand, ledger: [newLedger, ...ledger] });
  },

  adjustStock: (id, changeQty, reason) => {
    const { onHand, ledger } = get();
    const item = onHand.find(i => i.id === id);
    if (!item) return;

    const updatedOnHand = onHand.map(i => {
      if (i.id === id) {
        return { 
          ...i, 
          onHandQty: i.onHandQty + changeQty, 
          availableQty: i.availableQty + changeQty 
        };
      }
      return i;
    });

    const newLedger: InventoryLedger = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      itemCode: item.itemCode,
      location: item.location,
      type: 'Adjustment',
      changeQty,
      afterQty: item.onHandQty + changeQty,
      docNo: 'ADJ-MANUAL',
      user: 'Admin'
    };

    set({ onHand: updatedOnHand, ledger: [newLedger, ...ledger] });
  },

  quarantineStock: (id, reason) => {
    set(state => ({
      onHand: state.onHand.map(i => i.id === id ? { ...i, status: 'Quarantined', availableQty: 0, damagedQty: i.onHandQty } : i)
    }));
  },

  moveHU: (huNo, toLoc) => {
    set(state => ({
      onHand: state.onHand.map(i => i.huNo === huNo ? { ...i, location: toLoc } : i)
    }));
  }
}));

