import Header from "@/components/common/header";
import MyCoursesPage from "@/page/mypage/courses";

interface MyCoursesProps {
  searchParams: Promise<{
    category: string;
  }>;
}

export default async function MyCourses({ searchParams }: MyCoursesProps) {
  const { category } = await searchParams;

  return (
    <>
      <Header>나만의 순례길</Header>
      <MyCoursesPage category={category} />
    </>
  );
}
