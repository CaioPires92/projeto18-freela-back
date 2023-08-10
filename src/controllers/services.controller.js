import {
  categoryCheckDB,
  createServiceDB,
  deleteService,
  findService,
  getServicesAndCategory,
  updateService
} from '../repositories/services.repository.js'

export async function createServices(req, res) {
  const { user_id } = res.locals
  const { title, description, category_id, photo_url, price, is_active } =
    req.body

  try {
    const categoryCheck = await categoryCheckDB(category_id)

    if (categoryCheck.rowCount === 0) {
      return res.status(400).json({ message: 'Categoria inválida.' })
    }

    const service = await createServiceDB(
      user_id,
      title,
      description,
      category_id,
      photo_url,
      price,
      is_active
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
    const service = await findService(id)

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

    await updateService(updates, id)

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getServices(req, res) {
  try {
    const service = await getServicesAndCategory()
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
    const service = await findService(id)

    if (service.rowCount === 0) {
      return res.status(404).send({ message: 'Serviço não existe!' })
    }

    if (service.rows[0].user_id !== user_id)
      return res
        .status(401)
        .send({ message: 'Você só pode deletar os itens criados por você!' })

    await deleteService(id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
