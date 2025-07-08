import { Router } from 'express';
import multer from 'multer';

import roadController from '../controllers/roadController';
import authenticate from '../middlewares/authenticate';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticate, upload.single('road-image'), roadController.createRoad);
router.patch("/:roadId", authenticate, upload.single('update-road-image'), roadController.updateRoad);

export default router;