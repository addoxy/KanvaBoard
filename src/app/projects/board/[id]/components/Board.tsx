"use client";

import Button from "@/components/Button";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { useState } from "react";
import Column from "./Column";

const Board = (props: BoardProps) => {
  const { id } = props;

  const [title, setTitle] = useState(props.title);
  const [columns, setColumns] = useState(props.columns);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <Title text={title} variant="xl" className="line-clamp-1" />
        <Button text="+ New Column" variant="lg" />
      </div>
      <Spacer variant="lg" />
      <div className="flex gap-x-6 -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round overflow-x-auto h-full">
        {columns.map((column) => (
          <Column {...column} key={column.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
