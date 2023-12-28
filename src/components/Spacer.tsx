import { cn } from "@/utils/utils";

interface SpacerProps {
  variant: "xs" | "sm" | "md" | "lg" | "xl";
}

const Spacer = (props: SpacerProps) => {
  const { variant } = props;
  return (
    <div
      className={cn(
        variant === "xs" && "mt-6",
        variant === "sm" && "mt-10",
        variant === "md" && "mt-16",
        variant === "lg" && "mt-20",
        variant === "xl" && "mt-32"
      )}
    />
  );
};

export default Spacer;
