import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { notify } from "@/utils/notify";
import * as Dialog from "@radix-ui/react-dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface CreateColumnDialogProps {
  children: React.ReactNode;
  title: string;
  setTitle: (title: string) => void;
  mutationFn: UseMutationResult<AxiosResponse<any, any>, Error, void, unknown>;
}

const CreateColumnDialog = (props: CreateColumnDialogProps) => {
  const { children, title, setTitle, mutationFn } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (mutationFn.isSuccess || mutationFn.isError) {
      setIsOpen(false);
    }
  }, [mutationFn.isSuccess, mutationFn.isError, setIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        if (mutationFn.isPending) {
          setIsOpen(true);
        } else {
          setIsOpen(value);
        }
        setTitle("");
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <DialogBox variant="xl">
        <div className="flex justify-between items-center mb-6">
          <Title text="Create a column" variant="lg" />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out disabled:cursor-not-allowed"
            disabled={mutationFn.isPending}
          >
            <CrossIcon className="w-8 h-8 text-zinc-300" />
          </button>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <span className="text-zinc-500 font-medium">Name</span>
          <Input
            autoFocus={true}
            variant="full"
            value={title}
            setValue={setTitle}
            handleKeyDown={(e) => {
              if (e.key === "Enter") {
                if (title !== "") {
                  mutationFn.mutate();
                } else {
                  notify("Column name can't be empty", "warning");
                }
              }
            }}
          />
        </div>
        <Button
          variant="full"
          disabled={mutationFn.isPending}
          text="Save"
          handleClick={() => {
            if (title !== "") {
              mutationFn.mutate();
            } else {
              notify("Column name can't be empty", "warning");
            }
          }}
        />
      </DialogBox>
    </Dialog.Root>
  );
};

export default CreateColumnDialog;
