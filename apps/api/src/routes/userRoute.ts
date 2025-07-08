import { Router } from 'express';
import multer from 'multer';

import userController from '../controllers/userController';
import authenticate from '../middlewares/authenticate';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/nickname/check", userController.checkNickname);
router.post("/nickname", authenticate, userController.createNickname);
router.patch("/nickname", authenticate, userController.changeNickname);
router.post("/image", authenticate, upload.single('profile-image'), userController.uploadProfileImage);

export default router;