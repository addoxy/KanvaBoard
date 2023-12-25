"use client";

import Button from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import { Table, TableBody } from "@/components/otherui/Table";
import { convertDateFormat } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import SearchBar from "./components/SearchBar";

interface ApiResponse {
  id: string;
  title: string;
  viewedAt: Date;
}

export default function ProjectsPage() {
  const { data, status } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await axios.get("/api/board?q=boards");
      return JSON.parse(data) as ApiResponse[];
    },
  });

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
        {status === "pending" && <LoadingSkeleton />}
        {status == "error" && <span>There was an error</span>}
        {status === "success" && data.length > 0 && (
          <Table>
            <ProjectHeader />
            <TableBody>
              {data.map((project) => (
                <ProjectCard
                  id={project.id}
                  name={project.title}
                  lastViewed={convertDateFormat(project.viewedAt)}
                  href={`/projects/board/${project.id}`}
                  key={project.id}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </PageWrapper>
  );
}
