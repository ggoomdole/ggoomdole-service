"use client";

import { useEffect, useRef } from "react";

import List from "@/assets/list.svg";
import Header from "@/components/common/header";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants/map";

const dummyLatLngs = [
  {
    id: 1,
    lat: 36.355813,
    lng: 127.382245,
  },
  {
    id: 2,
    lat: 36.349548,
    lng: 127.386699,
  },
  {
    id: 3,
    lat: 36.346433,
    lng: 127.380136,
  },
];

const MARKER = "/static/map-pin.png";

export default function CourseDetailPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.Tmapv3.Map(mapRef.current, {
        center: new window.Tmapv3.LatLng(DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng), // 지도 초기 좌표
        zoom: DEFAULT_MAP_ZOOM,
        width: "100%",
        height: "100%",
      });

      dummyLatLngs.forEach((latLng) => {
        const marker = new window.Tmapv3.Marker({
          position: new window.Tmapv3.LatLng(latLng.lat, latLng.lng),
          map,
          icon: MARKER,
          iconSize: new window.Tmapv3.Size(36, 36),
          clickable: true,
          title: latLng.id.toString(),
        });
      });
    }
  }, []);

  return (
    <>
      <Header
        rightElement={
          <button>
            <List />
          </button>
        }
        sticky
      >
        <div className="flex items-center gap-2.5">
          <div className="aspect-square size-10 shrink-0 rounded-sm bg-gray-300" />
          <div className="space-y-1 text-start">
            <h1 className="typo-semibold line-clamp-1">카스의 빵지순례</h1>
            <p className="typo-regular line-clamp-1">빵을 좋아하는 사람이라면 누구나!</p>
          </div>
        </div>
      </Header>
      <main>
        <div ref={mapRef} className="flex-1" />
      </main>
    </>
  );
}
