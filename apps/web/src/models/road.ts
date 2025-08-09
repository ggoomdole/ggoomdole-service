import type { NativeType } from "@/types/user";

export interface RoadRecommendResponseDTO {
  roadId: number;
  title: string;
  intro: string;
  imageUrl: string;
  categoryId: number;
  participants: number;
  native: NativeType;
}
