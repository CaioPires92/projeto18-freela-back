import Joi from 'joi'

export const photoSchema = Joi.object({
  url: Joi.string().uri().required()
})
