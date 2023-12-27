"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { useState } from "react";
import Column from "./Column";

const Board = (props: BoardProps) => {
  const { id } = props;

  const [title, setTitle] = useState(props.title);
  const [columns, setColumns] = useState(props.columns);

  function handleSetColumns() {
    setColumns([
      ...columns,
      {
        id: "newid",
        title: "New Column",
        tasks: [],
        handleDeleteColumn: handleDeleteColumn,
      },
    ]);
  }

  function handleDeleteColumn(columnId: string) {
    setColumns(columns.filter((column) => column.id !== columnId));
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-16">
        <Title text={title} variant="xl" />
        <Button
          text="+ New Column"
          variant="lg"
          handleClick={handleSetColumns}
        />
      </div>
      <div className="flex gap-x-6 overflow-x-auto -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {columns.map((column) => (
          <Column
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            key={column.id}
            handleDeleteColumn={handleDeleteColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
