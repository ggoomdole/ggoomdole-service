"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/common/dialog";
import RegisterStarRating from "@/components/common/star/register-star-rating";
import StarRating from "@/components/common/star/star-rating";
import { infoToast } from "@/utils/toast";

interface RegisterReviewProps {
  locationId: string;
}

export default function RegisterReview({ locationId }: RegisterReviewProps) {
  const [rating, setRating] = useState(0);

  const onRegisterReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const review = formData.get("review") as string;

    if (!review.trim()) return infoToast("후기를 입력해주세요.");
    if (rating === 0) return infoToast("별점을 선택해주세요.");

    // locationId와 rating을 이용해서 리뷰 등록하기
  };

  return (
    <Dialog>
      <DialogTrigger className="flex">
        <StarRating rating={0} className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center gap-1">
          <p className="typo-medium text-gray-900">솔직 후기</p>
          <RegisterStarRating rating={rating} className="size-5" onRatingChange={setRating} />
        </div>
        <form className="flex flex-col gap-2.5" onSubmit={onRegisterReview}>
          <textarea
            className="bg-main-100 typo-regular min-h-40 w-full resize-none rounded-xl p-2.5"
            placeholder="후기를 남겨주세요."
            name="review"
          />
          <button
            type="submit"
            className="bg-main-100 typo-regular self-end rounded-xl px-2.5 py-1 text-gray-900"
          >
            리뷰 등록
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
