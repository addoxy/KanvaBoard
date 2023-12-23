import { TableHead, TableHeader, TableRow } from "@/components/otherui/Table";

const ProjectHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b-zinc-700/30">
        <TableHead className="text-sm text-zinc-600 pl-6 pb-5 w-160">
          Title
        </TableHead>
        <TableHead className="text-sm w-120 font-medium text-zinc-600 pb-5">
          Last Viewed At
        </TableHead>
        <TableHead className="mr-6 pb-5 pr-6"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectHeader;
