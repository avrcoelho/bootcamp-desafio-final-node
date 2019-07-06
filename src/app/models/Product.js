const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deliveryTime: {
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
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

ProductSchema.virtual('url').get(function () {
  const url = process.env.URL || 'http://localhost:3333'

  return encodeURIComponent(this.iamge)
    ? `${url}/images/${encodeURIComponent(this.image)}`
    : null
})

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', ProductSchema)
