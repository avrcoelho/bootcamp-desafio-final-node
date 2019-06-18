const express = require('express')
const validate = require('express-validation')
// pegar os erros que acontecem nas promises e enviar para dentro do exception handler
// envolva as chamadas de controler com o hendleh
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

// sizes
routes.post(
  '/types/:id/sizes',
  validate(validators.Size),
  handle(controllers.SizeController.store)
)
// types
routes.post(
  '/products/:id/types',
  validate(validators.Type),
  handle(controllers.TypeController.store)
)

// Products
routes.get('/products', handle(controllers.ProductController.index))
routes.get('/products/:id', handle(controllers.ProductController.show))
routes.post(
  '/products',
  validate(validators.Product),
  handle(controllers.ProductController.store)
)
routes.put(
  '/products',
  validate(validators.Product),
  handle(controllers.ProductController.update)
)
routes.delete('/products', handle(controllers.ProductController.destroy))

module.exports = routes
