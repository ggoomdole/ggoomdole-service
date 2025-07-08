import { LoadRequestDTO, LoadResponseDTO, ParticipantDTO, SpotDTO, UpdateLoadResponseDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import loadService from '../services/loadService';
import { BadRequestError, InternalServerError } from '../utils/customError';

class loadController {
  async createLoad(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.userId;
        const dto = req.body as LoadRequestDTO;
        const imageFile = req.file;

        if (!isAddLoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
    
        const newPilgrimage = await loadService.createLoad({
            title: dto.title,
            intro: dto.intro,
            categoryId: dto.categoryId,
            spots: dto.spots
        }, userId, imageFile);

        const response: LoadResponseDTO = {
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

  async updateLoad(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const loadId = parseInt(req.params.loadId);
      const dto = req.body as Partial<LoadRequestDTO>;
      const imageFile = req.file;
  
      if (isNaN(loadId)) throw new BadRequestError('유효하지 않은 loadId입니다.');
      if ( !imageFile && !dto.title && !dto.intro && !dto.categoryId && (!dto.spots || dto.spots.length === 0)
      ) { throw new BadRequestError('변경사항이 없습니다.'); }
  
      const updatedLoad = await loadService.updateLoad(loadId, userId, dto, imageFile);
  
      const response: LoadResponseDTO = {
        loadId: updatedLoad.id,
        title: updatedLoad.title,
        intro: updatedLoad.intro,
        imageUrl: updatedLoad.imageUrl,
        public: updatedLoad.public,
        createAt: updatedLoad.createAt,
        updateAt: updatedLoad.updateAt,
        categoryId: updatedLoad.categoryId,
        spots: updatedLoad.spots.map(spot => ({
          spotId: spot.spotId,
          number: spot.number,
          introSpot: spot.introSpot
        })),
        participants: updatedLoad.participants.map(part => ({
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

function isAddLoadDTO(obj: any): obj is LoadRequestDTO {
  return (
    typeof obj.title === 'string' &&
    typeof obj.intro === 'string' &&
    typeof obj.categoryId === 'number' && (Array.isArray(obj.spots))
  );
}

export default new loadController();