import { ReviewCreateDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import reviewService from '../services/reviewService';
import { BadRequestError, NotFoundError } from '../utils/customError';

class ReveiwController {
  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const dto = req.body as ReviewCreateDTO;
      if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
        
      const newReview = await reviewService.createReview(userId, dto);
      res.status(200).json({ message: "리뷰 생성 완료", userId: userId, newReview });
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const reviewId = parseInt(req.params.reviewId, 10);
      if (isNaN(reviewId)) { throw new BadRequestError('리뷰ID는 필수이며 숫자여야 합니다.'); }

      await reviewService.deleteReview(reviewId, userId)
      res.status(200).json({ message: `리뷰 삭제 완료 : ${reviewId}`})
    } catch (error) {
    }
  }

  async showOneReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = parseInt(req.params.reviewId, 10);
      if (isNaN(reviewId)) { throw new BadRequestError('리뷰ID는 필수이며 숫자여야 합니다.'); }
    
      const reveiw = await reviewService.showOneReview(reviewId)
      res.status(200).json(reveiw)
    } catch (error) {
    }
  }

  async showAllReview(req: Request, res: Response, next: NextFunction) {
    try {
      const spotId = req.params.spotId;
      if (!spotId || typeof spotId !== 'string' || spotId.trim() === '') { throw new BadRequestError('장소ID는 필수이며 빈 문자열일 수 없습니다.'); }
      
      const reviews = await reviewService.showAllReview(spotId)
      res.status(200).json(reviews)
    } catch (error) {
    }
  }
}

function isAddRoadDTO(obj: any): obj is ReviewCreateDTO {
  return (
    typeof obj.spotId === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.rate === 'number'
  );
}

export default new ReveiwController();