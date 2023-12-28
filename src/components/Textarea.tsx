interface TextareaProps {
  rows?: number;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  setValue: (value: string) => void;
}

const Textarea = (props: TextareaProps) => {
  const { rows, defaultValue, value, placeholder, setValue } = props;

  return (
    <textarea
      autoFocus
      placeholder={placeholder}
      rows={rows}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="resize-none text-zinc-300 text-sm px-5 py-4 border-zinc-700/30 border bg-zinc-800/40 rounded-md focus:outline-zinc-700 focus:outline-none placeholder:text-zinc-600"
    />
  );
};

export default Textarea;
