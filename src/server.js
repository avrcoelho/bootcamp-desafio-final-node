// variaveis de ambiente
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const http = require('http')
const io = require('socket.io')
const path = require('path')
const mongoose = require('mongoose')
const validate = require('express-validation')
const Youch = require('youch')
const Sentry = require('@sentry/node')

const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()

    this.server = http.Server(this.express)
    this.io = io(this.server)

    // verifica se é dev ou prod
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.io.on('connection', socket => {
      socket.on('connectOrder', order => {
        socket.join(order)
      })
    })

    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(cors())
    this.express.use(
      '/images',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    )

    this.express.use((req, res, next) => {
      req.io = this.io

      return next()
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      // verifica se o erro é de uma instacia de validate.ValidationError
      // se é error dos validates
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)

        return res.json(await youch.toJSON())
      }

      // se existir um status no erro, ele vai ser retornado, senão, envia status 500
      return res.status(err.status || 500).json({
        error: 'Internal server error'
      })
    })
  }
}

// só vai precisar passar o express para ser usado em outros arquivos
module.exports = new App().server
