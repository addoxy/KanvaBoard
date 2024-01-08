import { TableHead, TableHeader, TableRow } from "@/components/otherui/Table";

const ProjectHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b-zinc-700/30">
        <TableHead className="text-sm text-zinc-600 pl-6 md:w-7/12 w-7/12 pb-5">
          Title
        </TableHead>
        <TableHead className="text-sm w-7/12 lg:w-5/12 font-medium text-zinc-600 pb-5 hidden sm:block">
          Last Viewed
        </TableHead>
        <TableHead className=""></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectHeader;
