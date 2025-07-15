import StarRating from "@/components/common/star/star-rating";

interface ReviewItemProps {
  id: number;
  name: string;
  rating: number;
  content: string;
}

export default function ReviewItem({ name, rating, content }: ReviewItemProps) {
  return (
    <div className="shadow-layout flex gap-2.5 rounded-xl p-3">
      <div className="size-10 shrink-0 rounded-full bg-gray-100" />
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <p>{name}</p>
          <StarRating rating={rating} className="size-4" />
        </div>
        <p className="typo-regular text-gray-900">{content}</p>
      </div>
    </div>
  );
}
