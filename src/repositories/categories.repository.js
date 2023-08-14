import { db } from '../database/db.connection.js'

export function getCategoriesDB() {
  return db.query('SELECT * FROM categories')
}
