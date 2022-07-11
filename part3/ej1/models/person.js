const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  phone: { type: String, minlength: 8, required: true }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
