export const PersonForm = ({
  addPerson,
  newName,
  newPhone,
  handlePersonChange,
  handlePhoneChange,
}) => {
  return (
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
  );
};
