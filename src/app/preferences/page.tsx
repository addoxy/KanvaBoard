"use client";

import Button from "@/components/Button";
import Toggle from "./components/Toggle";

export default function page() {
  return (
    <div className="flex flex-col px-48">
      <span className="font-medium text-2xl text-zinc-300 mb-14">
        Preferences
      </span>
      <div className="flex flex-col pb-18 border-b border-b-zinc-700/50">
        <span className="font-medium text-base text-zinc-300 mb-6">
          General
        </span>
        <span className="text-sm text-zinc-400 mb-3">Workspace Name</span>
        <input
          className="w-100 text-sm py-2 px-3 text-zinc-300 bg-zinc-800/50 border border-zinc-700/25 rounded-md mb-6"
          defaultValue="My Workspace"
        />
        <Button
          variant="md"
          text="Update"
          handleClick={() => console.log("")}
        />
      </div>
      <div className="flex flex-col pt-18 border-b-zinc-700/50">
        <span className="font-medium text-base text-zinc-300 mb-6">Theme</span>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-400 mb-3">Dark Mode</span>
          <Toggle />
        </div>
        <span className="text-sm text-zinc-500">
          Customize the color scheme of your interface
        </span>
      </div>
    </div>
  );
}
