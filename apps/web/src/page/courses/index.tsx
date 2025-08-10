"use client";

import CourseCard from "@/components/common/card/course-card";
import SortDrawer from "@/components/common/drawer/sort-drawer";
import QueryTabNav from "@/components/query-tab-nav";
import { COURSE_CATEGORIES } from "@/constants/category";

interface CoursesPageProps {
  category: string;
  sort: string;
}

const SORT_OPTIONS = [
  {
    name: "인기순",
    value: "",
  },
  {
    name: "최신순",
    value: "recent",
  },
  {
    name: "참여순",
    value: "participants",
  },
  {
    name: "조회순",
    value: "views",
  },
];

export default function CoursesPage({ category, sort }: CoursesPageProps) {
  // category, sort 이용해서 무한 스크롤 구현하기

  return (
    <main className="pb-navigation">
      <QueryTabNav navKey="category" navs={COURSE_CATEGORIES} />
      <SortDrawer options={SORT_OPTIONS} className="typo-regular mr-5 w-max self-end" />
      <section className="px-5">
        {/* {dummyCourses.map((course) => (
          <CourseCard
            key={`course-item-${course.category}-${course.id}`}
            href={`/courses/${course.id}`}
            {...course}
          />
        ))} */}
        <p className="typo-medium py-10 text-center">등록된 순례길이 없어요.</p>
      </section>
    </main>
  );
}
