"use client";

import { Usable, use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Close from "@/assets/close.svg";
import Direction from "@/assets/direction.svg";
import List from "@/assets/list.svg";
import Switch from "@/assets/switch.svg";
import DraggableDrawer from "@/components/common/drawer/draggable-drawer";
import Header from "@/components/common/header";
import TransitRouteMap from "@/components/common/map/transit-route-map";
import FloatingActionButton from "@/components/courses/floating-action-button";
import RouteItem from "@/components/courses/route-item";
import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import type { TMap, TMapMarkerClickEvent, TMapPoi, TMapTransitResponse } from "@/types/tmap";
import { getParams } from "@/utils/params";
import { formatDistance, formatTime } from "@/utils/time";
import { searchTransitRoute } from "@/utils/tmap";
import { errorToast, infoToast } from "@/utils/toast";

interface LocationProps {
  title: string;
  address: string;
  lat: string;
  lng: string;
}

interface CourseDetailPageProps {
  id: string;
  start: string;
  end: string;
  promisedResponse: Usable<BaseResponseDTO<RoadResponseDTO>>;
}

const DEFAULT_THUMBNAIL = "/static/default-thumbnail.png";
const LOADING_IMAGE = "/static/loading.png";

const dummyCourses = [
  {
    id: "6780537",
    name: "성심당 롯데백화점대전점",
    newAddressList: {
      newAddress: [
        {
          fullAddressRoad: "대전광역시 중구 중앙로 100",
          frontLat: "36.33999186",
          frontLon: "127.39004564",
        },
      ],
    },
  },
  {
    id: "2930518",
    name: "성심당 대전역점",
    newAddressList: {
      newAddress: [
        {
          fullAddressRoad: "대전 동구 중앙로 215",
          frontLat: "36.33071591",
          frontLon: "127.43312537",
        },
      ],
    },
  },
];

const checkSameMarker = ({ start, end }: { start: string; end: string }): boolean => {
  const [startLat, startLng] = start?.split(",") || [];
  const [endLat, endLng] = end?.split(",") || [];

  const isSameLocation = startLat === endLat && startLng === endLng;

  return isSameLocation;
};

const SummarySection = ({
  isShowDetailPath,
  children,
}: {
  isShowDetailPath: boolean;
  children: React.ReactNode;
}) => {
  if (isShowDetailPath) {
    return <DraggableDrawer minHeight={250}>{children}</DraggableDrawer>;
  }
  return (
    <section className="absolute bottom-5 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-2xl">
      {children}
    </section>
  );
};

export default function CourseDetailPage({
  id,
  start,
  end,
  promisedResponse,
}: CourseDetailPageProps) {
  const { data } = use(promisedResponse);

  const mapInstanceRef = useRef<TMap | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<LocationProps | null>(null);
  const [transitData, setTransitData] = useState<TMapTransitResponse | null>(null);
  const [isShowDetailPath, setIsShowDetailPath] = useState(false);
  const [isLoadingGetTransitData, setIsLoadingGetTransitData] = useState(false);

  const isSearchMode = Boolean(start || end);
  const isShowPathMode = Boolean(start && end);

  const [startLat, startLng, startName] = start?.split(",") || [];
  const [endLat, endLng, endName] = end?.split(",") || [];

  const router = useRouter();

  const markers = data.spots.map((spot) => ({
    detailBizName: spot.name,
    id: spot.spotId,
    name: spot.name,
    newAddressList: {
      newAddress: [
        {
          fullAddressRoad: spot.name,
          frontLat: spot.latitude.toString(),
          frontLon: spot.longitude.toString(),
        },
      ],
    },
  }));

  // 출/도착 선택했을 때 선택된 마커 모양 없애는 로직 추가하기
  const onClickMap = () => {
    setSelectedMarker(null);
  };

  const onClickMarker = (e: TMapMarkerClickEvent) => {
    const selectedPoi = markers.find((poi) => poi.id === e._marker_data.options.title);
    setSelectedMarker({
      title: selectedPoi?.name || "",
      address: selectedPoi?.newAddressList.newAddress[0].fullAddressRoad || "",
      lat: selectedPoi?.newAddressList.newAddress[0].frontLat || "",
      lng: selectedPoi?.newAddressList.newAddress[0].frontLon || "",
    });
  };

  const onClickStart = () => {
    const isSameMarker = checkSameMarker({
      start: `${selectedMarker?.lat},${selectedMarker?.lng}`,
      end: `${endLat},${endLng}`,
    });
    if (isSameMarker) return infoToast("출/도착지가 같을 수 없어요.");

    const parmas = getParams({
      start: `${selectedMarker?.lat},${selectedMarker?.lng},${selectedMarker?.title || ""}`,
      end,
    });
    setSelectedMarker(null);
    router.push(`?${parmas}`);
  };

  const onClickEnd = () => {
    const isSameMarker = checkSameMarker({
      start: `${startLat},${startLng}`,
      end: `${selectedMarker?.lat},${selectedMarker?.lng}`,
    });
    if (isSameMarker) return infoToast("출/도착지가 같을 수 없어요.");

    const parmas = getParams({
      start,
      end: `${selectedMarker?.lat},${selectedMarker?.lng},${selectedMarker?.title || ""}`,
    });
    setSelectedMarker(null);
    router.push(`?${parmas}`);
  };

  const onToggleDestination = () => {
    const [newStart, newEnd] = [end, start];
    const params = getParams({ start: newStart, end: newEnd });
    router.push(`?${params}`);
  };

  const onClearDestination = (type?: "start" | "end") => {
    if (type === "start" && start) {
      const params = getParams({ end });
      return router.push(`?${params}`);
    }

    if (type === "end" && end) {
      const params = getParams({ start });
      return router.push(`?${params}`);
    }

    router.push("?");
  };

  useEffect(() => {
    if (!isShowPathMode) {
      setTransitData(null);
      return;
    }

    const getTransitInfo = async () => {
      try {
        setIsLoadingGetTransitData(true);
        const data = await searchTransitRoute({
          startX: startLng,
          startY: startLat,
          endX: endLng,
          endY: endLat,
        });
        setTransitData(data);
      } catch (error) {
        errorToast("대중교통 경로 검색에 실패했어요.");
        console.error("대중교통 경로 검색 실패:", error);
      } finally {
        setIsLoadingGetTransitData(false);
      }
    };
    getTransitInfo();
  }, [start, end]);

  return (
    <>
      <Header
        rightElement={
          isSearchMode ? null : (
            <Link href={`/courses/${id}/list`}>
              <List />
            </Link>
          )
        }
        sticky
      >
        {isSearchMode ? (
          "길찾기"
        ) : (
          <div className="flex items-center gap-2.5">
            <Image
              src={data.imageUrl || DEFAULT_THUMBNAIL}
              alt={data.title}
              width={40}
              height={40}
              className="aspect-square shrink-0 rounded-sm"
            />
            <div className="space-y-1 text-start">
              <h1 className="typo-semibold line-clamp-1">{data.title}</h1>
              <p className="typo-regular line-clamp-1">{data.intro}</p>
            </div>
          </div>
        )}
      </Header>
      <main className="relative">
        <TransitRouteMap
          mapInstanceRef={mapInstanceRef}
          transitData={transitData}
          markers={markers}
          isShowPathMode={isShowPathMode}
          onClickMap={onClickMap}
          onClickMarker={onClickMarker}
        />

        {isSearchMode && (
          <section className="bg-main-300 absolute w-full space-y-2.5 p-5">
            <div className="flex items-center justify-between gap-2.5">
              <p className="typo-semibold line-clamp-1">{data.title}</p>
              <button onClick={() => onClearDestination()}>
                <Close className="shrink-0" />
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex-1 divide-y-2 divide-gray-100">
                <div className="bg-main-100 flex items-center justify-between px-4 py-2.5">
                  <input
                    defaultValue={startName}
                    className="typo-medium line-clamp-1 w-full"
                    placeholder="출발지를 입력해주세요"
                    readOnly
                  />
                  <button onClick={() => onClearDestination("start")}>
                    <Close className="shrink-0" />
                  </button>
                </div>
                <div className="bg-main-100 flex items-center justify-between px-4 py-2.5">
                  <input
                    defaultValue={endName}
                    className="typo-medium line-clamp-1 w-full"
                    placeholder="도착지를 입력해주세요"
                    readOnly
                  />
                  <button onClick={() => onClearDestination("end")}>
                    <Close className="shrink-0" />
                  </button>
                </div>
              </div>
              <button onClick={onToggleDestination} className="shrink-0">
                <Switch />
              </button>
            </div>
          </section>
        )}
        {transitData && isShowPathMode && !isLoadingGetTransitData && (
          <SummarySection isShowDetailPath={isShowDetailPath}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="typo-regular text-gray-500">총 소요 시간 및 거리</p>
                <div className="flex items-end gap-2.5 text-gray-700">
                  <p className="typo-semibold">
                    {formatTime(transitData.metaData.plan.itineraries[0].totalTime)}
                  </p>
                  <p className="typo-regular">
                    {formatDistance(transitData.metaData.plan.itineraries[0].totalDistance)}
                  </p>
                </div>
              </div>
              <button
                className="flex flex-col items-center gap-1"
                onClick={() => setIsShowDetailPath(!isShowDetailPath)}
              >
                <div className="bg-main-100 text-main-900 border-main-700 flex size-9 items-center justify-center rounded-full border">
                  <Direction />
                </div>
                <p className="typo-regular text-gray-700">
                  {isShowDetailPath ? "요약" : "상세"}보기
                </p>
              </button>
            </div>
            {isShowDetailPath && (
              <div className="mt-5">
                {transitData &&
                  transitData.metaData.plan.itineraries[0].legs.map((leg, index) => (
                    <RouteItem
                      key={`${leg.start.name}-${leg.end.name}`}
                      leg={leg}
                      isFirst={index === 0}
                      isLast={index === transitData.metaData.plan.itineraries[0].legs.length - 1}
                      startName={startName}
                      endName={endName}
                    />
                  ))}
              </div>
            )}
          </SummarySection>
        )}
        {isLoadingGetTransitData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
            <Image src={LOADING_IMAGE} alt="loading" width={250} height={250} />
            <p className="typo-semibold text-main-900 animate-pulse">대중교통 경로 검색 중...</p>
          </div>
        )}
        {selectedMarker ? (
          <section className="absolute bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 gap-5 rounded-2xl bg-white p-5 shadow-2xl">
            <Image
              src={DEFAULT_THUMBNAIL}
              alt={`${selectedMarker.title}-thumbnail`}
              width={100}
              height={125}
              className="aspect-thumbnail rounded-2xl object-cover"
            />
            <div className="flex flex-col justify-center gap-1">
              <h2 className="typo-semibold line-clamp-1">{selectedMarker.title}</h2>
              <p className="typo-regular line-clamp-1 text-gray-500">{selectedMarker.address}</p>
              <div className="typo-regular flex gap-2.5 text-gray-500">
                <button className="bg-main-100 rounded-xl px-5 py-1" onClick={onClickStart}>
                  출발
                </button>
                <button className="bg-main-300 rounded-xl px-5 py-1" onClick={onClickEnd}>
                  도착
                </button>
              </div>
            </div>
          </section>
        ) : isSearchMode ? null : (
          <FloatingActionButton id={id} />
        )}
      </main>
    </>
  );
}
