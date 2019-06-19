const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const OrderSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    observation: {
      type: String
    },
    status: {
      type: Number,
      default: 0
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Type'
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Size'
        }
      }
    ]
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

OrderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', OrderSchema)
