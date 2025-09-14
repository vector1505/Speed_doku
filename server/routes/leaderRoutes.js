import express from "express"
const router  = express.Router();

import * as leaderController from "../controllers/leaderController.js"

router.get('/leaderboard',leaderController.get_index);

function requireApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}

router.post('/add', requireApiKey, leaderController.create);
router.get('/test',leaderController.test);

export default router;