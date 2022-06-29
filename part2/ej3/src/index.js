import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CountriesList } from "./CountriesList";
import { CountryDetails } from "./CountryDetails";
import { Filter } from "./Filter";

const App = () => {
  const countriesData = [];

  const [countryToShow, setCountryToShow] = useState({});
  const [countries, setCountries] = useState(countriesData);
  const [newFilter, setNewFilter] = useState("");

  // api key de https://weatherstack.com/ guardada en un .env (ignorado en .gitignore)
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  // http://api.weatherstack.com/current
  //   ? access_key = YOUR_ACCESS_KEY
  //   & query = New York

  // usamos un efecto y que sólo se llame una vez después del render del componente
  useEffect(() => {
    // console.log("effect countries");

    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setCountries(data);
      });
  }, []);

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);
    // limpiamos por si hemos hecho clic en un pais
    setCountryToShow({});
  };

  // Para mostrar los detalles
  const handleDetails = (country) => {
    setCountryToShow(country);
  };

  let details = "";
  if (countryToShow !== undefined) {
    if (Object.keys(countryToShow).length !== 0) {
      // console.log("hey");
      details = <CountryDetails selectedCountry={countryToShow} />;
    }
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
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
