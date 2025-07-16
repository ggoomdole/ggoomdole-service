import { Router } from 'express';

import searchController from '../controllers/searchController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get("/road", authenticate, searchController.searchRoad);

router.delete("/", authenticate, searchController.deleteSearchWord);
router.delete("/all", authenticate, searchController.deleteSearchAllWord);
router.get("/recent", authenticate, searchController.getRecentSearchWords);


export default router;