const Size = require('../models/Size')
const Type = require('../models/Type')

class SizeController {
  async store (req, res) {
    // verifica se é administrador
    if (req.userType !== 1) {
      return res.status(403).json({ error: 'User not permission' })
    }

    const type = await Type.findById(req.params.id)
    const dataSize = await Size.create({ ...req.body,
      image: req.file.key })

    type.sizes.push(dataSize._id)

    await type.save()

    return res.json(dataSize)
  }
}

module.exports = new SizeController()
