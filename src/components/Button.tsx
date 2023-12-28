"use client";

import { cn } from "@/utils/utils";

interface ButtonProps {
  variant: "md" | "lg" | "xl" | "full" | "delete";
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { variant, text, handleClick, disabled } = props;

  return (
    <button
      disabled={disabled}
      className={cn(
        "bg-violet-700 text-zinc-300 text-sm shrink-0",
        variant === "full" && "w-full rounded-lg h-10",
        variant === "delete" && "w-full rounded-lg h-10 bg-zinc-600",
        variant === "xl" && "w-44 h-11 rounded-lg font-medium",
        variant === "lg" && "w-36 h-9 rounded-lg font-medium",
        variant === "md" && "w-22 h-8 rounded-md"
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
