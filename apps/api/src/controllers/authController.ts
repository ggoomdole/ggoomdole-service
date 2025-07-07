import { NextFunction,Request, Response } from 'express';

import AuthService from '../services/authService';
import { BadRequestError } from '../utils/customError';

class AuthController {
  async kakaoLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body;
      if (!code) { throw new BadRequestError('인가코드가 없습니다.'); }
      if (typeof code !== 'string') { throw new BadRequestError('인가코드는 문자열이어야 합니다.'); }

      const result = await AuthService.kakaoLoginService(code);
      res.status(200).json({ message: '로그인 성공', result: result});
    } catch (error) {
      next(error);
    }
  }

  async kakaoUnlink(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      if (!accessToken) { throw new BadRequestError('액세스 토큰이 없습니다.'); }

      await AuthService.kakaoUnlinkService(accessToken);
      res.status(200).json({ message: '회원 탈퇴 성공' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();