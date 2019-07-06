const Order = require('../models/Order')

class OrderController {
  async index (req, res) {
    let user = {}

    // verifica se é administrador
    if (req.userType === 2) {
      user = { customer: req.userId }
    }

    const orders = await Order.find(user)
      .sort('-createdAt')
      .populate('customer', 'name')
      .populate('items.product', 'name')
      .populate('items.type', 'type image')
      .populate('items.size', 'size')

    return res.json(orders)
  }

  async store (req, res) {
    let order = await Order.create({ ...req.body, customer: req.userId })

    order = await Order.findById(order._id)
      .populate('customer', 'name')
      .populate('items.product', 'name')
      .populate('items.type', 'type image')
      .populate('items.size', 'size')

    req.io.sockets.in('orders').emit('order', order)

    return res.json(order)
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
