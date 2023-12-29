"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon, DragIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
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
        <AddTask columnTitle={title} />
      </div>
    </div>
  );
};

interface AddTaskProps {
  columnTitle: string;
}

const AddTask = (props: AddTaskProps) => {
  const { columnTitle } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        setContent("");
      }}
    >
      <Dialog.Trigger asChild>
        <button className="text-zinc-400 text-sm text-left h-11 hover:bg-zinc-700/30 transition-all delay-100 duration-200 ease-in-out pl-3 rounded-lg hover:text-zinc-300">
          + Add Task
        </button>
      </Dialog.Trigger>
      <DialogBox variant="xl">
        <div className="flex justify-between items-center mb-6">
          <Title text={`Add a Task in ${columnTitle}`} variant="lg" />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out"
          >
            <CrossIcon className="w-8 h-8 text-zinc-300" />
          </button>
        </div>
        <Textarea
          rows={3}
          placeholder="Write a task"
          value={content}
          setValue={setContent}
        />
        <Spacer variant="xs" />
        <div className="flex justify-between">
          <Button
            text="Save"
            variant="full"
            disabled={content.length === 0}
            handleClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </DialogBox>
    </Dialog.Root>
  );
};

export default Column;
