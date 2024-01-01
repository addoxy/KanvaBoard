"use client";

import { CrossIcon, DragIcon } from "@/components/Icons";
import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import Task from "./Task";

const Column = (props: ColumnProps) => {
  const { id } = props;

  const [title, setTitle] = useState(props.title);
  const [tasks, setTasks] = useState(props.tasks);

  return (
    <div className="flex flex-col first-of-type:pl-12 last-of-type:pr-12 pb-4">
      <div className="mb-4 w-80 flex items-center justify-between">
        <span className="text-sm text-zinc-300 font-medium line-clamp-1">
          {title}
        </span>
        <div className="flex items-center">
          <button className="hover:bg-zinc-700/50 rounded-md mr-2 p-2 transition-all delay-100 duration-200 ease-in-out">
            <DragIcon className="w-2 h-2 text-zinc-300" />
          </button>
          <button className="hover:bg-zinc-700/50 rounded-md transition-all delay-100 duration-200 ease-in-out">
            <CrossIcon className="w-6 h-6 text-zinc-300" />
          </button>
        </div>
      </div>
      <div className="flex w-80 flex-col gap-y-2 rounded-lg border border-zinc-700/20 bg-zinc-800/40 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {tasks.map((task) => (
          <Task {...task} key={task.id} />
        ))}
        <AddTaskDialog columnTitle={title} />
      </div>
    </div>
  );
};

export default Column;
