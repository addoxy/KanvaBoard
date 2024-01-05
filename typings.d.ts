interface IconProps {
  className: string;
}

interface Task {
  id: string;
  content: string | null;
  order: number;
  columnId: string;
  refreshBoard: () => void;
  columnTitle?: string;
}

interface Column {
  id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
  refreshBoard: () => void;
}

interface Board {
  id: string;
  title: string;
  viewedAt: Date;
  usedId: string | null;
  favorite: boolean;
  columns: Column[];
  refreshBoard: () => void;
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
