import { cn } from "@/utils/utils";

interface NavHeaderProps {
  name: string;
  className?: string;
}

const NavHeader = (props: NavHeaderProps) => {
  const { name, className } = props;

  return (
    <span className={cn("text-zinc-600 text-xs font-semibold", className)}>
      {name}
    </span>
  );
};

export default NavHeader;
