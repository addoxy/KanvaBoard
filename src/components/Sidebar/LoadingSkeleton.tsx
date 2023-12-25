export const ProfileSkeleton = () => {
  return <div className="w-44 animate-pulse h-10 bg-zinc-800 rounded-lg"></div>;
};

export const FavoriteSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-44 animate-pulse h-12 bg-zinc-800 rounded-lg"></div>
      <div className="w-44 animate-pulse h-12 bg-zinc-800 rounded-lg"></div>
    </div>
  );
};
