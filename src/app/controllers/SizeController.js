const Size = require('../models/Size')
const Product = require('../models/Product')

class SizeController {
  async store (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const product = await Product.findById(req.params.id)
    const dataSize = await Size.create(req.body)

    product.types
      .find(type => type.type === req.params.type)
      .sizes.push({ size: dataSize._id })

    await product.save()

    return res.json(dataSize)
  }
}

module.exports = new SizeController()
