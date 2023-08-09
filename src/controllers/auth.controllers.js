import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { db } from '../database/db.connection.js'

// cadastro
export async function signUp(req, res) {
  const { name, email, password, city, phone } = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (user.rowCount !== 0)
      return res.status(409).send({
        message: 'Email já foi cadastrado!'
      })

    const hash = bcrypt.hashSync(password, 10)

    await db.query(
      'INSERT INTO users (name, email, password, city, phone) VALUES ($1,$2, $3, $4, $5 );',
      [name, email, hash, city, phone]
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

// Login
export async function signIn(req, res) {
  const { email, password } = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])

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
    await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [
      user.rows[0].id,
      token
    ])

    res.send({ token })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
