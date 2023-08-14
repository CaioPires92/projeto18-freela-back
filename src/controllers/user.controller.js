import { db } from '../database/db.connection.js'

export async function getUser(req, res) {
  // const { userId } = res.locals

  try {
    const user = await db.query(
      `SELECT id, name, email, city, phone FROM users`
    )

    if (user.rowCount === 0) {
      return res.status(401).send({ message: 'Nenhum usuario cadastrado' })
    }

    res.status(200).send(user.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getUserById(req, res) {
  const { id } = req.params
  try {
    const user = await db.query(
      `SELECT name, email, city, phone FROM users WHERE id=$1`,
      [id]
    )

    if (user.rowCount === 0) {
      return res.status(401).send({ message: 'Nenhum usuario cadastrado' })
    }

    res.status(200).send(user.rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function updateUser(req, res) {
  const { id } = req.params
  const { name, email, city, phone } = req.body

  try {
    const updateUser = await db.query(
      `UPDATE users SET name=$1, email=$2, city=$3, phone=$4 WHERE id=$5 RETURNING name, email, city, phone`,
      [name, email, city, phone, id]
    )

    if (updateUser.rowCount === 0) {
      return res.status(401).send({ message: 'Nenhum usuario cadastrado' })
    }

    res.status(200).json(updateUser.rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}
