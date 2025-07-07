"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SearchIcon from "@/assets/search.svg";
import Header from "@/components/common/header";

interface SearchHeaderProps {
  query: string;
}

export default function SearchHeader({ query }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(query);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <Header
      rightElement={
        <button onClick={onSubmit}>
          <SearchIcon />
        </button>
      }
    >
      <form onSubmit={onSubmit} className="typo-medium flex items-center bg-gray-100 px-2.5 py-1">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          placeholder="검색어를 입력해주세요"
        />
      </form>
    </Header>
  );
}
