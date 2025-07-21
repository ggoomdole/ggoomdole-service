"use client";

import { useEffect, useRef } from "react";

import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants/map";
import { cn } from "@/lib/utils";
import type { TMap, TMapMarker, TMapMarkerClickEvent, TMapPoi } from "@/types/tmap";

interface MapProps {
  mapInstanceRef: React.RefObject<TMap | null>;
  markers?: TMapPoi[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  onClickMap?: () => void;
  onClickMarker?: (e: TMapMarkerClickEvent) => void;
}

const MARKER = "/static/map-pin.png";
const MARKER_SELECTED = "/static/onboarding/mini-ggoomdole.png";

const onClearMarkers = (markers: TMapMarker[]) => {
  markers.forEach((marker) => marker.setMap(null));
};

const onCreateMarkers = ({
  markers,
  map,
  onClickMarker,
}: {
  markers: TMapPoi[];
  map: TMap;
  onClickMarker: (e: TMapMarkerClickEvent) => void;
}) => {
  const newMarkers: TMapMarker[] = [];

  markers.forEach((marker) => {
    const newMarker: TMapMarker = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(
        +marker.newAddressList.newAddress[0].frontLat,
        +marker.newAddressList.newAddress[0].frontLon
      ),
      map,
      icon: MARKER,
      iconSize: new window.Tmapv3.Size(36, 36),
      title: marker.id.toString(),
      visible: true,
    });

    newMarker.on("Click", (e: TMapMarkerClickEvent) => {
      onUpdateMarkerSelection({
        prevMarkers: markers,
        selectedId: marker.id,
        markers: newMarkers,
        map,
        onClickMarker,
      });
      onClickMarker(e);
    });

    newMarkers.push(newMarker);
  });

  return newMarkers;
};

const onUpdateMarkerSelection = ({
  prevMarkers,
  selectedId,
  markers,
  map,
  onClickMarker,
}: {
  prevMarkers: TMapPoi[];
  selectedId: string;
  markers: TMapMarker[];
  map: TMap;
  onClickMarker: (e: TMapMarkerClickEvent) => void;
}) => {
  markers.forEach((marker, index) => {
    const prevMarker = prevMarkers[index];
    const isSelected = selectedId === prevMarker.id;

    // 마커를 새로 생성하여 아이콘과 크기 변경
    const newMarker: TMapMarker = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(
        +prevMarker.newAddressList.newAddress[0].frontLat,
        +prevMarker.newAddressList.newAddress[0].frontLon
      ),
      map,
      icon: isSelected ? MARKER_SELECTED : MARKER,
      iconSize: new window.Tmapv3.Size(isSelected ? 40 : 36, isSelected ? 50 : 36),
      title: prevMarker.id.toString(),
      visible: true,
    });

    newMarker.on("Click", (e: TMapMarkerClickEvent) => {
      onUpdateMarkerSelection({
        prevMarkers,
        selectedId: prevMarker.id,
        markers,
        map,
        onClickMarker,
      });
      onClickMarker(e);
    });

    // 기존 마커 제거하고 새 마커로 교체
    marker.setMap(null);
    markers[index] = newMarker;
  });
};

export default function Map({
  mapInstanceRef,
  markers,
  center,
  zoom,
  className,
  onClickMap,
  onClickMarker,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<TMapMarker[]>([]);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapInstanceRef.current = new window.Tmapv3.Map(mapContainerRef.current, {
        center: new window.Tmapv3.LatLng( // 지도 초기 좌표
          center?.lat ?? DEFAULT_MAP_CENTER.lat,
          center?.lng ?? DEFAULT_MAP_CENTER.lng
        ),
        zoom: zoom ?? DEFAULT_MAP_ZOOM,
        width: "100%",
        height: "100%",
        scaleBar: false,
      });

      mapInstanceRef.current.on("Click", () => {
        onClearMarkers(markersRef.current);
        markersRef.current = onCreateMarkers({
          markers: markers ?? [],
          map: mapInstanceRef.current!,
          onClickMarker: onClickMarker ?? (() => {}),
        });
        onClickMap?.();
      });

      if (markers) {
        markersRef.current = onCreateMarkers({
          markers,
          map: mapInstanceRef.current,
          onClickMarker: onClickMarker ?? (() => {}),
        });
      }
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      mapInstanceRef.current?.destroy();
    };
  }, [markers]);

  return <div ref={mapContainerRef} className={cn("flex-1", className)} />;
}
