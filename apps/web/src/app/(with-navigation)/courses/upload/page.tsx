import UploadCoursePage from "@/page/courses/upload";

interface UploadCourseProps {
  searchParams: Promise<{
    tab: string;
    query: string;
    id: string;
  }>;
}

export default async function UploadCourse({ searchParams }: UploadCourseProps) {
  const resolvedSearchParams = await searchParams;

  return <UploadCoursePage {...resolvedSearchParams} />;
}
