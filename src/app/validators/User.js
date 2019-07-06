const Joi = require('joi')

module.exports = {
  // validar o body do ad
  body: {
    fullname: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
  }
}
