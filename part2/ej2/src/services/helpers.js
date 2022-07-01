export const findPerson = (persons, newName) => {
  const found = persons.filter((person) => person.name === newName);
  return found[0];
};

export const compruebaSiEstaVacio = (newName) => {
  // comprobar que el name no está vacío
  return newName.trim() === "";
};

export const maxId = (arrayOfObjects) => {
  return Math.max(...arrayOfObjects.map((object) => object.id));
};
