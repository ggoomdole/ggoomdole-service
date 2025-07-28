import { Prisma,PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { ReviewCreateDTO } from '@repo/types';

class reviewController {
  async reveiwUpload(userId: number, data: ReviewCreateDTO) {
    return await prisma.review.create({
      data:{
        userId,
        spotId: data.spotId,
        text: data.content,
        rate: data.rate
      }
    });
  }

  async deleteReview(reviewId: number) {
    return await prisma.review.delete({
        where: { id: reviewId }
    })
  }

  async findReviewById(reviewId: number) {
    return await prisma.review.findFirst({
      where: { id: reviewId }
    });
  }

  async isMyReviewCheck(userId: number, reviewId: number) {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId: userId,
      },
    });
    return !!review;
  }  

  async findAllReviewById(spotId: string) {
    return await prisma.review.findMany({
      where: { spotId },
    });
  }
}

export default new reviewController();