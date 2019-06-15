const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    }
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

module.exports = mongoose.model('Type', TypeSchema)
