"use client";

import { CrossIcon, DragIcon } from "@/components/Icons";
import { useState } from "react";
import Task from "./Task";

const Column = (props: ColumnProps) => {
  const { id, handleDeleteColumn } = props;

  const [title, setTitle] = useState(props.title);
  const [tasks, setTasks] = useState(props.tasks);

  function handleSetTasks() {
    setTasks([
      ...tasks,
      {
        id: "newid",
        content: "",
      },
    ]);
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 w-80 flex items-center justify-between gap-x-4">
        <span className="text-sm text-zinc-300 font-medium">{title}</span>
        <div className="flex items-center">
          <button className="hover:bg-zinc-700/50 rounded-md mr-2 p-2">
            <DragIcon className="w-2 h-2 text-zinc-300" />
          </button>
          <button
            onClick={() => handleDeleteColumn(id)}
            className="hover:bg-zinc-700/50 rounded-md"
          >
            <CrossIcon className="w-6 h-6 text-zinc-300" />
          </button>
        </div>
      </div>
      {/* add bg-zinc-850 */}
      <div className="flex w-80 flex-col gap-y-2 rounded-lg border border-zinc-800/30 bg-zinc-850 p-4">
        {tasks.map((task) => (
          <Task id={task.id} content={task.content} key={task.id} />
        ))}
        <button
          onClick={handleSetTasks}
          className="text-zinc-400 text-sm text-left h-11 hover:bg-zinc-800/70 pl-3 rounded-lg hover:text-zinc-300"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
