"use client";

import BoardMenu from "../BoardMenu";
import { BoardData } from "@/utils/types";
import { CircularProgress } from "@nextui-org/progress";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<BoardData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <button
          className="flex w-full items-center justify-start pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 size-3" />
        </button>
      );
    },
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
    header: ({ column }) => {
      return (
        <button
          className="flex w-full items-center justify-start pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lead
          <ArrowUpDown className="ml-2 size-3" />
        </button>
      );
    },
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
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <button
          className="flex w-full items-center justify-start pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 size-3" />
        </button>
      );
    },
  },
  {
    accessorKey: "targetDate",
    header: ({ column }) => {
      return (
        <button
          className="flex w-full items-center justify-start pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target Date
          <ArrowUpDown className="ml-2 size-3" />
        </button>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <button
          className="flex w-full items-center justify-start pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress
          <ArrowUpDown className="ml-2 size-3" />
        </button>
      );
    },
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
      const id = row.original.id;
      return <BoardMenu className="hover:bg-background/20" />;
    },
  },
];
