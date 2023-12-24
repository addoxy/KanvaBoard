"use client";

import { useState } from "react";

const Task = (props: TaskProps) => {
  const { id } = props;

  const [content, setContent] = useState(props.content);

  return (
    <p className="cursor-pointer rounded-lg border border-zinc-700/20 bg-zinc-700/30 p-3 text-sm text-zinc-300">
      {content}
    </p>
  );
};

export default Task;
