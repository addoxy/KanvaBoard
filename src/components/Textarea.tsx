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
      className="resize-none bg-zinc-700/25 border border-zinc-700/50 text-zinc-300 text-sm px-5 py-4 rounded-lg focus:outline-zinc-600 focus:outline-none"
    />
  );
};

export default Textarea;
