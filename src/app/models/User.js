const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    default: 2
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

// pre serve para ser executa antes de uma ação
// vai ser executado antes de todo save
UserSchema.pre('save', async function (next) {
  // se não houve modificação ele continua
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

// declara os metodos que cada instacia do usuario tenha
UserSchema.methods = {
  // comparar se a senha é igual com a que esta cadastrada no banco
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

// esse metodo vai ser estatico porque ele não vai ser disparado de uma instacia
// ele vai ser disarado através do model user, não de uma isntacia do
// statics não possui acesso ao this
UserSchema.statics = {
  generateToken ({ id, type }) {
    // GoNode03: é a security para que esse token não seja usado em outro lugar
    return jwt.sign(
      {
        id,
        type
      },
      authConfig.secret,
      {
        // tempo que o token vai ser valiudo em milesegundos
        expiresIn: authConfig.ttl
      }
    )
  }
}

module.exports = mongoose.model('User', UserSchema)
