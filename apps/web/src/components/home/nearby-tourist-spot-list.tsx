"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LOCATION } from "@/constants/location";
import { useGetNearbyTouristSpots } from "@/lib/tanstack/query/spot";
import { NearbyTouristSpotResponseDTO } from "@/models/spot";
import type { TMapPoi } from "@/types/tmap";
import { infoToast } from "@/utils/toast";

import NearbyTouristSpotItem from "./nearby-tourist-spot-item";

const TMAP_API_KEY = process.env.NEXT_PUBLIC_TMAP_API_KEY;

export default function NearbyTouristSpotList() {
  const { data } = useGetNearbyTouristSpots();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onRouteToLocation = async (tourist: NearbyTouristSpotResponseDTO) => {
    setIsLoading(true);
    try {
      const area = tourist.address.split(" ")[0];
      const encodedTitle = encodeURIComponent(area + " " + tourist.title);

      const res = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?searchKeyword=${encodedTitle}&version=1&appKey=${TMAP_API_KEY}&count=150`,
        { next: { tags: [LOCATION.SEARCH, encodedTitle] } }
      );

      if (res.status === 204) {
        return infoToast("관광지 정보가 없어요.");
      }

      const data = await res.json();
      const location = data.searchPoiInfo.pois.poi.find(
        (poi: TMapPoi) => poi.name === tourist.title
      );

      const locationId = location ? location.id : data.searchPoiInfo.pois.poi[0].id;

      router.push(`/locations/${locationId}`);
    } catch (error) {
      console.error("관광지 정보 조회 중 오류가 발생했어요.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return data && data.data.length > 0 ? (
    <div className="flex gap-5 overflow-x-auto px-2 py-5">
      {data.data.map((tourist) => (
        <NearbyTouristSpotItem
          key={`tourist-spot-item-${tourist.title}`}
          onRouteToLocation={() => onRouteToLocation(tourist)}
          {...tourist}
          disabled={isLoading}
        />
      ))}
    </div>
  ) : (
    <p className="typo-medium py-10 text-center">주변 관광지 추천이 없어요.</p>
  );
}
