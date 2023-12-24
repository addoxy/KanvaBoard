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
  title: String;
  tasks: TaskProps[];
}

interface TaskProps {
  id: string;
  content: string;
}
