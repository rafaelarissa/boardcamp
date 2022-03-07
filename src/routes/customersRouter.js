import { Router } from "express";
import { getCustomerById, getCustomers, setCustomers, updateCustomers } from "../controllers/customersController.js";
import { customersValidation } from "../middlewares/validateSchemaCustomers.js";

const customersRouter = Router();
customersRouter.post('/customers', customersValidation, setCustomers);
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.put('/customers/:id', customersValidation, updateCustomers);

export default customersRouter;