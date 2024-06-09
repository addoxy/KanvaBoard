"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BoardData } from "@/utils/types";
import { cn, formatDateRange } from "@/utils/utils";
import { CircularProgress } from "@nextui-org/progress";
import {
  Calendar,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Delete,
  Edit,
  Ellipsis,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const BoardCard = (props: BoardData) => {
  const { id, title, lead, leadImage, startDate, targetDate, progress } = props;

  return (
    <div className="border-border-secondary group flex flex-col rounded-lg border bg-secondary px-6 pb-7 pt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md border-none opacity-0 transition-all delay-100 duration-300 focus:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100">
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
      <div className="mt-5 flex flex-col gap-4 text-sm text-foreground/85">
        <div className="flex items-center gap-2">
          <Image src={leadImage} width={20} height={20} alt={lead} />
          {lead}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-5" />
          {formatDateRange(startDate, targetDate)}
        </div>
        <div className="flex items-center gap-2">
          <CircularProgress
            classNames={{
              svg: "h-5 w-5",
              indicator: "stroke-primary",
              track: "stroke-primary/20",
              value: "text-3xl font-semibold text-white",
            }}
            aria-label="Loading..."
            value={progress}
          />
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
