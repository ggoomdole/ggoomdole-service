import CourseDetailPage from "@/page/courses/[id]";

interface CourseDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetail({ params }: CourseDetailProps) {
  const { id } = await params;

  return <CourseDetailPage id={id} />;
}
