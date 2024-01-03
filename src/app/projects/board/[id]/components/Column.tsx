"use client";

import { DragIcon } from "@/components/Icons";
import {
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import DeleteColumnDialog from "./DeleteColumnDialog";
import Task from "./Task";

interface Column extends ColumnProps {
  refreshBoard: () => void;
  index: number;
  length: number;
}

const Column = (props: Column) => {
  const { id, title, tasks, refreshBoard, index, length } = props;
  console.log(index);
  console.log(length);

  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  const sortableProps = {
    ...props,
    id,
    title,
    tasks,
    refreshBoard,
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Column",
      sortableProps,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const updateColumnTitleMutation = useUpdateColumnTitleMutation({
    id,
    newTitle: columnTitle,
  });

  const deleteColumnMutation = useDeleteColumnMutation({
    id,
    refreshBoard,
  });

  function handleTitle() {
    if (inputRef.current?.value.length === 0 || !inputRef.current?.value) {
      notify("Column Title can't be empty", "warning");
      return;
    }

    if (inputRef.current.value === columnTitle) return;
    console.log("updated");

    setColumnTitle(inputRef.current?.value);
    updateColumnTitleMutation.mutate();
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          "flex shrink-0 flex-col w-80 h-120 rounded-lg bg-zinc-800/30"
        )}
      ></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col pb-4 h-full">
      <div className="mb-4 w-80 pt-1 flex items-center gap-x-3 justify-between">
        {!editMode && (
          <span
            onClick={() => setEditMode(true)}
            className="text-sm text-zinc-300 font-medium line-clamp-1 cursor-pointer"
          >
            {columnTitle}
          </span>
        )}
        {editMode && (
          <input
            autoFocus
            defaultValue={columnTitle}
            onBlur={() => {
              handleTitle();
              setEditMode(false);
            }}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                inputRef.current && inputRef.current.blur();
              }
            }}
            className="h-8 py-4 w-full rounded-lg px-2 font-medium text-zinc-300 bg-zinc-800 text-sm outline-none -my-4 truncate"
          />
        )}
        <div className="flex items-center">
          <button
            {...listeners}
            {...attributes}
            className="hover:bg-zinc-700/50 rounded-md mr-2 p-2 transition-all delay-100 duration-200 ease-in-out"
          >
            <DragIcon className="w-2 h-2 text-zinc-300" />
          </button>
          <DeleteColumnDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            columnName={title}
            mutateFn={deleteColumnMutation}
          />
        </div>
      </div>
      <div className="flex w-80 flex-col gap-y-2 rounded-lg border border-zinc-700/20 bg-zinc-800/40 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {tasks.map((task) => (
          <Task
            {...task}
            key={task.id}
            columnTitle={title}
            refreshBoard={refreshBoard}
          />
        ))}
        <AddTaskDialog
          columnId={id}
          columnTitle={title}
          order={tasks.length + 1}
          refreshBoard={refreshBoard}
        />
      </div>
    </div>
  );
};

export default Column;
