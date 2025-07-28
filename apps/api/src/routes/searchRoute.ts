import { Router } from 'express';

import searchController from '../controllers/searchController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get("/road", authenticate, searchController.searchRoad);

router.delete("/delete", authenticate, searchController.deleteSearchWord);
router.delete("/delete/all", authenticate, searchController.deleteSearchAllWord);
router.get("/recent", authenticate, searchController.getRecentSearchWords);


export default router;