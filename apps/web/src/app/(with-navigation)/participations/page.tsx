import Link from "next/link";

import Search from "@/assets/search.svg";
import Header from "@/components/common/header";
import ParticipationsPage from "@/page/participations";

interface ParticipationsProps {
  searchParams: Promise<{
    tab: string;
    sort: string;
  }>;
}

export default async function Participations({ searchParams }: ParticipationsProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Header
        logoHeader
        rightElement={
          <Link href="/search">
            <Search />
          </Link>
        }
      />
      <ParticipationsPage {...resolvedSearchParams} />
    </>
  );
}
