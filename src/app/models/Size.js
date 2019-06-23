const mongoose = require('mongoose')

const SizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
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

SizeSchema.virtual('url').get(function () {
  const url = process.env.URL || 'http://localhost:3333'

  return encodeURIComponent(this.iamge)
    ? `${url}/images/${encodeURIComponent(this.image)}`
    : null
})

module.exports = mongoose.model('Size', SizeSchema)
