import BoardMenu from "./BoardMenu";
import { BoardData } from "@/utils/types";
import { formatDateRange } from "@/utils/utils";
import { CircularProgress } from "@nextui-org/progress";
import { Calendar } from "lucide-react";
import Image from "next/image";

const BoardCard = (props: BoardData) => {
  const { id, title, lead, leadImage, startDate, targetDate, progress } = props;

  return (
    <div className="group flex flex-col rounded-lg border border-border-secondary bg-secondary px-6 pb-7 pt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{title}</h3>
        <BoardMenu className="opacity-0 hover:bg-background/20 group-hover:opacity-100 data-[state=open]:opacity-100" />
      </div>
      <div className="mt-5 flex flex-col gap-4 text-sm text-foreground/85">
        <div className="flex items-center gap-2">
          <Image src={leadImage} width={20} height={20} alt={lead} />
          {lead}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-5" />
          {formatDateRange(startDate, targetDate)}
        </div>
        <div className="flex items-center gap-2">
          <CircularProgress
            classNames={{
              svg: "h-5 w-5",
              indicator: "stroke-primary",
              track: "stroke-primary/20",
              value: "text-3xl font-semibold text-white",
            }}
            aria-label="Loading..."
            value={progress}
          />
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
