import { AddLoadRequestDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import loadService from '../services/loadService';
import { BadRequestError, InternalServerError } from '../utils/customError';

class loadController {
  async createLoad(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.userId;
        const dto = req.body as AddLoadRequestDTO;
        const imageFile = req.file;

        if (!isAddLoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
    
        const newPilgrimage = await loadService.createLoad({
            title: dto.title,
            intro: dto.intro,
            categoryId: dto.categoryId,
            spots: dto.spots
        }, userId, imageFile);
    
        res.status(201).json(newPilgrimage);
      } catch (error) {
      next(error);
    }
  }
}

function isAddLoadDTO(obj: any): obj is AddLoadRequestDTO {
  return (
    typeof obj.title === 'string' &&
    typeof obj.intro === 'string' &&
    typeof obj.categoryId === 'number' && (Array.isArray(obj.spots))
  );
}

export default new loadController();