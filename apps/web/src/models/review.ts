export interface ReviewItemDTO {
  reviewId: number;
  userId: number;
  nickname: string;
  profileImage: string | null;
  content: string;
  rate: number;
  imageUrl: string | null;
}
