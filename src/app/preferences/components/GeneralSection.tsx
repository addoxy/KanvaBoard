"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { useUpdateWorkspaceNameMutation } from "@/lib/mutations";
import { useGetWorkspaceName } from "@/lib/queries";
import { notify } from "@/utils/notify";
import { useRef, useState } from "react";
import LoadingInput from "./LoadingSkeleton";

const GeneralSection = () => {
  const { workspaceName, status, refreshWorkspaceName } = useGetWorkspaceName();
  const inputRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState("");

  const updateWorkspaceNameMutation = useUpdateWorkspaceNameMutation({
    newName,
    refreshWorkspaceName,
  });

  function handleClick() {
    if (inputRef.current?.value === workspaceName) {
      notify("Please provide a different name", "warning");
      return;
    }

    if (inputRef.current?.value === "") {
      notify("Workspace name can't be empty", "warning");
      return;
    }

    updateWorkspaceNameMutation.mutate();
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Title text="General" variant="lg" className="mb-6" />
        <span className="text-sm text-zinc-400 mb-3">Workspace Name</span>
        {status === "pending" && <LoadingInput />}
        {status === "success" && (
          <>
            <Input
              reference={inputRef}
              autoFocus={false}
              variant="lg"
              defaultValue={workspaceName}
              setValue={setNewName}
            />
            <Spacer variant="xs" />
          </>
        )}
        <Button variant="md" text="Update" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default GeneralSection;
