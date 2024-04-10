import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex-1 overflow-auto py-4 px-4 bg-gray-100">
      <div className="space-x-4 grid grid-cols-4">
        <Skeleton className="w-full h-[20px]" />
        <Skeleton className="w-full h-[20px]" />
        <Skeleton className="w-full h-[20px]" />
        <Skeleton className="w-full h-[20px]" />
      </div>
    </div>
  );
};

export default loading;
