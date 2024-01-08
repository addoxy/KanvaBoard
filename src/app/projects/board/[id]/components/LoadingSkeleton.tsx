const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full md:w-160 bg-zinc-800/30 rounded-lg animate-pulse h-12 mb-16"></div>
      <div className="flex gap-x-6">
        <div className="w-80 bg-zinc-800/30 rounded-lg animate-pulse h-100" />
        <div className="w-80 bg-zinc-800/30 rounded-lg animate-pulse h-100 hidden sm:block" />
        <div className="w-80 bg-zinc-800/30 rounded-lg animate-pulse h-100 hidden xl:block" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
