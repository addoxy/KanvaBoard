"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoardData } from "@/utils/types";
import { CircularProgress } from "@nextui-org/progress";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Edit, Ellipsis, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<BoardData>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <Link href={`/boards/${row.original.id}`}>
          <div className="group flex gap-1">
            {title}
            <ArrowUpRight className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "lead",
    header: "Lead",
    cell: ({ row }) => {
      const src = row.original.leadImage;
      const lead = row.original.lead;
      return (
        <div className="flex items-center gap-2">
          <Image src={src} width="20" height="20" alt="" />
          {lead}
        </div>
      );
    },
  },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "targetDate", header: "Target Date" },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.original.progress;

      return (
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
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none bg-inherit transition-all duration-300">
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2">
              <Edit className="size-3" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <Trash className="size-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
