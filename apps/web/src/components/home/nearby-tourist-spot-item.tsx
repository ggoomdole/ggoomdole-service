import Image from "next/image";
import Link from "next/link";

interface NearbyTouristSpotItemProps {
  title: string;
  image: string;
  address: string;
  rating: number;
}

const DEFAULT_IMAGE = "/static/default-thumbnail.png";

export default function NearbyTouristSpotItem({
  title,
  image,
  address,
}: NearbyTouristSpotItemProps) {
  return (
    <Link
      href={`/tourist-spot/${title}`}
      className="w-max max-w-40 shrink-0 overflow-hidden rounded-sm shadow-lg"
    >
      <Image
        src={image || DEFAULT_IMAGE}
        alt={title}
        width={160}
        height={160}
        className="aspect-square object-cover"
      />
      <div className="space-y-0.5 bg-white p-1">
        <p className="typo-medium truncate">{title}</p>
        <p className="typo-regular">{address}</p>
      </div>
    </Link>
  );
}
