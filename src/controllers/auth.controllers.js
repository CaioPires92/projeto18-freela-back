import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import {
  createUserDB,
  getUserByEmailDB
} from '../repositories/user.repository.js'
import { createSessionDB } from '../repositories/auth.repository.js'

// cadastro
export async function signUp(req, res) {
  const { name, email, password, city, phone } = req.body

  try {
    const user = await getUserByEmailDB(email)

    if (user.rowCount !== 0)
      return res.status(409).send({
        message: 'Email já foi cadastrado!'
      })

    const hash = bcrypt.hashSync(password, 10)

    await createUserDB(name, email, hash, city, phone)

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

// Login
export async function signIn(req, res) {
  const { email, password } = req.body

  try {
    const user = await getUserByEmailDB(email)

    if (user.rowCount === 0) {
      return res.status(401).send({ message: 'Email não cadastrado!' })
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user.rows[0].password
    )

    if (!isPasswordCorrect)
      return res.status(401).send({ message: 'Senha incorreta' })

    const token = uuid()
    await createSessionDB(user.rows[0].id, token)

    const responseData = {
      token,
      username: user.rows[0].name,
      id: user.rows[0].id
    }

    res.send(responseData)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
