import Star from "@/assets/star.svg";

interface AverageStarRatingProps {
  rating: number;
  participants?: number;
}

export default function AverageStarRating({ rating, participants }: AverageStarRatingProps) {
  return (
    <div className="typo-regular flex items-center gap-1 text-gray-500">
      <Star className="size-3.5" />
      <div className="flex items-center gap-1">
        <p>{rating}</p>
        {participants ? participants > 0 && <p>{participants}</p> : null}
      </div>
    </div>
  );
}
