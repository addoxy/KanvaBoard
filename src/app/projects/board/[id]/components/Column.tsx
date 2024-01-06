"use client";

import { DragIcon } from "@/components/Icons";
import {
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMemo, useRef, useState } from "react";
import Task from "./Task";
import AddTaskDialog from "./dialogs/AddTaskDialog";
import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";

const Column = (props: Column) => {
  const { id, boardId, title, tasks, refreshBoard } = props;

  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const inputRef = useRef<HTMLInputElement>(null);

  const sortableProps = {
    ...props,
    id: id,
    title: title,
    tasks: tasks,
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
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

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

    setColumnTitle(inputRef.current?.value);
    updateColumnTitleMutation.mutate();
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-80 rounded-lg bg-zinc-800/20 h-100"
      />
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
            {...attributes}
            {...listeners}
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
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => {
            return (
              <Task
                {...task}
                key={task.id}
                columnTitle={title}
                refreshBoard={refreshBoard}
              />
            );
          })}
        </SortableContext>
        <AddTaskDialog
          boardId={boardId}
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
