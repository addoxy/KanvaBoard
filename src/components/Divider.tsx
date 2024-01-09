import { cn } from "@/utils/utils";

interface DividerProps {
  className?: string;
}

const Divider = (props: DividerProps) => {
  const { className } = props;

  return <div className={cn("h-px w-full", className)} />;
};

export default Divider;
