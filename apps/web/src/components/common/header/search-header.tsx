"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SearchIcon from "@/assets/search.svg";
import Header from "@/components/common/header";
import { recentSearchUtils } from "@/utils/local-storage";
import { getParams } from "@/utils/params";

interface SearchHeaderProps {
  word: string;
  [key: string]: string | undefined;
}

export default function SearchHeader(props: SearchHeaderProps) {
  const { word, ...restProps } = props;
  const [searchQuery, setSearchQuery] = useState(word || "");

  const router = useRouter();

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    recentSearchUtils.addRecentSearch(searchQuery);
    const params = getParams(restProps, { word: searchQuery });
    router.push(`?${params}`);
  };

  useEffect(() => {
    setSearchQuery(word || "");
  }, [word]);

  return (
    <Header
      rightElement={
        <button onClick={onSubmit}>
          <SearchIcon />
        </button>
      }
      sticky
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
