import { useStore } from "@/lib/store";
import { useSidebarToggle } from "@/lib/toggle";
import { cn } from "@/utils/utils";
import Sidebar from "./Sidebar/Sidebar";

const PageWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const sidebarStore = useStore(
    useSidebarToggle,
    (state) => state
  ) as SidebarToggle;

  return (
    <div className="w-screen max-w-screen-2xl h-screen mx-auto flex bg-zinc-900">
      <div
        className={cn("hidden lg:block", sidebarStore?.toggle && "lg:hidden")}
      >
        <Sidebar setIsOpen={() => {}} />
      </div>
      <div className="sm:px-12 px-4 pt-8 w-full h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
