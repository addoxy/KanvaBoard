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
      <DialogOverlay className="bg-zinc-925/60 data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogContent
        className={cn(
          "pt-8 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col bg-zinc-925 border border-zinc-800 rounded-xl focus:outline-none",
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
