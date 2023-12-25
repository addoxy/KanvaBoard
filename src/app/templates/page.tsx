import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import Template from "./components/Template";
import { todosTemplate } from "./templates";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <Title text="Templates" variant="xl" />
      </div>
      <Template {...todosTemplate} />
    </PageWrapper>
  );
}
