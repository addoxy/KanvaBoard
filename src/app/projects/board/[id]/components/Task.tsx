"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
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
      <DialogBox variant="xl">
        <div className="flex justify-between items-center mb-6">
          <Title text={`Editing a Task in ${columnTitle}`} variant="lg" />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-700/20 rounded-md"
          >
            <CrossIcon className="w-8 h-8 text-zinc-300" />
          </button>
        </div>
        <Textarea
          rows={3}
          placeholder="Edit the task"
          value={content}
          setValue={setContent}
        />
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
      </DialogBox>
    </Dialog.Root>
  );
};

export default Task;
