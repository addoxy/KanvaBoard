"use client";

import Button from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import Toggle from "./components/Toggle";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col px-48">
        <Title text="Preferences" variant="xl" className="mb-14" />
        <div className="flex flex-col pb-18 border-b border-b-zinc-700/50">
          <Title text="General" variant="lg" className="mb-6" />
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
          <Title text="Theme" variant="lg" className="mb-6" />
          <div className="flex justify-between">
            <span className="text-sm text-zinc-400 mb-3">Dark Mode</span>
            <Toggle />
          </div>
          <span className="text-sm text-zinc-500">
            Customize the color scheme of your interface
          </span>
        </div>
      </div>
    </PageWrapper>
  );
}
