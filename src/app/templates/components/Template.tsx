"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { useCreateTemplateMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import { useRouter } from "next/navigation";
import TemplateContainer from "./TemplateContainer";

const Template = (props: TemplateProps) => {
  const { type, title, description, columns } = props;
  const router = useRouter();

  const { refreshBoards } = useGetBoards();

  const createTemplateMutation = useCreateTemplateMutation({
    type,
    refreshBoards,
  });

  return (
    <div className="flex flex-col mt-14">
      <div className="flex justify-between mb-7 items-center">
        <Title text={title} variant="lg" />
        <Button
          text="Get Template"
          variant="lg"
          handleClick={() => {
            createTemplateMutation.mutate();
          }}
        />
      </div>
      <TemplateDescription>{description}</TemplateDescription>
      <TemplateContainer columns={columns} />
    </div>
  );
};

const TemplateDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-sm text-zinc-400 font-normal leading-6 mb-11">
      {children}
    </p>
  );
};

export default Template;
