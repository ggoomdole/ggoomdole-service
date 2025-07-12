import Image from "next/image";
import Link from "next/link";

import StarRating from "../star-rating";

interface LocationCardProps {
  id: number;
  rank?: number;
  name: string;
  intro: string;
  imageUrl: string;
  rating: number;
  participants: number;
}

export default function LocationCard({
  id,
  rank,
  name,
  intro,
  imageUrl,
  rating,
  participants,
}: LocationCardProps) {
  return (
    <Link
      href={`/locations/${id}`}
      className="flex items-center gap-2.5 border-b border-b-gray-100 px-1 py-2.5"
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={`${name}-thumbnail`}
          width={80}
          height={80}
          className="aspect-square rounded-sm object-cover"
        />
        <p className="typo-medium typo-regular bg-main-900 absolute -left-2.5 -top-2.5 flex size-5 items-center justify-center rounded-full text-white">
          {rank}
        </p>
      </div>
      <div>
        <h2 className="typo-semibold line-clamp-1">{name}</h2>
        <StarRating rating={rating} participants={participants} />
        <p className="typo-medium line-clamp-1">{intro}</p>
      </div>
    </Link>
  );
}
