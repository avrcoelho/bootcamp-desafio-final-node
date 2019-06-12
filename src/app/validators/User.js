const Joi = require('joi')

module.exports = {
  // validar o body do ad
  body: {
    name: Joi.string().required(),
    postalCode: Joi.number().required(),
    address: Joi.string().required(),
    number: Joi.number().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
  }
}
