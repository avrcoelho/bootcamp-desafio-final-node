const Type = require('../models/Type')
const Product = require('../models/Product')

class TypeController {
  async store (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const product = await Product.findById(req.params.id)
    const dataType = await Type.create({ ...req.body,
      image: req.file.key })

    product.types.push(dataType._id)

    await product.save()

    return res.json(dataType)
  }
}

module.exports = new TypeController()
