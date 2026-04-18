import { create } from 'zustand';

interface OnHandItem {
  id: string;
  itemCode: string;
  itemName: string;
  location: string;
  onHandQty: number;
  availableQty: number;
  qcQty: number;
  damagedQty: number;
  uom: string;
  status: 'Available' | 'In QC' | 'Quarantined';
}

interface InventoryState {
  onHand: OnHandItem[];
  
  // Actions
  transferStock: (itemId: string, fromLoc: string, toLoc: string, qty: number) => void;
  adjustStock: (itemId: string, qty: number, reason: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  onHand: [
    {
      id: 'inv-1',
      itemCode: 'ITM-MILK-01',
      itemName: 'Sữa tươi Vinamilk 1L',
      location: 'ZONE-A-01-01',
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
      itemName: 'Bánh quy Oreo',
      location: 'QC-STAGING',
      onHandQty: 100,
      availableQty: 0,
      qcQty: 100,
      damagedQty: 0,
      uom: 'Hộp',
      status: 'In QC'
    }
  ],

  transferStock: (itemId, fromLoc, toLoc, qty) => {},
  adjustStock: (itemId, qty, reason) => {},
}));
