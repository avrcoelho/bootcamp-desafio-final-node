const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().required(),
    type: [
      {
        code: Joi.string().required(),
        size: [
          {
            code: Joi.string().required(),
            price: Joi.number().required()
          }
        ]
      }
    ]
  }
}
