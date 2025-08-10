"use client";

import { Usable, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Close from "@/assets/close.svg";
import CourseCard from "@/components/common/card/course-card";
import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import { recentSearchUtils } from "@/utils/local-storage";

interface SearchPageProps {
  promisedResponse: Usable<BaseResponseDTO<RoadResponseDTO[]>>;
}

export default function SearchPage({ promisedResponse }: SearchPageProps) {
  const response = use(promisedResponse);

  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const router = useRouter();

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    setRecentSearch(recentSearchUtils.getRecentSearches());
  }, []);

  // 검색어 추가
  const onAddSearchKeyword = (keyword: string) => {
    const updated = recentSearchUtils.addRecentSearch(keyword);
    setRecentSearch(updated);
  };

  // 개별 검색어 삭제
  const onRemoveSearchKeyword = (e: React.MouseEvent<HTMLButtonElement>, keyword: string) => {
    e.stopPropagation();
    const updated = recentSearchUtils.removeRecentSearch(keyword);
    setRecentSearch(updated);
  };

  // 전체 검색어 삭제
  const onClearAllSearchKeywords = () => {
    const updated = recentSearchUtils.clearAllRecentSearches();
    setRecentSearch(updated);
  };

  // 최근 검색어 클릭 시 검색 실행
  const onSearchKeywordClick = (keyword: string) => {
    onAddSearchKeyword(keyword);
    router.push(`/search?word=${encodeURIComponent(keyword)}`);
  };

  return (
    <main className="pb-navigation space-y-5 px-5 py-2.5">
      <section className="space-y-2.5">
        <div className="flex items-center gap-2.5">
          <h2 className="typo-semibold">최근 검색어</h2>
          {recentSearch.length > 0 && (
            <button
              onClick={onClearAllSearchKeywords}
              className="typo-regular text-gray-300 underline"
            >
              전체 삭제
            </button>
          )}
        </div>
        <div className="flex flex-col items-start gap-1">
          {recentSearch.length > 0 ? (
            recentSearch.map((search) => (
              <div
                key={search}
                className="typo-regular flex items-center gap-1 rounded-sm border border-gray-300 px-2.5 py-1"
              >
                <button onClick={() => onSearchKeywordClick(search)}>{search}</button>
                <button onClick={(e) => onRemoveSearchKeyword(e, search)}>
                  <Close className="size-3" />
                </button>
              </div>
            ))
          ) : (
            <p className="typo-regular text-gray-400">최근 검색어가 없어요.</p>
          )}
        </div>
      </section>
      <section className="space-y-2.5">
        <h2 className="typo-semibold">추천 순례길</h2>
        {response.data.length > 0 ? (
          response.data.map((course) => (
            <CourseCard
              key={`course-item-${course.categoryId}-${course.roadId}`}
              href={`/courses/${course.roadId}`}
              {...course}
            />
          ))
        ) : (
          <p className="typo-medium py-10 text-center">추천 순례길이 없어요.</p>
        )}
      </section>
    </main>
  );
}
