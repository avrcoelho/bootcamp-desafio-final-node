const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      email
    })

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({
        error: 'Invalid password'
      })
    }

    return res.json({
      name: user.name,
      type: user.type,
      token: User.generateToken(user)
    })
  }

  async show (req, res) {
    const id = req.userId

    const user = await User.findById(id)

    return res.json({
      name: user.name,
      type: user.type,
      token: User.generateToken(user)
    })
  }
}

module.exports = new SessionController()
