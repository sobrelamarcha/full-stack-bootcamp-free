import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { Filter } from "./Filter";
import { validatePerson } from "./services/helpers";

const App = () => {
  // const personsData = [
  //   { id: 1, name: "Arto Hellas", phone: "111" },
  //   { id: 2, name: "Pepe Domingo", phone: "222" },
  //   { id: 3, name: "Juan Pedro", phone: "333" },
  // ];
  const personsData = [];

  // usamos un efecto para que sólo se llame una vez

  useEffect(() => {
    console.log("effect");

    fetch("http://localhost:3001/persons")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPersons(data);
      });
  }, []);

  const [persons, setPersons] = useState(personsData);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    // validar entrada
    if (!validatePerson(persons, newName)) {
      // alert("abortando inserción");
      return false;
    }

    // añadir nombre y teléfono
    const nuevoObj = { id: persons.length + 1, name: newName, phone: newPhone };
    setPersons(persons.concat(nuevoObj));

    // vaciar inputs
    setNewName("");
    setNewPhone("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
