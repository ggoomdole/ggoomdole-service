import CourseCard from "@/components/common/card/course-card";
import QueryTabNav from "@/components/query-tab-nav";
import { COURSE_CATEGORIES } from "@/constants/category";

interface MyCoursesPageProps {
  category: string;
}

export default function MyCoursesPage({ category }: MyCoursesPageProps) {
  // category 이용해서 무한스크롤

  return (
    <main>
      <QueryTabNav navKey="category" navs={COURSE_CATEGORIES} />
      <section className="px-5">
        {/* {dummyCourses.map((course) => (
          <CourseCard
            key={`course-item-${course.category}-${course.id}`}
            href={`/courses/upload?id=${course.id}&view=private`}
            {...course}
          />
        ))} */}
        <p className="typo-medium py-10 text-center">등록된 순례길이 없어요.</p>
      </section>
    </main>
  );
}
