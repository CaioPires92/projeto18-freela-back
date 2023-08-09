import { Router } from 'express'
import {
  getUser,
  getUserById,
  updateUser
} from '../controllers/user.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { updateUserSchema } from '../schemas/updateUser.schema.js'
import { validateAuth } from '../middlewares/validateAuth.js'

const userRouter = Router()

userRouter.get('/user', validateAuth, getUser)
userRouter.get('/user/:id', validateAuth, getUserById)
userRouter.put('/user/:id', validateSchema(updateUserSchema), validateAuth, updateUser)

export default userRouter
