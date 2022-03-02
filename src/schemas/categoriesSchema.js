import Joi from "joi";

const categoriesSchema = Joi.object({
  name: Joi.string().required().trim()
})

export default categoriesSchema;