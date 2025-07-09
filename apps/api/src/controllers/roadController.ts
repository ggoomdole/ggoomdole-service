import { RoadRequestDTO } from '@repo/types';

import { NextFunction,Request, Response } from 'express';

import roadService from '../services/roadService';
import { BadRequestError, NotFoundError } from '../utils/customError';

class RoadController {
  async loadAllRoad(req: Request, res: Response, next: NextFunction) {
    try {  
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      if (categoryId) throw new NotFoundError('카테고리가 존재하지 않습니다.');

      const sortBy = (req.query.sortBy as string) || 'popular';
      if (sortBy) throw new NotFoundError('정렬 기준이 존재하지 않습니다.');

      const allPilgrimage = await roadService.loadAllRoad(categoryId, sortBy);
      res.status(200).json(allPilgrimage);
    } catch (error) {
      next(error);
    }
  }

  async loadPapularRoad(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      if (categoryId) throw new NotFoundError('카테고리가 존재하지 않습니다.');
  
      const popularRoads = await roadService.getPopularRoads(categoryId);
      res.status(200).json(popularRoads);
    } catch (error) {
      next(error);
    }
  }

  async createRoad(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const dto = req.body as RoadRequestDTO;
      const imageFile = req.file;

      if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
      
      const newPilgrimage = await roadService.createRoad(dto, userId, imageFile);
      res.status(200).json({ message: "순례길 생성 완료", newPilgrimage });
    } catch (error) {
      next(error);
    }
  }

  async createMyRoad(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const dto = req.body as RoadRequestDTO;
      const imageFile = req.file;

      if (!isAddRoadDTO(dto)) { throw new BadRequestError('요청 형식이 잘못되었습니다.'); }
      
      const newPilgrimage = await roadService.createMyRoad(dto, userId, imageFile);
      res.status(200).json({ message: "순례길 생성 완료", newPilgrimage });
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
      res.status(200).json({ message: "순례길 수정 완료", updatedRoad });
    } catch (error) {
      next(error);
    }
  } 
  
  async checkName(req: Request, res: Response, next: NextFunction) {
    try {  
      const title = req.query.title as string;
      if (title) throw new NotFoundError('제목은 필수입니다.');

      const result = await roadService.checkDuplicateName(title);
      return res.status(200).json({ message: `순례길 이름 사용 가능 여부 : ${result.isName}` });
    } catch (error) {
      next(error);
    }
  }

  async loadDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const roadId = Number(req.params.roadId);
      if (roadId) throw new NotFoundError('순례길 ID는 필수입니다.');

      const sortBy = (req.query.sortBy as string) || 'default';
      if (sortBy) throw new NotFoundError('정렬 기준이 존재하지 않습니다.');
  
      const result = await roadService.getOneRoadWithSpots(roadId, sortBy);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async loadParticipation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const maker = req.query.maker === 'true';
      if (maker) throw new NotFoundError('maker 여부는 필수입니다.');

      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      if (categoryId) throw new NotFoundError('카테고리가 존재하지 않습니다.');
  
      const participationList = await roadService.getParticipatedRoads(userId, maker, categoryId);
      return res.status(200).json(participationList);
    } catch (error) {
      next(error);
    }
  }

  async loadCustom(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;

      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      if (categoryId) throw new NotFoundError('카테고리가 존재하지 않습니다.');
  
      const participationList = await roadService.loadCustomRoad(userId, categoryId);
      return res.status(200).json(participationList);
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

export default new RoadController();