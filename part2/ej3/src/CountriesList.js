export const CountriesList = ({ countries, filter, handleDetails }) => {
  const MAX_COUNTRIES_TO_SHOW = 10;
  const filteredCountries = countries.filter((c) => {
    return c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  });
  const countriesList = filteredCountries.map((c) => {
    return (
      <li key={c.name}>
        {c.name}
        <button onClick={() => handleDetails(c)}>show</button>
      </li>
    );
  });
  // Si hay menos de los paises máximos a mostrarse imprime una frase para que el usuario use un filtro más restringido
  if (countriesList.length > MAX_COUNTRIES_TO_SHOW) {
    return <p>Too many matches, specify another filter</p>;
  }

  // cuando al filtrar solo queda un pais, mostrar detalles
  if (filteredCountries.length === 1) {
    // si no llamo con este timeout da un warning:
    // Warning: Cannot update a component (`App`) while rendering a different component (`CountriesList`)
    setTimeout(function () {
      handleDetails(filteredCountries[0]);
    }, 100);
    return;
  }

  // Por defecto muestra listado
  return (
    <>
      <ul>{countriesList}</ul>
    </>
  );
};
