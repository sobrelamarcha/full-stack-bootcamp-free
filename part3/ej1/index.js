const express = require("express");
const app = express();
const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

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

app.delete("/api/persons/:id", (request, response) => {
  const idPerson = Number(request.params.id);
  persons = persons.filter((p) => {
    return idPerson !== p.id;
  });
  response.status(204).end();
});

const maxId = (array) => {
  const max = array.length > 0 ? Math.max(...array.map((p) => p.id)) : 0;
  // console.log(`y el max id es: ${max}`);
  return max;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "content missing" });
  }
  const person = {
    name: body.name,
    phone: body.phone,
    id: maxId(persons) + 1,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
