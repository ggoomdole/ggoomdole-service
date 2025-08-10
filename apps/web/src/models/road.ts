import type { NativeType } from "@/types/user";

export interface RoadResponseDTO {
  roadId: number;
  title: string;
  intro: string;
  imageUrl: string;
  categoryId: number;
  participants: number;
  native: NativeType;
}

export interface SearchRoadResponseDTO {
  results: RoadResponseDTO[];
}
