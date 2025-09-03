import Image from "next/image";

import StarRating from "@/components/common/star/star-rating";
import { ReviewCheckDTO } from "@repo/types";

const DEFAULT_IMAGE_URL = "/static/default-thumbnail.png";

// spotId가 아니라 userId로 변경
export default function ReviewItem({ content, rate, profileImage, nickname }: ReviewCheckDTO) {
  return (
    <div className="shadow-layout flex gap-2.5 rounded-xl p-3">
      <Image
        src={profileImage || DEFAULT_IMAGE_URL}
        alt="review image"
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover"
      />
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <p className="typo-regular">{nickname}</p>
          <StarRating rating={rate} className="size-4" />
        </div>
        <p className="typo-regular">{content}</p>
      </div>
    </div>
  );
}
