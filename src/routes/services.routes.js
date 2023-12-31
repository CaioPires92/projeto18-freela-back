import { Router } from 'express'
import {
  createServices,
  getServices,
  deleteServices,
  editServices
} from '../controllers/services.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { serviceSchema } from '../schemas/services.schemas.js'
import { validateAuth } from '../middlewares/validateAuth.js'
import { updateServiceSchema } from '../schemas/updateServices.schemas.js'

const servicesRouter = Router()

servicesRouter.post(
  '/services',
  validateSchema(serviceSchema),
  validateAuth,
  createServices
)
servicesRouter.put(
  '/services/:id',
  validateSchema(updateServiceSchema),
  validateAuth,
  editServices
)
servicesRouter.get('/services', getServices)
servicesRouter.delete('/services/:id', validateAuth, deleteServices)

export default servicesRouter

// - POST **`/api/services`**: Cadastrar um novo serviço.
// - PUT **`/api/services/:serviceId`**: Atualizar detalhes de um serviço.
// - GET **`/api/services`**: Obter a lista de serviços ativos.
// - DELETE ** /api/services/:serviceId`**: Deleta Serviço
