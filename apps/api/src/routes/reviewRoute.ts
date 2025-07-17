import { Router } from 'express';

import reviewController from '../controllers/reviewController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post("/", authenticate, reviewController.createReview);
router.delete("/:reveiwId", authenticate, reviewController.deleteReview);

router.get("/:spotId", reviewController.showAllReview);
router.get("/:reveiwId", reviewController.showOneReview);


export default router;