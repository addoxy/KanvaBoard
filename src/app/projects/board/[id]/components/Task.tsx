"use client";

import Button from "@/components/Button";
import { CrossIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
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
          <Textarea rows={3} value={content} setValue={setContent} />
          <Spacer variant="xs" />
          <div className="justify-between gap-x-3 w-full grid grid-cols-2 grid-rows-1">
            <Button
              text="Delete"
              variant="delete"
              handleClick={() => {
                handleEditTask(id);
                setIsOpen(false);
              }}
            />
            <Button
              text="Save"
              variant="full"
              handleClick={() => {
                handleDeleteTask(id);
                setIsOpen(false);
              }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Task;
