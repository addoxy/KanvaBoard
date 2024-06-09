import BoardCard from "./_components/BoardCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignJustify, ChevronDown, LayoutGrid, Search } from "lucide-react";

const BoardsPage = () => {
  return (
    <>
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
          className="h-10 w-fit rounded-md bg-secondary p-1"
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle cards"
            className="gap-2"
          >
            <LayoutGrid className="size-4" />
            Cards
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle list"
            className="gap-2"
          >
            <AlignJustify className="h-4 w-4" />
            List
          </ToggleGroupItem>
        </ToggleGroup>
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
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-4">
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
        <BoardCard title="Sprint 15-27" todo={24} inProgress={12} done={48} />
      </div>
    </>
  );
};

export default BoardsPage;
