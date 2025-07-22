import Header from "@/components/common/header";
import CreateCoursePage from "@/page/courses/create";

interface CreateCourseProps {
  searchParams: Promise<{
    tab: string;
    query: string;
  }>;
}

export default async function CreateCourse({ searchParams }: CreateCourseProps) {
  const { tab, query } = await searchParams;

  return (
    <>
      <Header>순례길 생성하기</Header>
      <CreateCoursePage tab={tab} query={query} />
    </>
  );
}
