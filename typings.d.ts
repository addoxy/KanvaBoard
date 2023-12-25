interface IconProps {
  className: string;
}

interface BoardProps {
  id: string;
  title: string;
  columns: ColumnProps[];
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskProps[];
  handleDeleteColumn?: (columnId: string) => void;
}

interface TaskProps {
  id: string;
  content: string;
  handleEditTask?: (taskId: string, newContent: string) => void;
  handleDeleteTask?: (taskId: string) => void;
  columnTitle?: string;
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
