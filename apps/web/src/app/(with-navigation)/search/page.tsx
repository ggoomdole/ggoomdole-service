import SearchHeader from "@/components/common/header/search-header";
import { SEARCH } from "@/constants/search";
import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import SearchPage from "@/page/search";
import SearchResultPage from "@/page/search/search-result";
import { serverApi } from "@/services/api";

interface SearchProps {
  searchParams: Promise<{
    word: string;
    category: string;
    sort: string;
  }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const resolvedSearchParams = await searchParams;
  const roadRecommendResponse = serverApi.get<BaseResponseDTO<RoadResponseDTO[]>>("road/recommend");
  const recentSearchResponse = serverApi.get<BaseResponseDTO<string[]>>("search/recent", {
    next: { tags: [SEARCH.RECENT] },
  });

  return (
    <>
      <SearchHeader {...resolvedSearchParams} page="road" />
      {resolvedSearchParams.word ? (
        <SearchResultPage {...resolvedSearchParams} />
      ) : (
        <SearchPage
          roadRecommendResponse={roadRecommendResponse}
          recentSearchResponse={recentSearchResponse}
        />
      )}
    </>
  );
}
