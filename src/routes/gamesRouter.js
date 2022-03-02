import { Router } from 'express';
import { getGames, setGames } from "../controllers/gamesController.js";

const gamesRouter = Router();
gamesRouter.post('/games', setGames);
gamesRouter.get('/games', getGames);

export default gamesRouter;