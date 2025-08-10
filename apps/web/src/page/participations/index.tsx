import CourseCard from "@/components/common/card/course-card";
import SortDrawer from "@/components/common/drawer/sort-drawer";
import QueryTabNav from "@/components/query-tab-nav";

interface ParticipationsPageProps {
  tab: string;
  sort: string;
}

const NAVS = [
  {
    name: "참여",
    path: "",
  },
  {
    name: "제작",
    path: "created",
  },
];

const SORT_OPTIONS = [
  {
    name: "전체",
    value: "",
  },
  {
    name: "음식",
    value: "food",
  },
  {
    name: "관광",
    value: "tour",
  },
  {
    name: "힐링",
    value: "healing",
  },
];

export default function ParticipationsPage({ tab, sort }: ParticipationsPageProps) {
  // sort 이용해서 무한 스크롤 구현하기

  return (
    <main>
      <QueryTabNav navKey="tab" navs={NAVS} />
      <SortDrawer options={SORT_OPTIONS} className="typo-regular mr-5 w-max self-end" />
      <section className="px-5">
        {/* {dummyCourses.map((course) => (
          <CourseCard
            key={`course-item-${course.category}-${course.id}`}
            {...course}
            href={`/courses/upload?id=${course.id}`}
          />
        ))} */}
        <p className="typo-medium py-10 text-center">등록된 순례길이 없어요.</p>
      </section>
    </main>
  );
}
