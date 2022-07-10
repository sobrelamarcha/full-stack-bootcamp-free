require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

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

app.get("/about", (request, response) => {
  const fechaHoy = new Date();
  response.send(`This is the about page<br>${fechaHoy}`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(`searching person with id: ${id}`);
  Person.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;

  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const maxId = (array) => {
  const max = array.length > 0 ? Math.max(...array.map((p) => p.id)) : 0;
  // console.log(`y el max id es: ${max}`);
  return max;
};

app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  const person = request.body;

  const newPerson = {
    name: person.name,
    phone: person.phone,
  };

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((result) => {
      return response.json(result);
    })
    .catch((error) => next(error));
});

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

app.use(notFound);

app.use(handleErrors);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
