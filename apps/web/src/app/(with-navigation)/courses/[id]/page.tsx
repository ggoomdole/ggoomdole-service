import CourseDetailPage from "@/page/courses/[id]";

interface CourseDetailProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    start: string;
    end: string;
  }>;
}

export default async function CourseDetail({ params, searchParams }: CourseDetailProps) {
  const { id } = await params;
  const { start, end } = await searchParams;

  return <CourseDetailPage id={id} start={start} end={end} />;
}
