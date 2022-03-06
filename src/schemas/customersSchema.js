import Joi from "joi";

const customersSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required().min(10).max(11),
  cpf: Joi.string().required().pattern(new RegExp('^[0-9]{11}$')),
  birthday: Joi.date().less('now').required()
})

export default customersSchema;