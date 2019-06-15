const Product = require('../models/Product')

class ProductController {
  async index (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const products = await Product.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20
      }
    )

    return res.json(products)
  }

  async store (req, res) {
    const { product } = req.body

    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    if (await Product.findOne({ product })) {
      return res.status(400).json({
        error: 'product already exists'
      })
    }

    const data = await Product.create(req.body)

    return res.json(data)
  }

  async show (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const product = await Product.findById(req.params.id)

    return res.json({
      product
    })
  }

  async update (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      // depois de dar o update ele vai atualizar a infomrção na const
      // ad coma snovas informações
      new: true
    })

    return res.json(product)
  }

  async destroy (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    await Product.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new ProductController()
