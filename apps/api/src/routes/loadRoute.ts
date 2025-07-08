import { Router } from 'express';
import multer from 'multer';

import loadController from '../controllers/loadController';
import authenticate from '../middlewares/authenticate';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticate, upload.single('load-image'), loadController.createLoad);
router.patch("/:loadId", authenticate, upload.single('update-load-image'), loadController.updateLoad);

export default router;