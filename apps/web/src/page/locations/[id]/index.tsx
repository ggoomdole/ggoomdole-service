import { DragCarousel, DragCarouselItem } from "@/components/common/carousel/drag-carousel";
import Header from "@/components/common/header";
import StarRating from "@/components/common/star-rating";
import CourseTab from "@/components/locations/course-tab";
import HomeTab from "@/components/locations/home-tab";
import ReviewTab from "@/components/locations/review-tab";
import QueryTabNav from "@/components/query-tab-nav";

interface LocationsPageProps {
  id: string;
  tab: string;
}

const NAVS = [
  {
    name: "홈",
    path: "",
  },
  {
    name: "후기",
    path: "review",
  },
  {
    name: "주변 관광지",
    path: "course",
  },
];

const renderTab = (tab: string) => {
  switch (tab) {
    case "review":
      return <ReviewTab />;
    case "course":
      return <CourseTab />;
    default:
      return <HomeTab />;
  }
};

export default function LocationsPage({ id, tab }: LocationsPageProps) {
  return (
    <>
      <Header sticky>
        <div className="flex items-center gap-2.5">
          <div className="aspect-square size-10 shrink-0 rounded-sm bg-gray-300" />
          <div className="space-y-1 text-start">
            <h1 className="typo-semibold line-clamp-1">카스의 빵지순례</h1>
            <p className="typo-regular line-clamp-1">빵을 좋아하는 사람이라면 누구나!</p>
          </div>
        </div>
      </Header>
      <main className="pb-navigation">
        <section className="bg-main-100 space-y-5 p-5">
          <div className="flex items-center justify-between gap-2.5">
            <div className="space-y-1">
              <h1 className="typo-semibold line-clamp-1 text-gray-700">성심당 대전역</h1>
              <StarRating rating={4.3} participants={474} />
              <p className="typo-regular line-clamp-1 text-gray-500">
                대전광역시 동구 중앙로 215 대전역사 2F
              </p>
            </div>
            <button className="bg-main-300 typo-regular text-nowrap rounded-xl px-5 py-1 text-gray-500">
              지도
            </button>
          </div>
          <DragCarousel>
            <DragCarouselItem>
              <div className="aspect-thumbnail w-32 shrink-0 rounded-sm bg-gray-300" />
            </DragCarouselItem>
          </DragCarousel>
        </section>
        <section>
          <QueryTabNav navKey="tab" navs={NAVS} />
          {renderTab(tab)}
        </section>
      </main>
    </>
  );
}
