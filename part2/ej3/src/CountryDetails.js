export const CountryDetails = ({ selectedCountry }) => {
  const countryLanguages = selectedCountry.languages.map((c) => {
    return <li key={c.name}>{c.name}</li>;
  });

  return (
    <div>
      <p>Name: {selectedCountry.name}</p>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Population: {selectedCountry.population}</p>
      <h3>Languages:</h3>
      <ul>{countryLanguages}</ul>
      <h3>Flag:</h3>
      <p>
        <img alt="bandera" src={selectedCountry.flags.png} />
      </p>
    </div>
  );
};
