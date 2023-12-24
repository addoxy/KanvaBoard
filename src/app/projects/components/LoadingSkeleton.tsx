const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 animate-pulse">
      <Rectangle />
      <Rectangle />
      <Rectangle />
      <Rectangle />
    </div>
  );
};

const Rectangle = () => {
  return <div className="w-full h-22 bg-zinc-800/30 rounded-lg"></div>;
};

export default LoadingSkeleton;
