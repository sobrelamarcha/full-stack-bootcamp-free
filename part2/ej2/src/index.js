import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Numbers = ({ persons }) => {
  const personsList = persons.map((person) => {
    return <p key={person.id}>{person.name}</p>;
  });

  return <>{personsList}</>;
};

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    const nuevoObj = { id: persons.length + 1, name: newName };
    setPersons(persons.concat(nuevoObj));
    console.log("añadido");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
