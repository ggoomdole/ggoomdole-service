import Image from "next/image";
import Link from "next/link";

import AverageStarRating from "../common/star/average-star-rating";

interface NearbyTouristSpotItemProps {
  title: string;
  image: string;
  address: string;
  rating: number;
}

export default function NearbyTouristSpotItem({
  title,
  image,
  address,
  rating,
}: NearbyTouristSpotItemProps) {
  return (
    <Link
      href={`/tourist-spot/${title}`}
      className="w-max max-w-40 shrink-0 overflow-hidden rounded-sm shadow-lg"
    >
      <Image src={image} alt={title} width={160} height={160} />
      <div className="space-y-0.5 bg-white p-1">
        <p className="typo-medium truncate">{title}</p>
        <AverageStarRating rating={rating} />
        <p className="typo-regular">{address}</p>
      </div>
    </Link>
  );
}
