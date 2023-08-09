import Joi from 'joi'

export const serviceSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  category_id: Joi.number().integer().min(1).required(),
  photo_url: Joi.string().uri().required(),
  price: Joi.number().min(0).precision(2).required(),
  is_active: Joi.boolean().required()
})
