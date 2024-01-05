"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useCreateColumnMutation,
  useUpdateBoardTitleMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Column from "./Column";
import Task from "./Task";
import CreateColumnDialog from "./dialogs/CreateColumnDialog";

interface Board extends BoardProps {
  refreshBoard: () => void;
}

const Board = (props: Board) => {
  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const { id, refreshBoard, title } = props;

  const [columns, setColumns] = useState(props.columns);
  const [tasks, setTasks] = useState(props.tasks);
  const [editMode, setEditMode] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);
  const [activeTask, setActiveTask] = useState<TaskProps | null>(null);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const updateBoardTitleMutation = useUpdateBoardTitleMutation({
    id,
    newTitle: boardTitle,
  });

  const createColumnMutation = useCreateColumnMutation({
    boardId: id,
    title: newColumnTitle,
    refreshBoard,
    order: columns.length + 1,
  });

  function handleTitle() {
    if (inputRef.current?.value.length === 0 || !inputRef.current?.value) {
      notify("Board Title can't be empty", "warning");
      return;
    }

    if (inputRef.current.value === boardTitle) return;

    setBoardTitle(inputRef.current?.value);
    updateBoardTitleMutation.mutate();
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.sortableProps);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.sortableProps);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";

    if (isActiveAColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );

        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex + 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId as string;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between gap-x-10 items-center">
        {!editMode && (
          <Title
            text={boardTitle}
            variant="xl"
            onClick={() => setEditMode(true)}
            className="cursor-pointer"
          />
        )}
        {editMode && (
          <input
            autoFocus
            defaultValue={boardTitle}
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
            className="h-8 w-full rounded-lg px-2 font-medium text-zinc-300 bg-zinc-800 text-2xl outline-none py-5 -my-3 truncate"
          />
        )}
        <CreateColumnDialog
          title={newColumnTitle}
          setTitle={setNewColumnTitle}
          mutationFn={createColumnMutation}
        >
          <button
            disabled={createColumnMutation.isPending}
            className={cn(
              "bg-violet-700 text-zinc-300 text-sm shrink-0 font-medium transition-all delay-100 duration-200 ease-in-out hover:bg-purple-700 disabled:cursor-not-allowed w-36 h-9 rounded-lg"
            )}
          >
            + New Column
          </button>
        </CreateColumnDialog>
      </div>
      <Spacer variant="lg" />
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-x-6 -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round overflow-x-auto h-full">
          <SortableContext items={columnsId}>
            {columns.map((column, i) => (
              <div
                key={column.id}
                className="first-of-type:pl-12 last-of-type:pr-12 h-fit"
              >
                <Column
                  {...column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  refreshBoard={refreshBoard}
                />
              </div>
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column {...activeColumn} refreshBoard={refreshBoard} />
            )}
            {activeTask && <Task {...activeTask} refreshBoard={refreshBoard} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
