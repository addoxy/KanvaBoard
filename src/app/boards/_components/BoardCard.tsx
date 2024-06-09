"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/utils";
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  Delete,
  Edit,
  Ellipsis,
  Trash,
} from "lucide-react";
import { useState } from "react";

type BoardCardProps = {
  title: string;
  todo: number;
  inProgress: number;
  done: number;
};

const BoardCard = (props: BoardCardProps) => {
  const { title, todo, inProgress, done } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-border-secondary group flex flex-col rounded-lg border bg-secondary px-6 pb-7 pt-5 hover:border-border">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger
            className={cn(
              "rounded-md border-none opacity-0 transition-all delay-100 duration-300 focus:opacity-100 group-hover:opacity-100",
              isMenuOpen && "opacity-100",
            )}
          >
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background"
            side="bottom"
            align="end"
          >
            <DropdownMenuItem className="gap-2">
              <Edit className="size-3" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <Trash className="size-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <CircleDashed className="size-4 text-primary/50" />
          <span className="text-muted-foreground">Todo: {todo}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CircleDot className="size-4 text-primary/60" />
          <span className="text-muted-foreground">
            In Progress: {inProgress}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <CircleCheck className="size-4 text-primary" />
          <span className="text-muted-foreground">Done: {done}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
