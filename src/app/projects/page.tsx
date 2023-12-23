"use client";

import Button from "@/components/Button";
import SearchBar from "./components/SearchBar";

export default function page() {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-2xl text-zinc-300 mb-10">Projects</span>
      <div className="flex gap-x-2 items-center">
        <SearchBar />
        <Button
          variant="xl"
          text="+ New Project"
          handleClick={() => console.log("")}
        />
      </div>
    </div>
  );
}
