"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

const Pagination = ({
  currentPage,
    hasPrev, 
    hasNext 
}: {
  currentPage:number;
  hasPrev:boolean; 
hasNext:boolean;
}) => {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Define hasPrev and hasNext
 

  const createPageUrl = (pageNumber: number) => {
    // Clone the current search params
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    // Navigate to the new URL with updated search params
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <button
        className="rounded-md bg-cottex text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev} // Now hasPrev is defined
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-cottex text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext} // Now hasNext is defined
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
