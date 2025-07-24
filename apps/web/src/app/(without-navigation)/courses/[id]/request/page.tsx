import CourseRequestPage from "@/page/courses/[id]/request";

interface CourseRequestProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: string;
    query: string;
  }>;
}

export default async function CourseRequest({ params, searchParams }: CourseRequestProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  return <CourseRequestPage id={id} {...resolvedSearchParams} />;
}
