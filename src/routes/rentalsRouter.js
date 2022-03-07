import { Router } from "express";
import { getRentals, setRentals } from "../controllers/rentalsController.js";
import { rentalsValidation } from "../middlewares/validateSchemaRentals.js";

const rentalsRouter = Router();
rentalsRouter.post('/rentals', rentalsValidation, setRentals);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;