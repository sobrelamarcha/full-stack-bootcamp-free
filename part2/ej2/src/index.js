import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { Filter } from "./Filter";
import { compruebaSiEstaVacio, findPerson, maxId } from "./services/helpers";
import {
  createPerson,
  getAllPersons,
  borrarPerson,
  updatePerson,
} from "./services/persons";
import "./styles.css";
import { Notification } from "./Notification";

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

    // recuperando personas del json-server
    getAllPersons()
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPersons(data);
      })
      .catch((error) => {
        showNotification(`Hubo un error: ${error}`, "error");
      });
  }, []);

  const [persons, setPersons] = useState(personsData);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({});

  const showNotification = (text, type) => {
    setNotification({
      text: text,
      type: type,
    });
    setTimeout(() => {
      setNotification([]);
    }, 4000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    // validar entrada
    if (compruebaSiEstaVacio(newName)) {
      alert("Debes escribir algún nombre válido");
      return;
    }
    const foundPerson = findPerson(persons, newName);
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added on phonebook, replace the old number with a new one?`
        )
      ) {
        // hacer el put
        const postDataNewPerson = {
          name: foundPerson.name,
          phone: newPhone,
          id: foundPerson.id,
        };
        updatePerson(foundPerson.id, postDataNewPerson)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            // una vez se ha hecho el put, ahora en el callback actualizar en la lista
            const newPersons = persons.map((p) => {
              if (p.name === newName) {
                return { name: p.name, phone: newPhone, id: p.id };
              } else {
                return p;
              }
            });

            setPersons(newPersons);
            showNotification(
              `Se modificó el teléfono de ${foundPerson.name} correctamente`,
              "success"
            );

            clearForm();
          })
          .catch((error) => {
            showNotification(`Hubo un error: ${error}`, "error");
          });

        return;
      } else {
        return;
      }
    }

    // añadir nombre y teléfono
    const nuevaId = maxId(persons) + 1;
    const nuevoObj = { id: nuevaId, name: newName, phone: newPhone };
    setPersons(persons.concat(nuevoObj));

    // creando persona en el json-server
    createPerson(nuevoObj)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data)
      })
      .catch((error) => {
        showNotification(`Hubo un error: ${error}`, "error");
      });

    showNotification(`Se añadió a ${nuevoObj.name} correctamente`, "success");

    clearForm();
  };

  const clearForm = () => {
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

  const handleDeletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      // borrando persona del json-server
      borrarPerson(person.id)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          // quitamos a la persona del array

          const finalPersons = persons.filter((p) => {
            return p.id !== person.id;
          });
          setPersons(finalPersons);
        })
        .catch((error) => {
          showNotification(`Hubo un error: ${error}`, "error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <Notification text={notification.text} type={notification.type} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Persons
        persons={persons}
        filter={newFilter}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
