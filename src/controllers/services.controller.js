import { db } from '../database/db.connection.js'

export async function createServices(req, res) {
  const { user_id } = res.locals
  const { title, description, category_id, photo_url, price, is_active } =
    req.body

  try {
    const categoryCheck = await db.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [category_id]
    )

    if (categoryCheck.rowCount === 0) {
      return res.status(400).json({ message: 'Categoria inválida.' })
    }

    const service = await db.query(
      `INSERT INTO services (user_id, title, description, category_id, photo_url, price, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [user_id, title, description, category_id, photo_url, price, is_active]
    )

    res.status(201).send(service.rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function editServices(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getServices(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteServices(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message)
  }
}
