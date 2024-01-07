"use client";

import Button from "@/components/Button";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { useCreateTemplateMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import TemplateContainer from "./TemplateContainer";

const Template = (props: TemplateProps) => {
  const { type, title, description, columns } = props;

  const { refreshBoards } = useGetBoards();

  const createTemplateMutation = useCreateTemplateMutation({
    type,
    refreshBoards,
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Title text={title} variant="lg" />
        <Button
          text="Get Template"
          disabled={createTemplateMutation.isPending}
          variant="lg"
          handleClick={() => {
            createTemplateMutation.mutate();
          }}
        />
      </div>
      <Spacer variant="sm" />
      <TemplateDescription>{description}</TemplateDescription>
      <Spacer variant="sm" />
      <TemplateContainer columns={columns} />
    </div>
  );
};

const TemplateDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-sm text-zinc-300/80 font-normal leading-6">{children}</p>
  );
};

export default Template;
