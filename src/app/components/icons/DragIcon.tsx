import { cn } from "@/app/utils/utils";

const DragIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.33333" cy="1.33333" r="1.33333" />
      <circle cx="6.66683" cy="1.33333" r="1.33333" />
      <circle cx="6.66683" cy="6.66671" r="1.33333" />
      <circle cx="1.33333" cy="6.66671" r="1.33333" />
    </svg>
  );
};

export default DragIcon;
