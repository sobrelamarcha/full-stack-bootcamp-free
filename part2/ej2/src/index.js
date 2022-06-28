import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Numbers = ({ persons, filter }) => {
  const personsList = persons

    .filter((person) => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    })

    .map((person) => {
      return (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.phone}</td>
        </tr>
      );
    });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{personsList}</tbody>
      </table>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", phone: "111" },
    { id: 2, name: "Pepe Domingo", phone: "222" },
    { id: 3, name: "Juan Pedro", phone: "333" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    // comprobar si existe
    const existe = persons.find((person) => person.name === newName);
    if (existe) {
      alert(`${newName} ya existe, no voy a añadirlo`);
      return;
    }

    // comprobar que el name no está vacío
    if (newName.trim() === "") {
      alert("Debes escribir algún nombre válido");
      return;
    }

    // añadir nombre y teléfono
    const nuevoObj = { id: persons.length + 1, name: newName, phone: newPhone };
    setPersons(persons.concat(nuevoObj));
    console.log("añadido");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    const namesFiltered = persons.filter((p) => {
      return p.name.indexOf(newFilter) !== -1;
    });
    console.log(namesFiltered);
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
          Phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        Filter shown with:{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <div>
        <Numbers persons={persons} filter={newFilter} />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
