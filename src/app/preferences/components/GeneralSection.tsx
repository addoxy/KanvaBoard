"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
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
    <div className="flex flex-col">
      <Title text="Preferences" variant="xl" />
      <Spacer variant="lg" />
      <div className="flex flex-col">
        <Title text="General" variant="lg" className="mb-6" />
        <span className="text-sm text-zinc-400 mb-3">Workspace Name</span>
        {status === "pending" && <LoadingInput />}
        {status === "success" && (
          <>
            <Input
              variant="lg"
              defaultValue={workspaceName}
              setValue={setNewName}
            />
            <Spacer variant="xs" />
          </>
        )}
        <Button
          variant="md"
          text="Update"
          handleClick={() => updateWorkspaceNameMutation.mutate()}
        />
      </div>
    </div>
  );
};

export default GeneralSection;
