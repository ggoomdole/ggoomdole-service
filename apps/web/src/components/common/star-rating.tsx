import Star from "@/assets/star.svg";

interface StarRatingProps {
  rating: number;
  participants: number;
}

export default function StarRating({ rating, participants }: StarRatingProps) {
  return (
    <div className="typo-regular flex items-center gap-1 text-gray-500">
      <Star className="size-3.5" />
      <p>
        {rating}({participants})
      </p>
    </div>
  );
}
