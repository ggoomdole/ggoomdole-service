import SearchHeader from "@/components/common/header/search-header";
import SearchPage from "@/page/search";

interface SearchProps {
  searchParams: Promise<{
    query: string;
  }>;
}

export default async function Search({ searchParams }: SearchProps) {
  const { query } = await searchParams;

  return (
    <>
      <SearchHeader query={query || ""} />
      <SearchPage />
    </>
  );
}
