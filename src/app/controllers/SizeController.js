const Size = require('../models/Size')

class SizeController {
  async index (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const sizes = await Size.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20
      }
    )

    return res.json(sizes)
  }

  async store (req, res) {
    const { size } = req.body

    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    if (await Size.findOne({ size })) {
      return res.status(400).json({
        error: 'size already exists'
      })
    }

    const data = await Size.create(req.body)

    return res.json(data)
  }

  async show (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const size = await Size.findById(req.params.id)

    return res.json({
      size
    })
  }

  async update (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const size = await Size.findByIdAndUpdate(req.params.id, req.body, {
      // depois de dar o update ele vai atualizar a infomrção na const
      // ad coma snovas informações
      new: true
    })

    return res.json(size)
  }

  async destroy (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    await Size.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new SizeController()
