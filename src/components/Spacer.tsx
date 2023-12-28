import { cn } from "@/utils/utils";

interface SpacerProps {
  variant: "sm" | "md" | "lg" | "xl";
}

const Spacer = (props: SpacerProps) => {
  const { variant } = props;
  return (
    <div
      className={cn(
        variant === "sm" && "mt-8",
        variant === "md" && "mt-16",
        variant === "lg" && "mt-20",
        variant === "xl" && "mt-30"
      )}
    />
  );
};

export default Spacer;
