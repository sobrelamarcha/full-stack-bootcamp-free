const generalRouter = require('express').Router()
const Person = require('../models/person')

generalRouter.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

generalRouter.get('/total', (request, response) => {
  const fechaHoy = new Date()
  Person.find({}).then((persons) => {
    const totalPersons = persons.length
    response.send(
        `Phonebook has info for ${totalPersons} people <br>${fechaHoy}`
    )
  })
})

module.exports = generalRouter
