const mongoose = require('mongoose')

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;
const url = `mongodb+srv://proj1mon:${password}@cluster0.kmpilku.mongodb.net/agenda?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

const createNewPerson = (name, phone) => {
  // Crear una nueva persona
  const person = new Person({
    name,
    phone
  })

  person.save().then((result) => {
    console.log(`added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
    console.log('cerrada la conexión')
  })
}

const showAllPersons = () => {
  // Listar todas las personas
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
    console.log('cerrada la conexión')
  })
}

const numArgs = process.argv.length

if (numArgs < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

if (numArgs === 5) {
  const name = process.argv[3]
  const phone = process.argv[4]
  //   console.log(name, phone);
  createNewPerson(name, phone)
} else if (numArgs === 3) {
  showAllPersons()
} else {
  console.log('Bad number of arguments')
  process.exit(1)
}
