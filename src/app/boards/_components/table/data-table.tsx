"use client";

import { ColumnData } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircularProgress } from "@nextui-org/progress";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<ColumnData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <ScrollArea className="h-[calc(100vh-19.1rem)]">
        <Table className="relative">
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-xs font-normal" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group h-16 bg-secondary/40 transition-all duration-300 hover:bg-secondary/80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {(() => {
                        switch (cell.column.columnDef.header) {
                          case "Title":
                            return (
                              <Link href={`/boards/${row.original.id}`}>
                                <div className="group flex gap-1">
                                  {cell.getValue() as string}
                                  <ArrowUpRight className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                                </div>
                              </Link>
                            );
                          case "Lead":
                            return (
                              <div className="flex items-center gap-2">
                                <Image
                                  src="https://avatar.iran.liara.run/public"
                                  width="20"
                                  height="20"
                                  alt="name"
                                />
                                {cell.getValue() as string}
                              </div>
                            );
                          case "Progress":
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
                                  value={cell.getValue() as number}
                                />
                                {cell.getValue() as number}%
                              </div>
                            );
                          case "Actions":
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
                          default:
                            return flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            );
                        }
                      })()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
