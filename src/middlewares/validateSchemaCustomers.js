import customersSchema from "../schemas/customersSchema.js";

export function customersValidation(req, res, next) {
  const validation = customersSchema.validate(req.body);

  if(validation.error) {
    res.status(400).send('Schema inválido');
    return;
  }

  next();
}