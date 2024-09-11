import React from 'react';

export default function SearchSkeleton() {
  return (
    <div className="flex w-full items-center gap-x-2 py-[8px]">
      <div className="w-10 h-10 bg-gray-100 rounded-full" />
      <div className="flex flex-col gap-y-2 flex-grow">
        <div className="w-full h-[16px] rounded-md bg-gray-100" />
        <div className="w-3/4 h-[16px] rounded-md bg-gray-100" />
      </div>
    </div>
  );
}
