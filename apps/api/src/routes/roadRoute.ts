import { Router } from 'express';
import multer from 'multer';

import roadController from '../controllers/roadController';
import authenticate from '../middlewares/authenticate';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", roadController.loadAllRoad);
router.get("/recommend", roadController.loadPapularRoad);

router.post("/", authenticate, upload.single('road-image'), roadController.createRoad);
router.post("/custom", authenticate, upload.single('road-image'), roadController.createMyRoad);
router.patch("/:roadId", authenticate, upload.single('update-road-image'), roadController.updateRoad);

router.get("/:roadId", roadController.loadDetail);
router.get("/name", roadController.checkName);

router.get("/participation", authenticate, roadController.loadParticipation);

export default router;