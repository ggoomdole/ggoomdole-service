import { BaseResponseDTO } from "@/models";
import type { ReviewCheckDTO, ReviewCreateDTO } from "@repo/types";

import { clientApi } from "./api";

export const getReviewsById = async (id: string): Promise<BaseResponseDTO<ReviewCheckDTO[]>> => {
  return clientApi.get(`review/spot/${id}`);
};

export const createReview = async ({
  body,
  formData,
}: {
  body: ReviewCreateDTO;
  formData: FormData;
}): Promise<BaseResponseDTO<unknown>> => {
  return clientApi.post("review", body, { body: formData });
};
