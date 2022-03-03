import { Router } from 'express';
import { getGames, setGames } from "../controllers/gamesController.js";
import { gamesValidation } from '../middlewares/validateSchemaGames.js';

const gamesRouter = Router();
gamesRouter.post('/games', gamesValidation, setGames);
gamesRouter.get('/games', getGames);

export default gamesRouter;