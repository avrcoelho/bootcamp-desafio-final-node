const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')
const mongoosePaginate = require('mongoose-paginate')

const OrderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
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
    products: [{
      nmae: {
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
    }]
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

OrderSchema.plugin(AutoIncrement)
OrderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', OrderSchema)
