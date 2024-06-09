"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ColumnData = {
  id: string;
  title: string;
  lead: string;
  leadImage: string;
  startDate: string;
  targetDate: string;
  progress: number;
};

export const columns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  { accessorKey: "lead", header: "Lead" },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "targetDate", header: "Target Date" },
  { accessorKey: "progress", header: "Progress" },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
