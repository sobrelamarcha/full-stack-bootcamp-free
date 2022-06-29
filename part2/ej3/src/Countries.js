import { CountryDetails } from "./CountryDetails";

export const Countries = ({
  countries,
  filter,
  handleCountryButton,
  countryToShow,
}) => {
  const MAX_COUNTRIES_TO_SHOW = 10;
  const filteredCountries = countries.filter((c) => {
    return c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  });
  const countriesList = filteredCountries.map((c) => {
    return (
      <li key={c.name}>
        {c.name}
        <button onClick={() => handleCountryButton(c.name)}>show</button>
      </li>
    );
  });
  // Si hay menos de los paises máximos a mostrarse imprime una frase para que el usuario use un filtro más restringido
  if (countriesList.length > MAX_COUNTRIES_TO_SHOW) {
    return <p>Too many matches, specify another filter</p>;
  }

  // Mostrar detalles del pais (hay dos casos)
  const countryClickedToShow = countryToShow.trim() !== ""; // caso 1: se hizo clic en un pais
  const countryOneFiltered = filteredCountries.length === 1; // caso 2: quedó un solo pais en el filtrado

  if (countryClickedToShow || countryOneFiltered) {
    // Cuando hace clic en el botón de un pais, mostrar detalles
    let selectedCountry = {};
    if (countryClickedToShow) {
      selectedCountry = filteredCountries.find((c) => {
        return c.name === countryToShow;
      });
    }
    // cuando al filtrar solo queda un pais, mostrar detalles
    if (countryOneFiltered) {
      selectedCountry = filteredCountries[0];
    }
    return <CountryDetails selectedCountry={selectedCountry} />;
  }

  // Por defecto muestra listado
  return (
    <>
      <ul>{countriesList}</ul>
    </>
  );
};
