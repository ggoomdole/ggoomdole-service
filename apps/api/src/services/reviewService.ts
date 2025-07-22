import { ReviewCheckDTO, ReviewCreateDTO, RoadListResponseDTO } from '@repo/types';

import reviewRepository from '../repositories/reviewRepository';
import { ExistsError, NotFoundError, UnauthorizedError } from '../utils/customError';

class ReviewService {
  async createReview(userId: number, data: ReviewCreateDTO): Promise<ReviewCheckDTO> {
    const newReview = await reviewRepository.reveiwUpload(userId, data);
    
    return{
      spotId: newReview.spotId,
      content: newReview.text,
      rate: newReview.rate,
    };
  }

  async deleteReview(userId: number, reviewId: number): Promise<void> {
    const isOwner = await reviewRepository.isMyReviewCheck(userId, reviewId);
    if (!isOwner) { throw new UnauthorizedError('본인의 리뷰가 아닙니다.'); }

    const road = await reviewRepository.findReviewById(reviewId);
    if (!road) throw new NotFoundError('해당 리뷰가 존재하지 않습니다.');

    await reviewRepository.deleteReview(reviewId);
  }  

  async showOneReview(reviewId: number): Promise<ReviewCheckDTO> {
    const reviewById = await reviewRepository.findReviewById(reviewId);
    if (!reviewById) { throw new NotFoundError('리뷰가 존재하지 않습니다.'); }
  
    return {
      spotId: reviewById.spotId,
      content: reviewById.text,
      rate: reviewById.rate
    };
  }  

  async showAllReview(spotId: string): Promise<ReviewCheckDTO[]> {
    const rawReviews = await reviewRepository.findAllReviewById(spotId);
  
    if (!rawReviews || rawReviews.length === 0) { throw new NotFoundError('해당 장소에 리뷰가 존재하지 않습니다.'); }
  
    return rawReviews.map((p): ReviewCheckDTO => ({
      spotId: p.spotId,
      content: p.text,
      rate: p.rate ?? 0,
    }));
  }
}

export default new ReviewService();