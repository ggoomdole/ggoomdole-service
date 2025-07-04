"use client";

import Image from "next/image";
import Link from "next/link";

import Star from "@/assets/star.svg";
import { useGeolocation } from "@/hooks/use-geolocation";
import { calculateDistance } from "@/lib/utils";

interface NearbyTouristSpotItemProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  participants: number;
  latitude: number;
  longitude: number;
}

export default function NearbyTouristSpotItem({
  id,
  name,
  image,
  rating,
  participants,
  latitude,
  longitude,
}: NearbyTouristSpotItemProps) {
  const { latitude: userLat, longitude: userLon, loading, error } = useGeolocation();

  // 거리 계산
  const distance =
    userLat && userLon ? calculateDistance(userLat, userLon, latitude, longitude) : null;

  return (
    <Link
      href={`/tourist-spot/${id}`}
      className="w-max max-w-40 shrink-0 overflow-hidden rounded-sm shadow-lg"
    >
      <Image src={image} alt={name} width={160} height={160} />
      <div className="space-y-0.5 bg-white p-1">
        <p className="typo-medium truncate">{name}</p>
        <div className="typo-regular flex items-center gap-1 text-gray-500">
          <Star className="size-3.5" />
          <p>
            {rating}({participants})
          </p>
        </div>
        <p className="typo-regular">
          {loading
            ? "위치 확인 중..."
            : error
              ? "위치 정보 없음"
              : distance !== null
                ? `${distance}km`
                : "거리 계산 중..."}
        </p>
      </div>
    </Link>
  );
}
