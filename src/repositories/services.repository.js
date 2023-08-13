import { db } from '../database/db.connection.js'

export function categoryCheckDB(category_id) {
  return db.query('SELECT * FROM categories WHERE category_id = $1', [
    category_id
  ])
}

export function createServiceDB(
  user_id,
  title,
  description,
  category_id,
  photo_url,
  price,
  is_active
) {
  return db.query(
    `INSERT INTO services (user_id, title, description, category_id, photo_url, price, is_active) 
     VALUES ($1, $2, $3, $4, $5, $6, $7 )`,
    [user_id, title, description, category_id, photo_url, price, is_active]
  )
}

export function updateService(updates, id) {
  return db.query(
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
}

export function getServicesAndCategory() {
  return db.query(`
  SELECT id, title, description, photo_url, price, categories.name AS category
  FROM services 
  INNER JOIN categories ON services.category_id = categories.category_id`)
}

export function findService(id) {
  return db.query(`SELECT * FROM services WHERE id=$1`, [id])
}

export function deleteService(id) {
  return db.query(`DELETE FROM services WHERE id=$1`, [id])
}
