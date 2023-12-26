import { TableHead, TableHeader, TableRow } from "@/components/otherui/Table";

const ProjectHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b-zinc-700/30">
        <TableHead className="text-sm text-zinc-600 pl-6 w-7/12 pb-5">
          Title
        </TableHead>
        <TableHead className="text-sm w-4/12 font-medium text-zinc-600 pb-5">
          Last Viewed At
        </TableHead>
        <TableHead className="w-1/12"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectHeader;
