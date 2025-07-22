import { Router } from 'express';

import reviewController from '../controllers/reviewController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post("/", authenticate, reviewController.createReview);

router.get("/spot/:spotId", reviewController.showAllReview);
router.get("/:reviewId", reviewController.showOneReview);

router.delete("/:reviewId", authenticate, reviewController.deleteReview);

export default router;