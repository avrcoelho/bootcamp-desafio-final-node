const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
      }
    ]
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)
