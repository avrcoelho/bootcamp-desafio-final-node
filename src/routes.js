const express = require('express')
const validate = require('express-validation')
const multer = require('multer')
const multerConfig = require('./config/multer')
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

routes.get(
  '/sessions',
  authMiddleware,
  handle(controllers.SessionController.show)
)

// sizes
routes.post(
  '/types/:id/sizes',
  authMiddleware,
  multer(multerConfig).single('image'),
  validate(validators.Size),
  handle(controllers.SizeController.store)
)
// types
routes.post(
  '/products/:id/types',
  authMiddleware,
  multer(multerConfig).single('image'),
  validate(validators.Type),
  handle(controllers.TypeController.store)
)

// Products
routes.get(
  '/products',
  authMiddleware,
  handle(controllers.ProductController.index)
)
routes.get(
  '/products/:id',
  authMiddleware,
  handle(controllers.ProductController.show)
)
routes.post(
  '/products',
  authMiddleware,
  multer(multerConfig).single('image'),
  validate(validators.Product),
  handle(controllers.ProductController.store)
)
routes.put(
  '/products',
  authMiddleware,
  validate(validators.Product),
  handle(controllers.ProductController.update)
)

// Products
routes.get('/orders', authMiddleware, handle(controllers.OrderController.index))
routes.post(
  '/orders',
  authMiddleware,
  handle(controllers.OrderController.store)
)
routes.put(
  '/orders/:id',
  authMiddleware,
  handle(controllers.OrderController.update)
)

module.exports = routes
