import { NextFunction,Request, Response } from 'express';

import spotService from '../services/spotService';
import { BadRequestError } from '../utils/customError';
import { SpotReqDTO } from '@repo/types';

class SpotController {
  async reqSpot(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.userId;
        if(!userId) throw new BadRequestError('로그인 해야 사용할 수 있는 기능입니다.');
        const dto = req.body as SpotReqDTO;
        if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }

        const reqAddSpot = await spotService.reqAddSpot(dto);
        res.status(200).json({ message: `요청 전송 완료 : ${reqAddSpot}` });
    } catch (error) {
      next(error);
    }
  }

  async reqCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { roadId } = req.body.roadId;
      const result = await spotService.getRequestedSpots(userId, roadId);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async reqProcessing(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { roadId, approve = [], reject = [] } = req.body;

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