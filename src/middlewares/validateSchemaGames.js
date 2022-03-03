import gamesSchema from "../schemas/gamesSchema.js";

export function gamesValidation(req, res, next) {
  const validation = gamesSchema.validate(req.body);
  console.log(validation)
  if(validation.error) {
    return res.status(400).send(validation.error.message);
  }

  next();
}