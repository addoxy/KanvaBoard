import { cn } from "@/utils/utils";
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";

interface DialogBoxProps {
  children: React.ReactNode;
  variant: "lg" | "xl";
}

const DialogBox = (props: DialogBoxProps) => {
  const { children, variant } = props;

  return (
    <DialogPortal>
      <DialogOverlay className="bg-zinc-925/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0" />
      <DialogContent
        className={cn(
          "pt-8 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col bg-zinc-925 border border-zinc-800 rounded-xl focus:outline-none",
          variant === "lg" && "sm:w-104 px-9 w-10/12",
          variant === "xl" && "sm:w-140 px-9 pb-10 w-10/12"
        )}
      >
        {children}
      </DialogContent>
    </DialogPortal>
  );
};

export default DialogBox;
