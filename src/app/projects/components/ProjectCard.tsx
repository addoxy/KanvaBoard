import { TableCell, TableRow } from "@/components/otherui/Table";
import { useUpdateViewedAtMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import Link from "next/link";
import OptionsMenu from "./OptionsMenu";

interface ProjectCardProps {
  id: string;
  name: string;
  lastViewed: string;
  href: string;
  favorite: boolean;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { id, name, lastViewed, href, favorite } = props;
  const { refreshBoards } = useGetBoards();

  const updateViewedAtMutation = useUpdateViewedAtMutation({
    id,
    refreshBoards,
  });

  return (
    <TableRow className="text-zinc-400 hover:bg-zinc-800/20 border-b-zinc-700/30">
      <TableCell className="text-sm pl-6 lg:w-7/12 w-5/12 pb-5">
        <Link
          className="line-clamp-1"
          onClick={() => updateViewedAtMutation.mutate()}
          href={href}
        >
          {name}
        </Link>
      </TableCell>
      <TableCell className="text-sm w-6/12 lg:w-5/12 font-medium py-7 hidden sm:block">
        {lastViewed}
      </TableCell>
      <TableCell className="py-7 w-1/12">
        <OptionsMenu boardName={name} favorite={favorite} id={id} />
      </TableCell>
    </TableRow>
  );
};

export default ProjectCard;
