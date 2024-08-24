import { create } from 'zustand';

import { type SidebarStore } from './sidebar.type';

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (status: boolean) => set(() => ({ isSidebarOpen: status })),
}));
