import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface AddTaskProps {
  columnTitle: string;
}

const AddTaskDialog = (props: AddTaskProps) => {
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

export default AddTaskDialog;
