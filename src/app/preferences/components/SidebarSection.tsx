"use client";

import Title from "@/components/Title";
import { useStore } from "@/lib/store";
import { useSidebarToggle } from "@/lib/toggle";
import Toggle from "./Toggle";

const SidebarSection = () => {
  const sidebarStore = useStore(
    useSidebarToggle,
    (state) => state
  ) as SidebarToggle;

  return (
    <div className="flex flex-col border-b-zinc-700/50">
      <Title text="Sidebar" variant="lg" className="mb-6" />
      <div className="flex justify-between">
        <span className="text-sm text-zinc-400 mb-3">Sidebar Toggle</span>
        <Toggle
          checked={sidebarStore?.toggle}
          setChecked={sidebarStore?.setToggle}
        />
      </div>
      <span className="text-sm text-zinc-500">
        Choose if you want a fixed or a toggleable sidebar
      </span>
    </div>
  );
};

export default SidebarSection;
