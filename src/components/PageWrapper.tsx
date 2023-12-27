import Sidebar from "./Sidebar/Sidebar";

const PageWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <div className="w-screen max-w-screen-2xl h-screen mx-auto flex">
      <Sidebar />
      <div className="px-12 py-8 w-full h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
