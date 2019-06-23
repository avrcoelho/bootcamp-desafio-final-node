const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size'
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

TypeSchema.virtual('url').get(function () {
  const url = process.env.URL || 'http://localhost:3333'

  return encodeURIComponent(this.iamge)
    ? `${url}/images/${encodeURIComponent(this.image)}`
    : null
})

module.exports = mongoose.model('Type', TypeSchema)
