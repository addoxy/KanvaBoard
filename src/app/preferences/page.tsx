"use client";

import PageWrapper from "@/components/PageWrapper";
import GeneralSection from "./components/GeneralSection";
import ThemeSection from "./components/ThemeSection";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col px-48">
        <GeneralSection />
        <ThemeSection />
      </div>
    </PageWrapper>
  );
}
