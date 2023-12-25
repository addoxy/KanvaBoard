"use client";

import { SearchIcon } from "@/components/Icons";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface Projects {
  id: string;
  title: string;
  viewedAt: Date;
  favorite: boolean;
}

interface SearchProps {
  projects: Projects[];
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar = (props: SearchProps) => {
  const { projects, query, setQuery } = props;

  const router = useRouter();

  // const filteredOptions = query
  //   ? courses.filter(
  //       (course) =>
  //         course.name.toLowerCase().includes(query.toLowerCase()) ||
  //         course.code.toLowerCase().includes(query.toLowerCase())
  //     )
  //   : [];

  return (
    <div className="w-full">
      <Combobox
        as="div"
        onChange={() => router.push("/")}
        className="rounded-lg border border-zinc-700/50 bg-zinc-800/50"
      >
        <div className="flex items-center px-4">
          <SearchIcon className="w-4 h-4 text-zinc-500 mr-3" />
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full bg-inherit text-zinc-300 outline-none placeholder:text-zinc-500 text-sm"
            placeholder="Search for your projects"
          />
        </div>
      </Combobox>
      {/* <div className="mt-14"></div>
      <div className="divide-y-[1px] divide-zinc-200"> */}
      {/* {query.length > 0 &&
          filteredOptions &&
          !resultsDisabled &&
          filteredOptions.map((option, i) => {
            const course = courses.find((course) => course.id === option.id);
            if (!course) {
              return <></>;
            }
            return (
              <div className="mt-9" key={i}>
                <CourseCard key={i} course={course} />
              </div>
            );
          })} */}
      {/* </div> */}
      {/* {query.length === 0 && courses.length === 0 && !resultsDisabled && (
        <div className="text-2xl font-semibold text-center text-zinc-700">
          No courses available {":("}
        </div>
      )} */}
      {/* <div className="divide-y-[1px] divide-zinc-200"> */}
      {/* {query.length === 0 &&
          !resultsDisabled &&
          courses.map((course, i) => {
            return (
              <div className="mt-9" key={i}>
                <CourseCard key={i} course={course} />
              </div>
            );
          })} */}
      {/* </div> */}
      {/* {query && filteredOptions.length === 0 && !resultsDisabled && (
        <p className="py-6 text-center text-zinc-600">No results found</p>
      )} */}
    </div>
  );
};

export default SearchBar;
