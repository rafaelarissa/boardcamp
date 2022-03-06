import { Router } from "express";
import { getCustomers, setCustomers } from "../controllers/customersController.js";
import { customersValidation } from "../middlewares/validateSchemaCustomers.js";

const customersRouter = Router();
customersRouter.post('/customers', customersValidation, setCustomers);
customersRouter.get('/customers', getCustomers);

export default customersRouter;