import Link from "next/link";

import Search from "@/assets/search.svg";
import Header from "@/components/common/header";
import CoursesPage from "@/page/courses";

interface CoursesPageProps {
  searchParams: Promise<{
    category: string;
    sort: string;
  }>;
}

export default async function Courses({ searchParams }: CoursesPageProps) {
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
        sticky
      />
      <CoursesPage {...resolvedSearchParams} />
    </>
  );
}
