'use client';
import React, { FormEvent } from 'react'; // Import React for JSX support
import { useRouter } from "next/navigation"; // For Next.js 13+ with App Router
import Image from 'next/image';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" alt="Search Icon" width={17} height={17}   />
      </button>
    </form>
  );
};

export default SearchBar;
