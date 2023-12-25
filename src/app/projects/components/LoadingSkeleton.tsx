const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Rectangle />
      <Rectangle />
      <Rectangle />
      <Rectangle />
    </div>
  );
};

const Rectangle = () => {
  return (
    <div className="w-full h-22 bg-zinc-800/30 rounded-lg animate-pulse"></div>
  );
};

export default LoadingSkeleton;
