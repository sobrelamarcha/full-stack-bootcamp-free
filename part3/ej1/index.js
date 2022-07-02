const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    phone: "39-44-5323523",
    id: 3,
  },
  {
    name: "test",
    phone: "1111111",
    id: 4,
  },
  {
    name: "test2",
    phone: "33333",
    id: 5,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/info", (request, response) => {
  const totalPersons = persons.length;
  const fechaHoy = new Date();
  response.send(
    `Phonebook has info for ${totalPersons} people <br>${fechaHoy}`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const idPerson = Number(request.params.id);
  const person = persons.find((p) => p.id === idPerson);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
