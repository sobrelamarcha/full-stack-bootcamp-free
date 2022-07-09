require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("build"));

morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  console.log(`searching person with id: ${id}`);
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send({ error: "malformed id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const idPerson = Number(request.params.id);
  persons = persons.filter((p) => {
    return idPerson !== p.id;
  });
  response.status(204).end();
  // response.json({ success: `person with id ${idPerson} deleted successfully` });
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
  if (!body.name) {
    return response.status(400).json({ error: "name content missing" });
  }
  if (!body.phone) {
    return response.status(400).json({ error: "phone content missing" });
  }
  // comprobar si ya existe el nombre (deshabilitado temporalmente)
  // if (
  //   persons.find((p) => {
  //     return p.name === body.name;
  //   })
  // ) {
  //   return response
  //     .status(400)
  //     .json({ error: "the name already exists in phonebook" });
  // }

  // const person = {
  //   name: body.name,
  //   phone: body.phone,
  //   id: maxId(persons) + 1,
  // };

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

//el siguiente middleware se coloca después de todas las rutas para que se ejecute si no ha entrado en ninguna de las anteriores
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
