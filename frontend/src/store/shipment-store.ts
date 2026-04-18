import { create } from 'zustand';

interface Package {
  id: string;
  packageNo: string;
  type: 'Carton' | 'Pallet';
  weight: number;
  status: 'Packing' | 'Closed';
  items: { itemCode: string; itemName: string; qty: number }[];
}

interface ShipmentState {
  packages: Package[];
  createPackage: (type: 'Carton' | 'Pallet') => void;
  addItemToPackage: (packageId: string, item: any) => void;
}

export const useShipmentStore = create<ShipmentState>((set) => ({
  packages: [
    { id: 'pkg-1', packageNo: 'PKG-001', type: 'Carton', weight: 5.5, status: 'Packing', items: [{ itemCode: 'ITM-MILK-01', itemName: 'Sữa tươi Vinamilk 1L', qty: 10 }] }
  ],
  createPackage: (type) => set((state) => ({
    packages: [...state.packages, {
      id: Math.random().toString(36).substr(2, 9),
      packageNo: `PKG-00${state.packages.length + 1}`,
      type,
      weight: 0,
      status: 'Packing',
      items: []
    }]
  })),
  addItemToPackage: (packageId, item) => set((state) => ({
    packages: state.packages.map(p => p.id === packageId ? { ...p, items: [...p.items, item] } : p)
  })),
}));
