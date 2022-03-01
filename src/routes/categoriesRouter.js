import { Router } from "express";
import { setCategories } from "../controllers/categoriesController";

const categoriesRouter = Router();
categoriesRouter.post('/categories', setCategories);

export default categoriesRouter;