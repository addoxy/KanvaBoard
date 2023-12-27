"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { useUpdateWorkspaceNameMutation } from "@/lib/mutations";
import { useGetWorkspaceName } from "@/lib/queries";
import { useState } from "react";
import LoadingInput from "./LoadingSkeleton";

const GeneralSection = () => {
  const { workspaceName, status, refreshWorkspaceName } = useGetWorkspaceName();

  const [newName, setNewName] = useState("");
  const updateWorkspaceNameMutation = useUpdateWorkspaceNameMutation({
    newName,
    refreshWorkspaceName,
  });

  return (
    <>
      <Title text="Preferences" variant="xl" className="mb-14" />
      <div className="flex flex-col pb-18 border-b border-b-zinc-700/50">
        <Title text="General" variant="lg" className="mb-6" />
        <span className="text-sm text-zinc-400 mb-3">Workspace Name</span>
        {status === "pending" && <LoadingInput />}
        {status === "success" && (
          <input
            className="w-100 text-sm py-2 px-3 text-zinc-300 bg-zinc-800/50 border border-zinc-700/25 rounded-md mb-6"
            defaultValue={workspaceName}
            onChange={(e) => setNewName(e.target.value)}
          />
        )}
        <Button
          variant="md"
          text="Update"
          handleClick={() => updateWorkspaceNameMutation.mutate()}
        />
      </div>
    </>
  );
};

export default GeneralSection;