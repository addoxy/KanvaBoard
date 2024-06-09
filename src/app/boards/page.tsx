"use client";

import BoardCard from "./_components/BoardCard";
import { columns } from "./_components/table/columns";
import { DataTable } from "./_components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useStore from "@/lib/store/use-store";
import { useView } from "@/lib/store/use-view";
import { getRandomDate } from "@/utils/utils";
import { format as formatDate } from "date-fns";
import { AlignJustify, ChevronDown, LayoutGrid, Search } from "lucide-react";

const BoardsPage = () => {
  const viewStore = useStore(useView, (state) => state);

  const startDateRange = new Date();
  const endDateRange = new Date();
  endDateRange.setDate(startDateRange.getDate() + 180);

  const data = [
    {
      id: "awdsfasd",
      title: "Sample project",
      lead: "John Doe",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 24,
    },
    {
      id: "2",
      title: "Project 2",
      lead: "Jane Smith",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 50,
    },
    {
      id: "3",
      title: "Project 3",
      lead: "Mike Johnson",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 75,
    },
    {
      id: "4",
      title: "Project 4",
      lead: "Emily Davis",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 90,
    },
    {
      id: "5",
      title: "Project 5",
      lead: "David Wilson",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 10,
    },
    {
      id: "6",
      title: "Project 6",
      lead: "Sarah Thompson",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 30,
    },
    {
      id: "7",
      title: "Project 7",
      lead: "Michael Brown",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 60,
    },
    {
      id: "8",
      title: "Project 8",
      lead: "Emma Martinez",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 80,
    },
    {
      id: "9",
      title: "Project 9",
      lead: "Daniel Anderson",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 20,
    },
    {
      id: "10",
      title: "Project 10",
      lead: "Olivia Taylor",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 40,
    },
    {
      id: "11",
      title: "Project 11",
      lead: "Noah Thomas",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 70,
    },
    {
      id: "12",
      title: "Project 12",
      lead: "Ava Hernandez",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 100,
    },
    {
      id: "13",
      title: "Project 13",
      lead: "Liam Moore",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 15,
    },
    {
      id: "14",
      title: "Project 14",
      lead: "Sophia Clark",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 35,
    },
    {
      id: "15",
      title: "Project 15",
      lead: "Mason Rodriguez",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 55,
    },
    {
      id: "16",
      title: "Project 16",
      lead: "Isabella Lee",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 85,
    },
    {
      id: "17",
      title: "Project 17",
      lead: "James Walker",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 25,
    },
    {
      id: "18",
      title: "Project 18",
      lead: "Grace Lewis",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 45,
    },
    {
      id: "19",
      title: "Project 19",
      lead: "Benjamin Young",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 65,
    },
    {
      id: "20",
      title: "Project 20",
      lead: "Chloe Hall",
      leadImage: "https://avatar.iran.liara.run/public",
      startDate: getRandomDate(),
      targetDate: getRandomDate(),
      progress: 95,
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-4xl font-medium">Boards</h1>
        <div className="mt-12 flex items-center gap-3">
          <div className="relative flex w-full items-center">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input placeholder="Search for your boards..." className="pl-10" />
          </div>
          <Button variant="default">New Board</Button>
        </div>
        <div className="mt-10 flex justify-between">
          <ToggleGroup
            variant="default"
            type="single"
            value={viewStore?.view}
            onValueChange={viewStore?.setView}
            className="h-10 w-fit rounded-md bg-secondary p-1"
          >
            <ToggleGroupItem
              value="grid"
              aria-label="Toggle grid"
              className="gap-2"
            >
              <LayoutGrid className="size-4" />
              Cards
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              aria-label="Toggle list"
              className="gap-2"
            >
              <AlignJustify className="h-4 w-4" />
              List
            </ToggleGroupItem>
          </ToggleGroup>
          {viewStore?.view == "grid" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md border-none px-4">
                Sort by
                <ChevronDown className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuCheckboxItem
                  checked
                  className="flex items-center gap-2"
                >
                  Name
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex items-center gap-2">
                  Last Modified
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex items-center gap-2">
                  Created At
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {viewStore?.view == "list" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md border-none px-4">
                Filter
                <ChevronDown className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuCheckboxItem
                  checked
                  className="flex items-center gap-2"
                >
                  Lead
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex items-center gap-2">
                  Start Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex items-center gap-2">
                  Target Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex items-center gap-2">
                  Progress
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {viewStore && viewStore.view === "grid" && (
        <div className="mt-5 grid gap-5 xl:grid-cols-4">
          {data.map((board) => (
            <BoardCard key={board.id} {...board} />
          ))}
        </div>
      )}
      {viewStore && viewStore.view === "list" && (
        <div className="mt-5 w-full">
          <DataTable columns={columns} data={data} />
        </div>
      )}
      <div></div>
    </>
  );
};

export default BoardsPage;
