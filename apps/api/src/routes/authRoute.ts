import { Router } from 'express';

import authController from '../controllers/authController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post('/login/kakao', authController.kakaoLogin);
router.post('/kakao/unlink', authenticate, authController.kakaoUnlink);

export default router;