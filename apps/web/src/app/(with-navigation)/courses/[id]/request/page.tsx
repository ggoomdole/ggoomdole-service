import CourseRequestPage from "@/page/courses/[id]/request";

interface CourseRequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseRequest({ params }: CourseRequestPageProps) {
  const { id } = await params;

  return <CourseRequestPage id={id} />;
}
