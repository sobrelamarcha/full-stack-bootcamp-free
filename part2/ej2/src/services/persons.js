const baseUrl = "http://localhost:3001/persons"; // enviar datos por POST al servidor json-server

export const getAllPersons = () => {
  return fetch(baseUrl);
};

export const borrarPerson = (id) => {
  console.log(`borrando definitivamente al id ${id}`);

  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

export const createPerson = (nuevoObj) => {
  fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoObj),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
