import Joi from 'joi'

export const updateServiceSchema = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string(),
  category_id: Joi.number().integer().min(1),
  photo_url: Joi.string().uri(),
  price: Joi.number().min(0).precision(2),
  is_active: Joi.boolean()
})
