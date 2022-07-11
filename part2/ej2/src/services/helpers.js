export const findPerson = (persons, newName) => {
  const found = persons.find((person) => person.name === newName)
  console.log(found)
  return found
}

export const compruebaSiEstaVacio = (newName) => {
  // comprobar que el name no está vacío
  return newName.trim() === ''
}

export const maxId = (arrayOfObjects) => {
  return Math.max(...arrayOfObjects.map((object) => object.id))
}
