"use client";

import { CrossIcon } from "@/components/Icons";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

const Task = (props: TaskProps) => {
  const { id, handleEditTask, handleDeleteTask, columnTitle } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(props.content);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <p className="cursor-pointer rounded-lg border border-zinc-700/20 bg-zinc-700/30 p-3 text-sm text-zinc-300">
          {props.content}
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-900/75 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="w-150 px-9 pt-8 pb-10 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none">
          <div className="flex justify-between items-center mb-6">
            <Title text={`Editing a Task in ${columnTitle}`} variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md"
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <textarea
            rows={3}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="resize-none bg-zinc-700/25 border border-zinc-700/50 text-zinc-300 mb-6 text-sm px-5 py-4 rounded-lg focus:outline-zinc-600 focus:outline-none"
          />
          <div className="flex justify-between">
            <button
              onClick={() => {
                handleDeleteTask(id);
                setIsOpen(false);
              }}
              className="w-64 bg-zinc-600 text-zinc-100 text-sm py-3 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleEditTask(id, content);
                setIsOpen(false);
              }}
              className="w-64 bg-violet-600 text-zinc-100 text-sm py-3 rounded-lg"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Task;
