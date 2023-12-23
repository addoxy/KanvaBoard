import { TableCell, TableRow } from "@/components/otherui/Table";
import OptionsMenu from "./OptionsMenu";

const ProjectCard = () => {
  return (
    <TableRow className="text-zinc-400 hover:bg-zinc-800/20 border-b-zinc-700/30">
      <TableCell className="pl-6 py-7">Project Progress</TableCell>
      <TableCell className="py-7">Nov 10, 2023</TableCell>
      <TableCell className="py-7 pr-6">
        <OptionsMenu />
      </TableCell>
    </TableRow>
  );
};

export default ProjectCard;
