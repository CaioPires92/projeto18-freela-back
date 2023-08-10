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
  const { user_id } = res.locals
  const { id } = req.params
  const { title, description, category_id, photo_url, price, is_active } =
    req.body

  try {
    // const serviceCheck = await db.query(
    //   'SELECT * FROM services WHERE id = $1 AND user_id = $2',
    //   [id, user_id]
    // )

    const service = await db.query('SELECT * FROM services WHERE id = $1 ', [
      id
    ])

    if (service.rowCount === 0) {
      return res.status(404).json({ message: 'Serviço não encontrado.' })
    }

    if (service.rows[0].user_id !== user_id)
      return res
        .status(401)
        .send({ message: 'Você só pode editar os itens criados por você!' })

    const updates = {}
    if (title !== undefined) updates.title = title
    if (description !== undefined) updates.description = description
    if (category_id !== undefined) updates.category_id = category_id
    if (photo_url !== undefined) updates.photo_url = photo_url
    if (price !== undefined) updates.price = price
    if (is_active !== undefined) updates.is_active = is_active

    await db.query(
      `UPDATE services SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       category_id = COALESCE($3, category_id),
       photo_url = COALESCE($4, photo_url),
       price = COALESCE($5, price),
       is_active = COALESCE($6, is_active)
       WHERE id = $7`,
      [
        updates.title,
        updates.description,
        updates.category_id,
        updates.photo_url,
        updates.price,
        updates.is_active,
        id
      ]
    )

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getServices(req, res) {
  try {
    const service = await db.query(
      `SELECT title, description, photo_url, price FROM services`
    )

    if (service.rowCount === 0) {
      return res.status(401).send({ message: 'Nenhum serviço cadastrado' })
    }

    res.status(200).send(service.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteServices(req, res) {
  const { id } = req.params
  const { user_id } = res.locals
  try {
    const service = await db.query(`SELECT * FROM services WHERE id=$1`, [id])

    if (service.rowCount === 0) {
      return res.status(404).send({ message: 'Serviço não existe!' })
    }

    if (service.rows[0].user_id !== user_id)
      return res
        .status(401)
        .send({ message: 'Você só pode deletar os itens criados por você!' })

    await db.query(`DELETE FROM services WHERE id=$1`, [id])
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
