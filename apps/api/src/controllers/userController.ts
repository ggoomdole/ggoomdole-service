import { NextFunction,Request, Response } from 'express';

import userService from '../services/userService';
import { BadRequestError } from '../utils/customError';

class UserController {
  async checkNickname(req: Request, res: Response, next: NextFunction) {
    try {
        const { nickname } = req.query;
        if (!nickname) { throw new BadRequestError('닉네임은 필수입니다.'); }
        if (typeof nickname !== "string") { throw new BadRequestError('닉네임은 문자열이어야 합니다.'); }
        
        const isAvailable = await userService.checkNicknameAvailability(nickname);
        res.status(200).json({ message: `닉네임 사용 가능 여부 : ${isAvailable}` });
    } catch (error) {
      next(error);
    }
  }

  async createNickname(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { nickname } = req.body;
      if (!nickname) { throw new BadRequestError('닉네임은 필수입니다.'); }
      if (typeof nickname !== "string") { throw new BadRequestError('닉네임은 문자열이어야 합니다.'); }
      
      const newNickname = await userService.createNickname(userId, nickname);
      res.status(200).json({ message: `닉네임 생성 완료 : ${newNickname}` });
    } catch (error: any) {
      next(error);
    }
  }

  async changeNickname(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      const { nickname } = req.body;
      if (!nickname) { throw new BadRequestError('닉네임은 필수입니다.'); }
      if (typeof nickname !== "string") { throw new BadRequestError('닉네임은 문자열이어야 합니다.'); }
      
      const newNickname = await userService.changeNickname(userId, nickname);
      res.status(200).json({ message: `닉네임 변경 완료 : ${newNickname}` });
    } catch (error: any) {
      next(error);
    }
  }

  async uploadProfileImage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      if (!req.file) { throw new BadRequestError('이미지 파일은 필수입니다.'); }
      
      const imageUrl = await userService.uploadProfileImage(userId, req.file);
      res.status(200).json({ message: `프로필 이미지 등록 완료 : ${imageUrl}` });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();