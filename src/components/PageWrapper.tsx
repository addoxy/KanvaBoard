import Sidebar from "./Sidebar/Sidebar";

const PageWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="px-12 py-8 w-full h-screen">{children}</div>
    </div>
  );
};

export default PageWrapper;
