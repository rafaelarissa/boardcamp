import { Router } from "express";
import { getCustomers, setCustomers } from "../controllers/customersController.js";

const customersRouter = Router();
customersRouter.post('/customers', setCustomers);
customersRouter.get('/customers', getCustomers);

export default customersRouter;