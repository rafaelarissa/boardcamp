import Joi from "joi";

const rentalsSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().min(1).required()
})

export default rentalsSchema;