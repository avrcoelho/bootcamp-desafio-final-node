const Joi = require('joi')

module.exports = {
  body: {
    size: Joi.string().required(),
    price: Joi.number().required()
  }
}
