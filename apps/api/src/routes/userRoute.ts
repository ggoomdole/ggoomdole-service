import { Router } from 'express';

import userController from '../controllers/userController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get("/nickname/check", userController.checkNickname);
router.post("/nickname", authenticate, userController.createNickname);
router.patch("/nickname", authenticate, userController.changeNickname);
router.post("/image", authenticate, userController.uploadProfileImage);

export default router;