import { create } from 'zustand';

export interface ShipmentLine {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
  packedQty: number;
  uom: string;
}

export interface Package {
  id: string;
  packageNo: string;
  type: 'Carton' | 'Pallet' | 'Box';
  weight: number;
  status: 'Open' | 'Closed';
  items: { itemCode: string; itemName: string; qty: number }[];
}

interface Shipment {
  id: string;
  shipmentNo: string;
  orderNo: string;
  customer: string;
  status: 'Draft' | 'Packing' | 'Packed' | 'Confirmed' | 'Shipped';
  integrationStatus: 'Pending' | 'Success' | 'Failed';
  lines: ShipmentLine[];
}

interface ShipmentState {
  currentShipment: Shipment | null;
  packages: Package[];
  
  // Actions
  loadShipment: (id: string) => void;
  createPackage: (type: Package['type']) => void;
  addItemToPackage: (packageId: string, itemCode: string, qty: number) => void;
  removeItemFromPackage: (packageId: string, itemCode: string) => void;
  closePackage: (packageId: string, weight: number) => void;
  confirmShipment: () => void;
  pushGI: () => void;
}

export const useShipmentStore = create<ShipmentState>((set, get) => ({
  currentShipment: {
    id: 'SH-24001',
    shipmentNo: 'SH-24001',
    orderNo: 'SO-24001',
    customer: 'VinMart HCM',
    status: 'Packing',
    integrationStatus: 'Pending',
    lines: [
      { id: 'sl-1', itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', qty: 50, packedQty: 10, uom: 'Thùng' },
      { id: 'sl-2', itemCode: 'ITM-YOGURT-01', itemName: 'Sữa chua TH True Milk', qty: 100, packedQty: 0, uom: 'Khay' },
    ]
  },
  packages: [
    { 
      id: 'pkg-1', 
      packageNo: 'PKG-SH24001-001', 
      type: 'Carton', 
      weight: 12.5, 
      status: 'Open', 
      items: [{ itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', qty: 10 }] 
    }
  ],

  loadShipment: (id) => {
    // Mock load
  },

  createPackage: (type) => set((state) => ({
    packages: [...state.packages, {
      id: Math.random().toString(36).substr(2, 9),
      packageNo: `PKG-SH24001-00${state.packages.length + 1}`,
      type,
      weight: 0,
      status: 'Open',
      items: []
    }]
  })),

  addItemToPackage: (packageId, itemCode, qty) => {
    const { currentShipment, packages } = get();
    if (!currentShipment) return;

    const line = currentShipment.lines.find(l => l.itemCode === itemCode);
    if (!line || line.packedQty + qty > line.qty) return;

    const updatedLines = currentShipment.lines.map(l => 
      l.itemCode === itemCode ? { ...l, packedQty: l.packedQty + qty } : l
    );

    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        const existingItem = p.items.find(i => i.itemCode === itemCode);
        const updatedItems = existingItem 
          ? p.items.map(i => i.itemCode === itemCode ? { ...i, qty: i.qty + qty } : i)
          : [...p.items, { itemCode, itemName: line.itemName, qty }];
        return { ...p, items: updatedItems };
      }
      return p;
    });

    set({ 
      currentShipment: { ...currentShipment, lines: updatedLines },
      packages: updatedPackages 
    });
  },

  removeItemFromPackage: (packageId, itemCode) => {
    const { currentShipment, packages } = get();
    if (!currentShipment) return;

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    const pkgItem = pkg.items.find(i => i.itemCode === itemCode);
    if (!pkgItem) return;

    const updatedLines = currentShipment.lines.map(l => 
      l.itemCode === itemCode ? { ...l, packedQty: Math.max(0, l.packedQty - pkgItem.qty) } : l
    );

    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        return { ...p, items: p.items.filter(i => i.itemCode !== itemCode) };
      }
      return p;
    });

    set({ 
      currentShipment: { ...currentShipment, lines: updatedLines },
      packages: updatedPackages 
    });
  },

  closePackage: (packageId, weight) => set((state) => ({
    packages: state.packages.map(p => p.id === packageId ? { ...p, status: 'Closed', weight } : p)
  })),

  confirmShipment: () => set((state) => ({
    currentShipment: state.currentShipment ? { ...state.currentShipment, status: 'Confirmed' } : null
  })),

  pushGI: () => {
    set((state) => ({
      currentShipment: state.currentShipment ? { ...state.currentShipment, integrationStatus: 'Success', status: 'Shipped' } : null
    }));
  }
}));

