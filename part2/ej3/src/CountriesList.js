export const CountriesList = ({
  filteredCountries,
  handleDetails,
  minCountriesToShow,
  countryToShow,
}) => {
  const countriesList = filteredCountries.map((c) => {
    let detailsButton = "";
    if (c !== countryToShow) {
      detailsButton = <button onClick={() => handleDetails(c)}>show</button>;
    }
    return (
      <li key={c.name}>
        {c.name}
        {detailsButton}
      </li>
    );
  });

  //Si hay menos de los paises máximos a mostrarse imprime una frase para que el usuario use un filtro más restringido
  if (countriesList.length > minCountriesToShow) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      <ul>{countriesList}</ul>
    </>
  );
};
