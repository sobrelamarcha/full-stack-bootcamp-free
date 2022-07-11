const personsRouter = require('express').Router()
const Person = require('../models/person')
const logger = require('../utils/logger')

personsRouter.get('/', (request, response) => {
  logger.info('getting all persons')
  Person.find({}).then((persons) => {
    response.json(persons)
    logger.info('prueba')
  })
})

personsRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  logger.info(`searching person with id: ${id}`)
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result)
      }
    })
    .catch((error) => {
      next(error)
    })
})

personsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const person = request.body

  const newPerson = {
    name: person.name,
    phone: person.phone
  }

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((result) => {
      return response.json(result)
    })
    .catch((error) => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (!body.name) {
    return response.status(400).json({ error: 'name content missing' })
  }
  if (!body.phone) {
    return response.status(400).json({ error: 'phone content missing' })
  }

  const person = new Person({
    name: body.name,
    phone: body.phone
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson)
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
