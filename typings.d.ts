interface IconProps {
  className: string;
}

interface TaskProps {
  id: string;
  content: string | null;
  order: number;
  columnId: string;
  boardId: string;
}

interface ColumnProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
}

interface BoardProps {
  id: string;
  title: string;
  viewedAt: Date;
  usedId: string | null;
  favorite: boolean;
  columns: Column[];
  tasks: TaskProps[];
}

interface TaskTemplateProps {
  content: string;
}

interface ColumnTemplateProps {
  title: string;
  tasks: TaskTemplateProps[];
}

interface TemplateProps {
  type: "todos" | "weeklyPlanner";
  title: string;
  description: string;
  columns: ColumnTemplateProps[];
}
