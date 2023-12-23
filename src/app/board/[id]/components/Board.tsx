"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import Column from "./Column";

const Board = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-16">
        <Title text="Board Title" variant="xl" />
        <Button
          text="+ New Column"
          variant="lg"
          handleClick={() => console.log("")}
        />
      </div>
      <div className="flex gap-x-6">
        <Column />
      </div>
    </>
  );
};

export default Board;
