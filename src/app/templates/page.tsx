import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <Title text="Templates" variant="xl" />
      </div>
    </PageWrapper>
  );
}
