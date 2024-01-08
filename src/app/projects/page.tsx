"use client";

import PageWrapper from "@/components/PageWrapper";
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { Table, TableBody } from "@/components/otherui/Table";
import { useGetBoards } from "@/lib/queries";
import { convertDateFormat } from "@/utils/utils";
import { useState } from "react";
import CreateBoard from "./components/CreateBoard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import SearchBar from "./components/SearchBar";

export default function ProjectsPage() {
  const { boards, status } = useGetBoards();

  const [query, setQuery] = useState<string>("");

  const filteredOptions = query
    ? boards?.filter((board) =>
        board.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <PageWrapper>
      <div className="flex flex-col">
        <div className="flex items-center">
          <SidebarToggle className="mr-3 outline-none" />
          <Title text="Projects" variant="xl" />
        </div>
        <Spacer variant="sm" />
        <div className="flex sm:gap-x-2 sm:items-center flex-col gap-y-2 sm:flex-row sm:gap-y-0 gap-x-0">
          <SearchBar isEnabled={status === "success"} setQuery={setQuery} />
          <CreateBoard isEnabled={status === "success"} />
        </div>
        <Spacer variant="lg" />
        {status === "pending" && <LoadingSkeleton />}
        {status == "error" && <span>There was an error</span>}
        {status === "success" &&
          query.length === 0 &&
          boards &&
          boards.length > 0 && (
            <Table>
              <ProjectHeader />
              <TableBody>
                {boards.map((project) => (
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
          boards &&
          filteredOptions?.length > 0 && (
            <Table>
              <ProjectHeader />
              <TableBody>
                {filteredOptions.map((option, i) => {
                  const project = boards.find(
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
          <>
            <Spacer variant="md" />
            <p className="text-center text-zinc-400">No results found</p>
          </>
        )}
        {status === "success" &&
          query.length === 0 &&
          boards &&
          boards.length === 0 && (
            <>
              <Spacer variant="md" />
              <div className="text-md text-center text-zinc-400">
                You have no projects yet. Click on the &quot;+ New Project&quot;
                button to create a new project or get one of the templates.
              </div>
            </>
          )}
        <Spacer variant="lg" />
      </div>
    </PageWrapper>
  );
}
