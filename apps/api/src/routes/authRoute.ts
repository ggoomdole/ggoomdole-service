import { Router } from 'express';
import { Request, Response } from 'express';

import authController from '../controllers/authController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post('/kakao', authController.kakaoLogin);
router.post('/kakao/unlink', authController.kakaoUnlink);

router.get('/kakao/callback', (req: Request, res: Response) => {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).send('인가코드가 없습니다.');
    }
  
    // 테스트용: 인가코드를 JSON으로 바로 응답하거나
    // 실제 프론트 주소가 있으면 리다이렉트 시켜도 됨
    res.json({ code });
    // 또는 예) res.redirect(`http://localhost:3000/login?code=${code}`);
});

export default router;