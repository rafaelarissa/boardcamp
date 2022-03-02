import { Router } from 'express';
import { setGames } from "../controllers/gamesController.js";

const gamesRouter = Router();
gamesRouter.post('/games', setGames);

export default gamesRouter;