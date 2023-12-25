"use client";

import Button from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import { Table, TableBody } from "@/components/otherui/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import SearchBar from "./components/SearchBar";

interface ApiResponse {
  id: string;
  title: string;
  userId: string;
}

export default function ProjectsPage() {
  const { data, status } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await axios.get("/api/board?q=boards");
      return JSON.parse(data) as ApiResponse[];
    },
  });

  if (status === "success") {
    console.log(data);
  }

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
        {status === "success" && (
          <Table>
            <ProjectHeader />
            <TableBody>
              {data.map((project) => (
                <ProjectCard
                  name={project.title}
                  lastViewed="Nov 10, 2023"
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
