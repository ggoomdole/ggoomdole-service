import { Router } from "express";
import multer from "multer";

import roadController from "../controllers/roadController";
import authenticate from "../middlewares/authenticate";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/name", roadController.checkName);

router.get("/", roadController.loadAllRoad);
router.post("/", authenticate, upload.single("road-image"), roadController.createRoad);

router.get("/custom", authenticate, roadController.loadCustom);
router.post("/custom", authenticate, upload.single("road-image"), roadController.createMyRoad);

router.get("/recommend", roadController.loadPapularRoad);
router.get("/participation", authenticate, roadController.loadParticipation);
router.post("/participation/:roadId", authenticate, roadController.partiForRoad);

router.get("/:roadId", roadController.loadDetail);
router.patch(
  "/:roadId",
  authenticate,
  upload.single("update-road-image"),
  roadController.updateRoad
);

router.delete("/:roadId", authenticate, roadController.deleteRoad);

export default router;
