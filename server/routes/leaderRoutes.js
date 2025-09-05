import express from "express"
const router  = express.Router();

import * as leaderController from "../controllers/leaderController.js"

router.get('/leaderboard',leaderController.get_index);

router.post('/add',leaderController.create);

router.get('/test',leaderController.test);

export default router;