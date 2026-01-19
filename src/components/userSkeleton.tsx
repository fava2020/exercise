import { Skeleton } from "./ui/skeleton";

const UserSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg w-full max-w-md">
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default UserSkeleton;