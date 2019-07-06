const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const autoIncrement = require('mongoose-sequence')(mongoose)

const OrderSchema = new mongoose.Schema(
  {
    order: {
      type: Number
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
    postalCode: {
      type: Number
    },
    address: {
      type: String
    },
    number: {
      type: Number
    },
    district: {
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
OrderSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'order' })

module.exports = mongoose.model('Order', OrderSchema)
