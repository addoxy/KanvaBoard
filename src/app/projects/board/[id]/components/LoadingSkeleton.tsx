const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="w-160 bg-zinc-800/30 rounded-lg animate-pulse h-12 mb-16"></div>
      <div className="flex gap-x-6">
        <ColumnSkeleton />
        <ColumnSkeleton />
        <ColumnSkeleton />
      </div>
    </div>
  );
};

const ColumnSkeleton = () => {
  return (
    <div className="w-80 bg-zinc-800/30 rounded-lg animate-pulse h-100"></div>
  );
};

export default LoadingSkeleton;
