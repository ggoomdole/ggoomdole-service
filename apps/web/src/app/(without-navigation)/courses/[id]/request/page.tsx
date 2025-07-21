import CourseRequestPage from "@/page/courses/[id]/request";

interface CourseRequestPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: string;
    query: string;
  }>;
}

export default async function CourseRequest({ params, searchParams }: CourseRequestPageProps) {
  const { id } = await params;
  const { tab, query } = await searchParams;

  return <CourseRequestPage id={id} tab={tab} query={query} />;
}
