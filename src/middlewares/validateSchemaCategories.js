import categoriesSchema from "../schemas/categoriesSchema.js";

export function categoriesValidation(req, res, next) {
  const validation = categoriesSchema.validate(req.body);

  if(validation.error) {
    res.status(400).send('Campo "name" não pode estar vazio');
    return;
  }

  next();
}