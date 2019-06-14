const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const SizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true
    }
  },
  {
    // cria o created e o updated em cada registro da tabela
    timestamps: true
  }
)

SizeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Size', SizeSchema)
