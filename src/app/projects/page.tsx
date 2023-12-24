"use client";

import Button from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import { Table, TableBody } from "@/components/otherui/Table";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import SearchBar from "./components/SearchBar";

export default function page() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <Title text="Projects" variant="xl" className="mb-10" />
        <div className="flex gap-x-2 items-center mb-20">
          <SearchBar />
          <Button
            variant="xl"
            text="+ New Project"
            handleClick={() => console.log("")}
          />
        </div>
        <Table>
          <ProjectHeader />
          <TableBody>
            <ProjectCard
              name="Project Progress"
              lastViewed="Nov 10, 2023"
              href="/"
            />
            <ProjectCard
              name="Hackathon Tasks"
              lastViewed="Dec 12, 2023"
              href="/"
            />
          </TableBody>
        </Table>
      </div>
    </PageWrapper>
  );
}
