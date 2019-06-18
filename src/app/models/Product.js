const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    types: [
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

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', ProductSchema)
