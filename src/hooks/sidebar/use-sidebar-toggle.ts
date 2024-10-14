import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SidebarToggle = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};

export const useSidebarToggle = create<SidebarToggle>()(
  persist(
    (set) => ({
      expanded: true,
      setExpanded: (value) => set(() => ({ expanded: value })),
    }),
    {
      name: 'sidebar-toggle',
    }
  )
);
