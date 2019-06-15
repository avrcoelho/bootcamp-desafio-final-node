const Type = require('../models/Type')

class TypeController {
  async index (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const types = await Type.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20
      }
    )

    return res.json(types)
  }

  async store (req, res) {
    const { type } = req.body

    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    if (await Type.findOne({ type })) {
      return res.status(400).json({
        error: 'type already exists'
      })
    }

    const data = await Type.create(req.body)

    return res.json(data)
  }

  async show (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const type = await Type.findById(req.params.id)

    return res.json({
      type
    })
  }

  async update (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const type = await Type.findByIdAndUpdate(req.params.id, req.body, {
      // depois de dar o update ele vai atualizar a infomrção na const
      // ad coma snovas informações
      new: true
    })

    return res.json(type)
  }

  async destroy (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    await Type.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new TypeController()
