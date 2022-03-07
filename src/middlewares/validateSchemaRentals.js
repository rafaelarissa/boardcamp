import rentalsSchema from "../schemas/rentalsSchema.js";

export function rentalsValidation(req, res, next) {
  const validation = rentalsSchema.validate(req.body);

  if(validation.error) {
    return res.status(400).send(validation.error.message);
  }

  next();
}