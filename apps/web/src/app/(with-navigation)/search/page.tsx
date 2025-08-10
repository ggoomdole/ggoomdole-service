import SearchHeader from "@/components/common/header/search-header";
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
  const promisedResponse = serverApi.get<BaseResponseDTO<RoadResponseDTO[]>>("road/recommend");

  return (
    <>
      <SearchHeader {...resolvedSearchParams} />
      {resolvedSearchParams.word ? (
        <SearchResultPage {...resolvedSearchParams} />
      ) : (
        <SearchPage promisedResponse={promisedResponse} />
      )}
    </>
  );
}
