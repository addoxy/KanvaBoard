import { CrossIcon, DragIcon } from "@/components/Icons";

interface TemplateContainerProps {
  columns: ColumnTemplateProps[];
}

const TemplateContainer = (props: TemplateContainerProps) => {
  const { columns } = props;

  return (
    <div className="bg-zinc-950/25 -mx-12 flex justify-center">
      <div className="flex gap-x-6 pt-7 pb-11">
        {columns.map((column, i) => (
          <Column title={column.title} tasks={column.tasks} key={i} />
        ))}
      </div>
    </div>
  );
};

const Column = (props: ColumnTemplateProps) => {
  const { title, tasks } = props;

  return (
    <div className="flex flex-col">
      <div className="mb-4 w-80 flex items-center justify-between gap-x-4">
        <span className="text-sm text-zinc-300 font-medium">{title}</span>
        <div className="flex items-center">
          <button className="hover:bg-zinc-700/50 rounded-md mr-2 p-2">
            <DragIcon className="w-2 h-2 text-zinc-300" />
          </button>
          <button className="hover:bg-zinc-700/50 rounded-md">
            <CrossIcon className="w-6 h-6 text-zinc-300" />
          </button>
        </div>
      </div>
      <div className="flex w-80 flex-col gap-y-2 rounded-lg border border-zinc-800/30 bg-zinc-850 p-4">
        {tasks.map((task, i) => (
          <Task content={task.content} key={i} />
        ))}
        <button className="text-zinc-400 text-sm text-left h-11 hover:bg-zinc-800/70 pl-3 rounded-lg hover:text-zinc-300">
          + Add Task
        </button>
      </div>
    </div>
  );
};

const Task = (props: TaskTemplateProps) => {
  const { content } = props;

  return (
    <div>
      <p className="cursor-pointer rounded-lg border border-zinc-700/20 bg-zinc-700/30 p-3 text-sm text-zinc-300">
        {content}
      </p>
    </div>
  );
};

export default TemplateContainer;
