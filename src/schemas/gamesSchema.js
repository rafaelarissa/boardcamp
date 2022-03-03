import Joi from "joi";

const gamesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
  stockTotal: Joi.number().min(1),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().min(1)
})

export default gamesSchema;