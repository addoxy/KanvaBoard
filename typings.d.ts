interface IconProps {
  className: string;
}

interface TaskProps {
  id: string;
  content: string | null;
  order: number;
  columnId: string;
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
}

interface TaskTemplateProps {
  content: string;
}

interface ColumnTemplateProps {
  title: string;
  tasks: TaskTemplateProps[];
}

interface TemplateProps {
  title: string;
  description: string;
  columns: ColumnTemplateProps[];
}
