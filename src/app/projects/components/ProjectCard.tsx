import { TableCell, TableRow } from "@/components/otherui/Table";
import Link from "next/link";
import OptionsMenu from "./OptionsMenu";

interface ProjectCardProps {
  id: string;
  name: string;
  lastViewed: string;
  href: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { id, name, lastViewed, href } = props;
  return (
    <TableRow className="text-zinc-400 hover:bg-zinc-800/20 border-b-zinc-700/30">
      <TableCell className="pl-6 py-7">
        <Link href={href}>{name}</Link>
      </TableCell>
      <TableCell className="py-7">{lastViewed}</TableCell>
      <TableCell className="py-7 pr-6">
        <OptionsMenu id={id} />
      </TableCell>
    </TableRow>
  );
};

export default ProjectCard;
