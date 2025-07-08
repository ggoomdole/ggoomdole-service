import { ParticipantDTO, RoadRequestDTO, RoadResponseDTO, SpotDTO, UpdateRoadResponseDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import roadService from '../services/roadService';
import { BadRequestError, InternalServerError } from '../utils/customError';

class roadController {
  async createRoad(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.userId;
        const dto = req.body as RoadRequestDTO;
        const imageFile = req.file;

        if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
    
        const newPilgrimage = await roadService.createRoad({
            title: dto.title,
            intro: dto.intro,
            categoryId: dto.categoryId,
            spots: dto.spots
        }, userId, imageFile);

        const response: RoadResponseDTO = {
          roadId: newPilgrimage.id,
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

  async updateRoad(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const roadId = parseInt(req.params.roadId);
      const dto = req.body as Partial<RoadRequestDTO>;
      const imageFile = req.file;
  
      if (isNaN(roadId)) throw new BadRequestError('유효하지 않은 roadId입니다.');
      if ( !imageFile && !dto.title && !dto.intro && !dto.categoryId && (!dto.spots || dto.spots.length === 0)
      ) { throw new BadRequestError('변경사항이 없습니다.'); }
  
      const updatedRoad = await roadService.updateRoad(roadId, userId, dto, imageFile);
  
      const response: RoadResponseDTO = {
        roadId: updatedRoad.id,
        title: updatedRoad.title,
        intro: updatedRoad.intro,
        imageUrl: updatedRoad.imageUrl,
        public: updatedRoad.public,
        createAt: updatedRoad.createAt,
        updateAt: updatedRoad.updateAt,
        categoryId: updatedRoad.categoryId,
        spots: updatedRoad.spots.map(spot => ({
          spotId: spot.spotId,
          number: spot.number,
          introSpot: spot.introSpot
        })),
        participants: updatedRoad.participants.map(part => ({
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

function isAddRoadDTO(obj: any): obj is RoadRequestDTO {
  return (
    typeof obj.title === 'string' &&
    typeof obj.intro === 'string' &&
    typeof obj.categoryId === 'number' && (Array.isArray(obj.spots))
  );
}

export default new roadController();