import { Router } from "express";
import { getCategories, setCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();
categoriesRouter.post('/categories', setCategories);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;