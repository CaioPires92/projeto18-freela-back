import Joi from 'joi'

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'As senhas não coincidem'
  }),
  name: Joi.string().required(),
  city: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\d{2}-\d{5}-\d{4}$/)
    .required()
})
