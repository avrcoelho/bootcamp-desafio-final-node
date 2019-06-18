const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    sizes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size'
    }]
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

module.exports = mongoose.model('Type', TypeSchema)
