import { cn } from "@/app/utils/utils";

const SignoutIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        stroke-dasharray="32"
        stroke-dashoffset="32"
        d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"
      ></path>
      <path
        stroke-dasharray="12"
        stroke-dashoffset="12"
        d="M9 12h11.5"
        opacity="0"
      ></path>
      <path
        stroke-dasharray="6"
        stroke-dashoffset="6"
        d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
        opacity="0"
      ></path>
    </svg>
  );
};

export default SignoutIcon;
