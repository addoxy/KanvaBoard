"use client";

import { useStore } from "@/lib/store";
import { useSidebarToggle } from "@/lib/toggle";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { SidebarIcon } from "../Icons";
import { Sheet, SheetContent, SheetTrigger } from "../otherui/Sheet";
import Sidebar from "./Sidebar";

interface SidebarToggleProps {
  className?: string;
}

const SidebarToggle = (props: SidebarToggleProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const sidebarStore = useStore(
    useSidebarToggle,
    (state) => state
  ) as SidebarToggle;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="outline-none">
        <SidebarIcon
          className={cn(
            "W-8 h-8 text-zinc-400 lg:hidden hover:bg-zinc-800/50 p-1 hover:text-zinc-300 rounded-md rotate-180",
            className,
            sidebarStore?.toggle && "lg:block"
          )}
        />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarToggle;
