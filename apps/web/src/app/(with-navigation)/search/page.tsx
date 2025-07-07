import SearchHeader from "@/components/common/header/search-header";
import SearchPage from "@/page/search";

interface SearchProps {
  searchParams: Promise<{
    query: string;
    category: string;
  }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <SearchHeader {...resolvedSearchParams} />
      <SearchPage />
    </>
  );
}
