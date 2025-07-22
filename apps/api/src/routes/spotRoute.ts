import { Router } from 'express';

import spotController from '../controllers/spotController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get("/dataSpot", authenticate, spotController.getNearbySpots);

router.post("/add/req", authenticate, spotController.reqSpot);
router.get("/add/check", authenticate, spotController.reqCheck);
router.patch("/add", authenticate, spotController.reqProcessing);

export default router;