"use client";

import { SearchIcon } from "@/components/Icons";
import { Combobox } from "@headlessui/react";

interface SearchProps {
  isEnabled: boolean;
  setQuery: (query: string) => void;
}

const SearchBar = (props: SearchProps) => {
  const { isEnabled, setQuery } = props;

  return (
    <div className="w-full">
      <Combobox
        as="div"
        disabled={!isEnabled}
        className="rounded-lg border border-zinc-700/50 bg-zinc-800/50"
      >
        <div className="flex items-center px-4">
          <SearchIcon className="w-4 h-4 text-zinc-500 mr-3" />
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full bg-inherit text-zinc-300 outline-none placeholder:text-zinc-500 text-sm disabled:cursor-not-allowed"
            placeholder="Search for your projects"
          />
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBar;
