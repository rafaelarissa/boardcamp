import { Router } from "express";
import { setCustomers } from "../controllers/customersController.js";

const customersRouter = Router();
customersRouter.post('/customers', setCustomers);

export default customersRouter;