const Order = require('../models/Order')

class OrderController {
  async index (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const products = await Order.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        populate: [
          {
            path: 'customer',
            select: ['name']
          },
          {
            path: 'items.product',
            select: ['name']
          },
          {
            path: 'items.type',
            select: ['type']
          },
          {
            path: 'items.size',
            select: ['size']
          }
        ]
      }
    )

    return res.json(products)
  }

  async store (req, res) {
    const data = await Order.create({ ...req.body, customer: req.userId })

    return res.json(data)
  }

  async update (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const product = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        // depois de dar o update ele vai atualizar a infomrção na const
        // ad coma snovas informações
        new: true
      }
    )

    return res.json(product)
  }
}

module.exports = new OrderController()
