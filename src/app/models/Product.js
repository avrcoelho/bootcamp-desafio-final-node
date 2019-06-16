const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    types: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Type'
        },
        sizes: [
          {
            size: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Size'
            },
            price: {
              type: Number,
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)
