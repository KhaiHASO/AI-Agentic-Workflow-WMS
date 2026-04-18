import { create } from 'zustand';

type Role = 'Clerk' | 'Supervisor' | 'Admin' | 'Integration';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface DemoState {
  user: User | null;
  warehouse: string;
  login: (user: User) => void;
  logout: () => void;
  setWarehouse: (wh: string) => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  user: null,
  warehouse: 'WH-HCM',
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setWarehouse: (warehouse) => set({ warehouse }),
}));
