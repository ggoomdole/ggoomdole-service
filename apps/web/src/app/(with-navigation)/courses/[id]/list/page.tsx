import CourseDetailListPage from "@/page/courses/[id]/list";

interface CourseDetailListProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    sort: string;
  }>;
}

export default async function CourseDetailList({ params, searchParams }: CourseDetailListProps) {
  const { id } = await params;
  const { sort } = await searchParams;

  return <CourseDetailListPage id={id} sort={sort} />;
}
