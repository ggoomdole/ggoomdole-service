import { Usable, use } from "react";

import CourseCard from "@/components/common/card/course-card";
import SortDrawer from "@/components/common/drawer/sort-drawer";
import QueryTabNav from "@/components/query-tab-nav";
import { COURSE_CATEGORIES } from "@/constants/category";
import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";

interface ParticipationsPageProps {
  promisedReponse: Usable<BaseResponseDTO<RoadResponseDTO[]>>;
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

const SORT_OPTIONS = COURSE_CATEGORIES.map((category) => ({
  name: category.name,
  value: category.path,
}));

export default function ParticipationsPage({ promisedReponse }: ParticipationsPageProps) {
  const { data } = use(promisedReponse);
  console.log(data);

  return (
    <main>
      <QueryTabNav navKey="tab" navs={NAVS} />
      <SortDrawer options={SORT_OPTIONS} className="typo-regular mr-5 w-max self-end" />
      <section className="px-5">
        {data.length > 0 ? (
          data.map((course) => (
            <CourseCard
              key={`course-item-${course.roadId}`}
              {...course}
              href={`/courses/upload?id=${course.roadId}`}
            />
          ))
        ) : (
          <p className="typo-medium py-10 text-center">등록된 순례길이 없어요.</p>
        )}
      </section>
    </main>
  );
}
