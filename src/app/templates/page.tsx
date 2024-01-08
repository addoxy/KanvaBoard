"use client";

import PageWrapper from "@/components/PageWrapper";
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import Template from "./components/Template";
import { todosTemplate, weeklyPlannerTemplate } from "./templates";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <div className="flex items-center">
          <SidebarToggle className="mr-3 outline-none" />
          <Title text="Templates" variant="xl" />
        </div>
        <Spacer variant="lg" />
        <Template {...todosTemplate} />
        <Spacer variant="xl" />
        <Template {...weeklyPlannerTemplate} />
        <Spacer variant="lg" />
      </div>
    </PageWrapper>
  );
}
