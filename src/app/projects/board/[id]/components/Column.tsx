"use client";

import { CrossIcon, DragIcon } from "@/components/Icons";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Task from "./Task";

const Column = (props: ColumnProps) => {
  const { id, handleDeleteColumn } = props;

  const [title, setTitle] = useState(props.title);
  const [tasks, setTasks] = useState(props.tasks);

  function handleSetTasks(content: string) {
    setTasks([
      ...tasks,
      {
        id: "newid",
        content: content,
        handleEditTask: handleEditTask,
        handleDeleteTask: handleDeleteTask,
        columnTitle: title,
      },
    ]);
  }

  function handleEditTask(taskId: string, newContent: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, content: newContent };
        } else {
          return task;
        }
      })
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="flex flex-col first-of-type:pl-12 last-of-type:pr-12 pb-4">
      <div className="mb-4 w-80 flex items-center justify-between">
        <span className="text-sm text-zinc-300 font-medium line-clamp-1">
          {title}
        </span>
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
      <div className="flex w-80 flex-col gap-y-2 rounded-lg border border-zinc-800/30 bg-zinc-850 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {tasks.map((task) => (
          <Task {...task} key={task.id} />
        ))}
        <AddTask columnTitle={title} handleSetTasks={handleSetTasks} />
      </div>
    </div>
  );
};

interface AddTaskProps {
  handleSetTasks: (content: string) => void;
  columnTitle: string;
}

const AddTask = (props: AddTaskProps) => {
  const { columnTitle, handleSetTasks } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="text-zinc-400 text-sm text-left h-11 hover:bg-zinc-800/70 pl-3 rounded-lg hover:text-zinc-300">
          + Add Task
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-900/75 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="w-150 px-9 pt-8 pb-10 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none">
          <div className="flex justify-between items-center mb-6">
            <Title text={`Adding a Task in ${columnTitle}`} variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md"
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <textarea
            rows={3}
            autoFocus
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="resize-none bg-zinc-700/25 border border-zinc-700/50 text-zinc-300 mb-6 text-sm px-5 py-4 rounded-lg focus:outline-zinc-600 focus:outline-none"
          />
          <div className="flex justify-between">
            <button
              disabled={content.length === 0}
              onClick={() => {
                handleSetTasks(content);
                setIsOpen(false);
                setContent("");
              }}
              className="bg-violet-600 w-full text-zinc-100 text-sm py-3 rounded-lg disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Column;
