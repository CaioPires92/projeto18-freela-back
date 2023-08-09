import { db } from '../database/db.connection.js'

export async function validateAuth(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '')
  if (!token) return res.sendStatus(401)

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token
    ])

    if (session.rowCount === 0) return res.sendStatus(401)
    res.locals.user_id = session.rows[0].user_id

    next()
  } catch (err) {
    res.status(500).send(err)
  }
}
