"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import TemplateContainer from "./TemplateContainer";

const Template = (props: TemplateProps) => {
  const { title, description, columns } = props;

  return (
    <div className="flex flex-col mt-14">
      <div className="flex justify-between mb-7 items-center">
        <Title text={title} variant="lg" />
        <Button
          text="Get Template"
          variant="lg"
          handleClick={() => console.log("")}
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
