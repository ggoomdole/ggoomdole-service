import SearchHeader from "@/components/common/header/search-header";
import { BaseResponseDTO } from "@/models";
import { RoadRecommendResponseDTO } from "@/models/road";
import SearchPage from "@/page/search";
import SearchResultPage from "@/page/search/search-result";
import { serverApi } from "@/services/api";

interface SearchProps {
  searchParams: Promise<{
    query: string;
    category: string;
    sort: string;
  }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const resolvedSearchParams = await searchParams;
  const promisedResponse =
    serverApi.get<BaseResponseDTO<RoadRecommendResponseDTO[]>>("road/recommend");

  return (
    <>
      <SearchHeader {...resolvedSearchParams} />
      {resolvedSearchParams.query ? (
        <SearchResultPage {...resolvedSearchParams} />
      ) : (
        <SearchPage promisedResponse={promisedResponse} />
      )}
    </>
  );
}
