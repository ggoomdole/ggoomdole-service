import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchHeader from "@/components/common/header/search-header";
import Map from "@/components/common/map";
import { DEFAULT_MAP_CENTER } from "@/constants/map";
import { CoursePlaceProps } from "@/types/course";
import { TMap, TMapMarkerClickEvent, TMapPoi } from "@/types/tmap";
import { getParams } from "@/utils/params";
import { infoToast } from "@/utils/toast";

interface LocationProps {
  title: string;
  address: string;
  id: string;
  latitude: number;
  longitude: number;
}

interface FindByMapTabProps {
  query: string;
  tab: string;
  currentPlaces: CoursePlaceProps[];
  id?: string;
  view?: "private" | "replicate";
  onSelectPlace: (place: CoursePlaceProps) => void;
}

const { lat, lng } = DEFAULT_MAP_CENTER;

const TMAP_API_KEY = process.env.NEXT_PUBLIC_TMAP_API_KEY;
const DEFAULT_THUMBNAIL = "/static/default-thumbnail.png";

export default function FindByMapTab({
  query,
  tab,
  currentPlaces,
  id,
  view,
  onSelectPlace,
}: FindByMapTabProps) {
  // 07/21 장소 검색 및 상세 조회에서 썸네일이 없기 때문에 우선 기본 썸네일 + 별점 X 버전으로 진행
  const [selectedMarker, setSelectedMarker] = useState<LocationProps | null>(null);
  const [searchResult, setSearchResult] = useState<TMapPoi[]>([]);

  const mapInstanceRef = useRef<TMap | null>(null);

  const router = useRouter();

  const onClickMap = () => {
    setSelectedMarker(null);
  };

  const onClickMarker = (e: TMapMarkerClickEvent) => {
    const selectedPoi = searchResult.find((poi) => poi.id === e._marker_data.options.title);
    setSelectedMarker({
      title: selectedPoi?.name || "",
      address: selectedPoi?.newAddressList.newAddress[0].fullAddressRoad || "",
      id: selectedPoi?.id || "",
      latitude: Number(selectedPoi?.newAddressList.newAddress[0].frontLat) || 0,
      longitude: Number(selectedPoi?.newAddressList.newAddress[0].frontLon) || 0,
    });
  };

  const onAddNewPlace = () => {
    if (!selectedMarker) return;

    const isDuplicate = currentPlaces.some((place) => place.placeName === selectedMarker.title);

    if (isDuplicate) {
      return infoToast("이미 추가된 장소에요.");
    }

    onSelectPlace({
      placeName: selectedMarker.title,
      placeId: selectedMarker.id,
      reason: "",
      address: selectedMarker.address,
      latitude: selectedMarker.latitude,
      longitude: selectedMarker.longitude,
    });
    setSelectedMarker(null);

    const params = getParams({ id, view });
    router.replace(`?${params}`);
  };

  useEffect(() => {
    if (!query) return;

    const fetchSearchResult = async () => {
      const bounds = mapInstanceRef.current?.getBounds();
      const centerLon = ((bounds?._ne?._lng || lng) + (bounds?._sw?._lng || lng)) / 2;
      const centerLat = ((bounds?._ne?._lat || lat) + (bounds?._sw?._lat || lat)) / 2;

      const params = getParams({
        searchKeyword: query,
        appKey: TMAP_API_KEY,
        version: 1,
        centerLon,
        centerLat,
      });
      const res = await fetch(`https://apis.openapi.sk.com/tmap/pois?${params}`);
      const data = await res.json();
      setSearchResult(data.searchPoiInfo.pois.poi);
    };

    fetchSearchResult();
  }, [query]);

  return (
    <>
      <SearchHeader id={id} word={query} tab={tab} view={view} />
      <main className="relative">
        <Map
          mapInstanceRef={mapInstanceRef}
          markers={searchResult}
          onClickMap={onClickMap}
          onClickMarker={onClickMarker}
        />
        {selectedMarker && (
          <section className="max-w-floating-button absolute bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 gap-5 rounded-2xl bg-white p-5 shadow-2xl">
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
              <button
                className="bg-main-300 typo-regular w-max rounded-xl px-5 py-1 text-gray-500"
                onClick={onAddNewPlace}
                aria-label="요청목록에 추가"
              >
                요청목록에 추가
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
