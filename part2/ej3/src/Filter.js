export const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      Filter by name:
      <input value={value} onChange={handleFilterChange} />
    </div>
  );
};
