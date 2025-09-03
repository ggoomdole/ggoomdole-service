import { BaseResponseDTO } from "@/models";
import type { ReviewCheckDTO } from "@repo/types";

import { clientApi } from "./api";

export const getReviewsById = async (id: string): Promise<BaseResponseDTO<ReviewCheckDTO[]>> => {
  return clientApi.get(`review/spot/${id}`);
};

export const createReview = async (formData: FormData): Promise<BaseResponseDTO<unknown>> => {
  return clientApi.post("review", undefined, { body: formData });
};

export const removeReview = async (reviewId: number): Promise<BaseResponseDTO<unknown>> => {
  return clientApi.delete(`review/${reviewId}`);
};
