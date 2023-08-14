import { Router } from 'express'
import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'
import servicesRouter from './services.routes.js'
import categoriesRouter from './categories.routes.js'

const router = Router()

router.use(authRouter)
router.use(userRouter)
router.use(servicesRouter)
router.use(categoriesRouter)

export default router
