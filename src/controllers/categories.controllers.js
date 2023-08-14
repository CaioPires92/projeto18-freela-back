import { getCategoriesDB } from '../repositories/categories.repository.js'

export async function getCategories(req, res) {
  try {
    const category = await getCategoriesDB()
    if (category.rowCount === 0) {
      return res.status(401).send({ message: 'Nenhuma categoria cadastrada' })
    }

    res.status(200).send(category.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
