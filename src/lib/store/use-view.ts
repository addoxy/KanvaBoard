import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewProps = {
  view: "grid" | "list";
  setView: (value: "grid" | "list") => void;
};

export const useView = create<ViewProps>()(
  persist(
    (set) => ({
      view: "grid",
      setView: (value) => set(() => ({ view: value })),
    }),
    {
      name: "use-view",
    },
  ),
);
