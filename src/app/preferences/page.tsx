"use client";

import Divider from "@/components/Divider";
import PageWrapper from "@/components/PageWrapper";
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import GeneralSection from "./components/GeneralSection";
import SidebarSection from "./components/SidebarSection";
import ThemeSection from "./components/ThemeSection";

export default function page() {
  return (
    <PageWrapper>
      <div className="grid place-items-center">
        <div className="sm:max-w-120 md:max-w-160 lg:w-160">
          <div className="flex items-center">
            <SidebarToggle className="mr-3 outline-none" />
            <Title text="Preferences" variant="xl" />
          </div>
          <Spacer variant="lg" />
          <GeneralSection />
          <Spacer variant="lg" />
          <Divider className="bg-zinc-800/70" />
          <Spacer variant="lg" />
          <ThemeSection />
          <Spacer variant="lg" />
          <Divider className="bg-zinc-800/70" />
          <Spacer variant="lg" />
          <SidebarSection />
        </div>
        <Spacer variant="xl" />
      </div>
    </PageWrapper>
  );
}
