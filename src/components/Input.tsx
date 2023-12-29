import { cn } from "@/utils/utils";
import { RefObject } from "react";

interface InputProps {
  reference?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  defaultValue?: string;
  value?: string;
  setValue: (value: string) => void;
  variant: "sm" | "md" | "lg" | "xl" | "full";
}

const Input = (props: InputProps) => {
  const { reference, autoFocus, defaultValue, value, setValue, variant } =
    props;

  return (
    <input
      ref={reference}
      autoFocus={autoFocus}
      placeholder="Untitled"
      className={cn(
        "text-sm py-2 px-3 text-zinc-300 border-zinc-700/30 border bg-zinc-800/40 rounded-md focus:outline-zinc-700 focus:outline-none placeholder:text-zinc-600",
        variant === "full" && "w-full",
        variant === "lg" && "w-100",
        variant === "xl" && "w-120"
      )}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
