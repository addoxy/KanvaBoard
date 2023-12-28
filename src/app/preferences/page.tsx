"use client";

import PageWrapper from "@/components/PageWrapper";
import Spacer from "@/components/Spacer";
import GeneralSection from "./components/GeneralSection";
import ThemeSection from "./components/ThemeSection";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col px-48">
        <GeneralSection />
        <Spacer variant="lg" />
        <ThemeSection />
        <Spacer variant="lg" />
      </div>
    </PageWrapper>
  );
}
