import CreateCoursePage from "@/page/courses/create";

interface CreateCourseProps {
  searchParams: Promise<{
    tab: string;
    query: string;
  }>;
}

export default async function CreateCourse({ searchParams }: CreateCourseProps) {
  const { tab, query } = await searchParams;

  return <CreateCoursePage tab={tab} query={query} />;
}
