import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CountriesList } from "./CountriesList";
import { CountryDetails } from "./CountryDetails";
import { Filter } from "./Filter";
import { WeatherInfo } from "./WeatherInfo";
// import { exampleWeatherData } from "./services/exampleWeatherData";

const App = () => {
  const countriesData = [];

  const [countryToShow, setCountryToShow] = useState({});
  const [weatherToShow, setWeatherToShow] = useState({});
  const [countries, setCountries] = useState(countriesData);
  const [newFilter, setNewFilter] = useState("");

  // api key de https://weatherstack.com/ guardada en un .env (ignorado en .gitignore)
  const api_key = process.env.REACT_APP_API_KEY;
  // console.log(api_key);

  // usamos un efecto y que sólo se llame una vez después del render del componente
  useEffect(() => {
    console.log("effect countries");

    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setCountries(data);
      });
  }, []);

  const mostrarDetalles =
    countryToShow !== undefined &&
    Object.keys(countryToShow).length !== 0 &&
    weatherToShow !== undefined &&
    Object.keys(weatherToShow).length !== 0;

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);

    if (mostrarDetalles) {
      setCountryToShow({});
    }
  };

  // Para mostrar los detalles
  let details = "";
  let weatherInfo = "";
  const handleDetails = (country) => {
    console.log("palabro", country.name, mostrarDetalles);
    showDetails(country);
  };

  const showDetails = (country) => {
    console.log("haciendo ajax de verdad:");
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`;
    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("datos del tiempo:", data);
        setCountryToShow(country);
        setWeatherToShow(data);
      });

    // simulando llamada asíncrona
    // setTimeout(function () {
    //   console.log("simulando ajax:");

    //   const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`;
    //   console.log(url);

    //   setCountryToShow(country);
    //   setWeatherToShow(exampleWeatherData);
    // }, 2000);
  };

  if (mostrarDetalles) {
    console.log("mostrando detalles...");
    // mostrar los detalles del pais y el tiempo
    details = <CountryDetails selectedCountry={countryToShow} />;
    weatherInfo = <WeatherInfo data={weatherToShow} />;
  }

  // para mostrar el listado de paises
  const MIN_COUNTRIES_TO_SHOW = 10;
  const filteredCountries = countries.filter((c) => {
    return c.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1;
  });

  // cuando al filtrar solo queda un pais, mostrar detalles
  if (filteredCountries.length === 1 && !mostrarDetalles) {
    showDetails(filteredCountries[0]);
  }

  console.log("que paso:", countryToShow);

  return (
    <div>
      <h1>Countries</h1>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <CountriesList
        filteredCountries={filteredCountries}
        handleDetails={handleDetails}
        minCountriesToShow={MIN_COUNTRIES_TO_SHOW}
        countryToShow={countryToShow}
      />
      {details}
      {weatherInfo}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
