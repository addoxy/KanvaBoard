"use client";

import { cn } from "@/utils/utils";

interface ButtonProps {
  variant: "md" | "lg" | "xl";
  text: string;
  handleClick: () => void;
}

const Button = (props: ButtonProps) => {
  const { variant, text, handleClick } = props;

  return (
    <button
      className={cn(
        "bg-violet-700 text-zinc-300 text-sm shrink-0",
        variant === "xl" && "w-44 h-11 rounded-lg",
        variant === "lg" && "w-32 h-8 rounded-lg",
        variant === "md" && "w-22 h-8 rounded-md"
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
