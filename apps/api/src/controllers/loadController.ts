import { AddLoadRequestDTO, AddLoadResponseDTO, ParticipantDTO,SpotDTO } from '@repo/types';

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

        const response: AddLoadResponseDTO = {
          loadId: newPilgrimage.id,
          title: newPilgrimage.title,
          intro: newPilgrimage.intro,
          imageUrl: newPilgrimage.imageUrl ?? null,
          public: newPilgrimage.public ?? true,
          createAt: newPilgrimage.createAt,
          updateAt: newPilgrimage.updateAt,
          categoryId: newPilgrimage.categoryId,
          spots: newPilgrimage.spots.map((spot): SpotDTO => ({
            spotId: spot.spotId,
            number: spot.number,
            introSpot: spot.introSpot,
          })),
          participants: newPilgrimage.participants.map((part): ParticipantDTO => ({
            userId: part.userId,
            type: part.type
          }))
        };
    
        res.status(200).json(response);
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