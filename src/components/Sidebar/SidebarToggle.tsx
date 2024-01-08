"use client";

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="outline-none">
        <SidebarIcon
          className={cn(
            "W-8 h-8 text-zinc-500 lg:hidden hover:bg-zinc-800/50 p-1 hover:text-zinc-400 rounded-md",
            className
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
