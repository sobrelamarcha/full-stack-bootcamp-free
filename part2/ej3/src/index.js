import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CountriesList } from "./CountriesList";
import { CountryDetails } from "./CountryDetails";
import { Filter } from "./Filter";
import { WeatherInfo } from "./WeatherInfo";
import { exampleWeatherData } from "./services/exampleWeatherData";

const App = () => {
  const countriesData = [];

  const [countryToShow, setCountryToShow] = useState({});
  const [countries, setCountries] = useState(countriesData);
  const [newFilter, setNewFilter] = useState("");

  // api key de https://weatherstack.com/ guardada en un .env (ignorado en .gitignore)
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);

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
    countryToShow !== undefined && Object.keys(countryToShow).length !== 0;

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
    console.log("palabro");
    setCountryToShow(country);
  };

  if (mostrarDetalles) {
    // mostrar los detalles del pais
    details = <CountryDetails selectedCountry={countryToShow} />;

    // mostrar el tiempo

    console.log("y el tiempo meteorológico es", countryToShow.name);
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryToShow.name}`;
    console.log(url);

    // setWeather(exampleWeatherData);

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setWeather(data);
    //   });

    weatherInfo = <WeatherInfo data={exampleWeatherData} />;
  }

  console.log("que paso");

  return (
    <div>
      <h1>Countries</h1>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <CountriesList
        countries={countries}
        filter={newFilter}
        handleDetails={handleDetails}
      />
      {details}
      {weatherInfo}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
