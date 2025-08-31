import Link from "next/link";

import Header from "@/components/common/header";
import CourseTab from "@/components/locations/course-tab";
import HomeTab from "@/components/locations/home-tab";
import ReviewTab from "@/components/locations/review-tab";
import QueryTabNav from "@/components/query-tab-nav";
import { GetDetailPOIDTO } from "@/models/tmap";

interface LocationsPageProps {
  id: string;
  tab: string;
  data: GetDetailPOIDTO;
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

export default function LocationsPage({ id, tab, data }: LocationsPageProps) {
  const renderTab = (tab: string) => {
    switch (tab) {
      case "review":
        return <ReviewTab id={id} />;
      case "course":
        return <CourseTab lat={+data.poiDetailInfo.lat} lng={+data.poiDetailInfo.lon} />;
      default:
        return <HomeTab data={data} />;
    }
  };

  return (
    <>
      <Header sticky>
        <h1 className="typo-semibold line-clamp-1">장소 상세보기</h1>
      </Header>
      <main className="pb-navigation">
        <section className="bg-main-100 space-y-5 p-5">
          <div className="flex items-center justify-between gap-2.5">
            <div className="space-y-1">
              <h1 className="typo-semibold line-clamp-1 text-gray-700">
                {data.poiDetailInfo.name}
              </h1>
              <p className="typo-regular line-clamp-1 text-gray-500">
                {data.poiDetailInfo.bldAddr}
              </p>
            </div>
            <Link
              className="bg-main-300 typo-regular text-nowrap rounded-xl px-5 py-1 text-gray-500"
              href={`/locations/${id}/map?lat=${data.poiDetailInfo.lat}&lng=${data.poiDetailInfo.lon}`}
            >
              지도
            </Link>
          </div>
          {/* 
          리뷰에 이미지 추가되면 추가
          <DragCarousel>
            <DragCarouselItem>
              <div className="aspect-thumbnail w-32 shrink-0 rounded-sm bg-gray-300" />
            </DragCarouselItem>
          </DragCarousel> */}
        </section>
        <section>
          <QueryTabNav navKey="tab" navs={NAVS} />
          {renderTab(tab)}
        </section>
      </main>
    </>
  );
}
