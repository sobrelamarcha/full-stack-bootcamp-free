const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bp = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const logger = require('./utils/logger')
const personsRouter = require('./controllers/persons')
const generalRouter = require('./controllers/general')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

const url = config.MONGODB_URI
logger.info(`connecting to ${url}`)

mongoose
  .connect(url)
  .then((result) => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use('/api/persons', personsRouter)
app.use('/api/info', generalRouter)

app.use(notFound)
app.use(handleErrors)

module.exports = app
