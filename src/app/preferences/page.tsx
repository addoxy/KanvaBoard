"use client";

import Divider from "@/components/Divider";
import PageWrapper from "@/components/PageWrapper";
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import GeneralSection from "./components/GeneralSection";
import ThemeSection from "./components/ThemeSection";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col px-48">
        <div className="flex items-center">
          <SidebarToggle className="mr-3 outline-none" />
          <Title text="Preferences" variant="xl" />
        </div>
        <Spacer variant="lg" />
        <GeneralSection />
        <Spacer variant="lg" />
        <Divider />
        <Spacer variant="lg" />
        <ThemeSection />
        <Spacer variant="lg" />
      </div>
    </PageWrapper>
  );
}
