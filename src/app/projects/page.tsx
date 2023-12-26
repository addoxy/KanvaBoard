"use client";

import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import { Table, TableBody } from "@/components/otherui/Table";
import { convertDateFormat } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import CreateBoard from "./components/CreateBoard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import SearchBar from "./components/SearchBar";

interface ApiResponse {
  id: string;
  title: string;
  viewedAt: Date;
  favorite: boolean;
}

export default function ProjectsPage() {
  const { data, status } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await axios.get("/api/board?q=boards");
      return JSON.parse(data) as ApiResponse[];
    },
  });

  const [query, setQuery] = useState<string>("");

  const filteredOptions = query
    ? data?.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <PageWrapper>
      <div className="flex flex-col">
        <Title text="Projects" variant="xl" className="mb-10" />
        <div className="flex gap-x-2 items-center mb-20">
          <SearchBar isEnabled={status === "success"} setQuery={setQuery} />
          <CreateBoard isEnabled={status === "success"} />
        </div>
        {status === "pending" && <LoadingSkeleton />}
        {status == "error" && <span>There was an error</span>}
        {status === "success" && query.length === 0 && data.length > 0 && (
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
                  favorite={project.favorite}
                />
              ))}
            </TableBody>
          </Table>
        )}
        {status === "success" &&
          query.length > 0 &&
          filteredOptions &&
          filteredOptions?.length > 0 && (
            <Table>
              <ProjectHeader />
              <TableBody>
                {filteredOptions.map((option, i) => {
                  const project = data.find(
                    (project) => project.id === option.id
                  );
                  if (!project) {
                    return <></>;
                  }
                  return (
                    <ProjectCard
                      id={project.id}
                      name={project.title}
                      lastViewed={convertDateFormat(project.viewedAt)}
                      href={`/projects/board/${project.id}`}
                      key={project.id}
                      favorite={project.favorite}
                    />
                  );
                })}
              </TableBody>
            </Table>
          )}
        {status === "success" && query && filteredOptions?.length === 0 && (
          <p className="py-16 text-center text-zinc-400">No results found</p>
        )}
        {status === "success" && query.length === 0 && data.length === 0 && (
          <div className="text-2xl py-10 font-semibold text-center text-zinc-400">
            You have no boards yet. Click on the `&apos;+ New Board`&apos;
            button to create a new board.
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
