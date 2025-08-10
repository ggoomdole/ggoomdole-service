import type { SpotProps } from "@/types/road";
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

export interface UploadRoadRequestDTO {
  title: string;
  categoryId: number;
  intro: string;
  spots: SpotProps[];
}

export interface UploadRoadResponseDTO {
  roadId: number;
  title: string;
  intro: string;
  imageUrl: string | null;
  public: boolean;
  createAt: string;
  updateAt: string;
  categoryId: number;
  spots: SpotProps[];
  participants: {
    userId: number;
    type: boolean;
  }[];
}
