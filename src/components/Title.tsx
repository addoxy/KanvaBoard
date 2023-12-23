import { cn } from "@/utils/utils";

interface TitleProps {
  text: string;
  variant: "xl" | "lg";
  className?: string;
}

const Title = (props: TitleProps) => {
  const { text, variant, className } = props;
  return (
    <span
      className={cn(
        "font-medium text-zinc-300",
        variant === "xl" && "text-2xl",
        variant === "lg" && "text-base",
        className
      )}
    >
      {text}
    </span>
  );
};

export default Title;
