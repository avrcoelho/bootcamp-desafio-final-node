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

routes.get('/sizes', handle(controllers.SizeController.index))
routes.get('/sizes/:id', handle(controllers.SizeController.show))
routes.post(
  '/sizes',
  validate(validators.Size),
  handle(controllers.SizeController.store)
)
routes.put(
  '/sizes',
  validate(validators.Size),
  handle(controllers.SizeController.update)
)
routes.delete('/sizes', handle(controllers.SizeController.destroy))

module.exports = routes
