import UploadCoursePage from "@/page/courses/upload";

interface UploadCourseProps {
  searchParams: Promise<{
    tab: string;
    word: string;
    id: string;
    view: "private";
  }>;
}

export default async function UploadCourse({ searchParams }: UploadCourseProps) {
  const resolvedSearchParams = await searchParams;

  return <UploadCoursePage {...resolvedSearchParams} />;
}
