const Joi = require('joi')

module.exports = {
  body: {
    size: Joi.string().required()
  }
}
