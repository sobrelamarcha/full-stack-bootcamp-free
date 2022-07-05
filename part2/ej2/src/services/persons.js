//const baseUrl = "http://localhost:3001/persons"; // enviar datos por POST al servidor json-server
// const baseUrl = "http://localhost:3001/api/persons"; // enviar datos por POST a la api creada en NodeJS de la part3 ej1
const baseUrl = "https://tranquil-congaree-79881.herokuapp.com/api/persons"; // enviar datos por POST a la api subida a Heroku

export const getAllPersons = () => {
  return fetch(baseUrl);
};

export const borrarPerson = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

export const createPerson = (nuevoObj) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoObj),
  });
};

export const updatePerson = (id, nuevoObj) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoObj),
  });
};
