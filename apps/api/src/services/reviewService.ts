import { ReviewCheckDTO, ReviewCreateDTO } from '@repo/types';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import s3 from '../config/s3-config';
import reviewRepository from '../repositories/reviewRepository';
import { ExistsError, NotFoundError, UnauthorizedError } from '../utils/customError';

class ReviewService {
  private BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

  private async uploadReviewImage(userId: number, file: Express.Multer.File): Promise<string> {
    const key = `review-images/${userId}/${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${this.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async createReview(userId: number, data: ReviewCreateDTO, file?: Express.Multer.File): Promise<ReviewCheckDTO> {
    if (file) {
      const imageUrl = await this.uploadReviewImage(userId, file);
      data.imageUrl = imageUrl;
    }

    const newReview = await reviewRepository.reveiwUpload(userId, data);
    
    return{
      spotId: newReview.spotId,
      content: newReview.text,
      rate: newReview.rate,
      imageUrl: newReview.imageUrl ?? undefined
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
      rate: reviewById.rate,
      imageUrl: reviewById.imageUrl ?? undefined
    };
  }  

  async showAllReview(spotId: string): Promise<ReviewCheckDTO[]> {
    const rawReviews = await reviewRepository.findAllReviewById(spotId);
  
    if (!rawReviews || rawReviews.length === 0) { throw new NotFoundError('해당 장소에 리뷰가 존재하지 않습니다.'); }
  
    return rawReviews.map((p): ReviewCheckDTO => ({
      spotId: p.spotId,
      content: p.text,
      rate: p.rate ?? 0,
      imageUrl: p.imageUrl ?? undefined
    }));
  }
}

export default new ReviewService();