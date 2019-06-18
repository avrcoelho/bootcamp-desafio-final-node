const mongoose = require('mongoose')

const SizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

module.exports = mongoose.model('Size', SizeSchema)
