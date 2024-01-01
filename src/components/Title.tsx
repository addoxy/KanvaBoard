import { cn } from "@/utils/utils";
import { MouseEventHandler } from "react";

interface TitleProps {
  text: string;
  variant: "lg" | "ml" | "xl";
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Title = (props: TitleProps) => {
  const { text, variant, className, onClick } = props;
  return (
    <span
      className={cn(
        "font-medium text-zinc-300",
        variant === "xl" && "text-2xl",
        variant === "ml" && "text-xl",
        variant === "lg" && "text-base",
        className
      )}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Title;
