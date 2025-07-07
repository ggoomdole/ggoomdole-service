"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SearchIcon from "@/assets/search.svg";
import Header from "@/components/common/header";
import { recentSearchUtils } from "@/utils/localStorage";
import { getParams } from "@/utils/params";

interface SearchHeaderProps {
  query: string;
  category: string;
}

export default function SearchHeader({ query, category }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(query);

  const router = useRouter();

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    recentSearchUtils.addRecentSearch(searchQuery);
    const params = getParams({ query: searchQuery, category });
    router.push(`?${params}`);
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
          onChange={onSearchQueryChange}
          className="w-full"
          placeholder="검색어를 입력해주세요"
        />
      </form>
    </Header>
  );
}
