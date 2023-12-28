interface TextareaProps {
  rows?: number;
  defaultValue?: string;
  value?: string;
  setValue: (value: string) => void;
}

const Textarea = (props: TextareaProps) => {
  const { rows, defaultValue, value, setValue } = props;

  return (
    <textarea
      rows={rows}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="resize-none text-zinc-300 text-sm px-5 py-4 border-zinc-700/30 border bg-zinc-800/40 rounded-md focus:outline-zinc-700 focus:outline-none"
    />
  );
};

export default Textarea;
