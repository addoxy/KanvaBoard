import { cn } from "@/utils/utils";

interface InputProps {
  defaultValue?: string;
  value?: string;
  setValue: (value: string) => void;
  variant: "sm" | "md" | "lg" | "xl" | "full";
}

const Input = (props: InputProps) => {
  const { defaultValue, value, setValue, variant } = props;

  return (
    <input
      className={cn(
        "text-sm py-2 px-3 text-zinc-300 bg-zinc-800/50 border border-zinc-700/25 rounded-md focus:outline-zinc-600 focus:outline-none",
        variant === "full" && "w-full",
        variant === "lg" && "w-100",
        variant === "xl" && "w-120"
      )}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
