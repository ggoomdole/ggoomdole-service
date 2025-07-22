import { SpotReqDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import spotService from '../services/spotService';
import { BadRequestError } from '../utils/customError';

class SpotController {
  async getNearbySpots(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lng } = req.query;
    
      if (!lat || !lng) throw new BadRequestError('위도와 경도는 필수입니다.');

      const spots = await spotService.fetchNearbySpots(Number(lat), Number(lng));
      res.status(200).json(spots);
    } catch (error) {
        next(error);
    }
  }

  async reqSpot(req: Request, res: Response, next: NextFunction) {
    try {
        const dto = req.body as SpotReqDTO;
        if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }

        const reqAddSpot = await spotService.reqAddSpot(dto);
        res.status(200).json({ message: `요청 전송 완료`, data: reqAddSpot });
    } catch (error) {
      next(error);
    }
  }

  async reqCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const roadId = Number(req.params.roadId);
      if (!roadId) throw new BadRequestError('순례길 ID는 필수입니다.');

      const result = await spotService.getRequestedSpots(userId, roadId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async reqProcessing(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const roadId = Number(req.params.roadId);
      const { approve = [], reject = [] } = req.body;

      await spotService.processSpotRequests(userId, roadId, approve, reject);
      res.status(200).json({ message: '요청 처리 완료' });
    } catch (error) {
      next(error);
    }
  }
}

function isAddRoadDTO(obj: any): obj is SpotReqDTO {
    return (
        typeof obj.roadId === 'number' &&
        Array.isArray(obj.spots) &&
        obj.spots.every(
            (spot: any) =>
                typeof spot.spotId === 'string' &&
                typeof spot.addNumber === 'number' &&
                typeof spot.addReason === 'string'
        )
    );
}

export default new SpotController();