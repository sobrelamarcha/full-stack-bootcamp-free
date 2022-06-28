export const validatePerson = (persons, newName) => {
  if (compruebaSiExiste(persons, newName)) {
    alert(`${newName} ya existe, no voy a añadirlo`);
    return false;
  }
  if (compruebaSiEstaVacio(newName)) {
    alert("Debes escribir algún nombre válido");
    return false;
  }
  return true;
};

const compruebaSiExiste = (persons, newName) => {
  // comprobar si existe
  return persons.find((person) => person.name === newName);
};

const compruebaSiEstaVacio = (newName) => {
  // comprobar que el name no está vacío
  return newName.trim() === "";
};
