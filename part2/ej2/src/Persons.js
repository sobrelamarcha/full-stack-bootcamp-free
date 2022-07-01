export const Persons = ({ persons, filter, handleDeletePerson }) => {
  const personsList = persons

    .filter((person) => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    })

    .map((person) => {
      return (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.phone}</td>
          <td>
            <button onClick={() => handleDeletePerson(person)}>delete</button>
          </td>
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
