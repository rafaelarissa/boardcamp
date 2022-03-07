import { Router } from "express";
import { getRentals, setRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();
rentalsRouter.post('/rentals', setRentals);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;