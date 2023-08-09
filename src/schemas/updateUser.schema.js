import Joi from 'joi'

export const updateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\d{2}-\d{5}-\d{4}$/)
    .required()
})
