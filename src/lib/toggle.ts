import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebarToggle = create<SidebarToggle>()(
  persist(
    (set) => ({
      toggle: false,
      setToggle: (value) => set(() => ({ toggle: value })),
    }),
    {
      name: "sidebar-toggle",
    }
  )
);
