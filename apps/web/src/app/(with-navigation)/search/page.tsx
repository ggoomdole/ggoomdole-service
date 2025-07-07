import SearchHeader from "@/components/common/header/search-header";
import SearchPage from "@/page/search";
import SearchResultPage from "@/page/search/search-result";

interface SearchProps {
  searchParams: Promise<{
    query: string;
    category: string;
    sortOption: string;
  }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <SearchHeader {...resolvedSearchParams} />
      {resolvedSearchParams.query ? <SearchResultPage {...resolvedSearchParams} /> : <SearchPage />}
    </>
  );
}
