import { Router } from "express";
import { getCategories, setCategories } from "../controllers/categoriesController.js";
import { categoriesValidation } from "../middlewares/validateSchemaCategories.js";

const categoriesRouter = Router();
categoriesRouter.post('/categories', categoriesValidation, setCategories);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;