"use client";

import PageWrapper from "@/components/PageWrapper";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import Template from "./components/Template";
import { todosTemplate, weeklyPlannerTemplate } from "./templates";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <Title text="Templates" variant="xl" />
        <Spacer variant="lg" />
        <Template {...todosTemplate} />
        <Spacer variant="md" />
        <Template {...weeklyPlannerTemplate} />
        <Spacer variant="md" />
      </div>
    </PageWrapper>
  );
}
