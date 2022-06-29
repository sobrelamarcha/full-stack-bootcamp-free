import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Countries } from "./Countries";

const App = () => {
  const countriesData = [];

  // usamos un efecto y que sólo se llame una vez después del render del componente
  useEffect(() => {
    // console.log("effect");

    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setCountries(data);
      });
  }, []);

  const [countryToShow, setCountryToShow] = useState("");
  const [countries, setCountries] = useState(countriesData);
  const [newFilter, setNewFilter] = useState("");

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);
    // limpiamos por si hemos hecho clic en un pais
    setCountryToShow("");
  };

  const handleCountryButton = (country) => {
    // console.log(country);
    setCountryToShow(country);
  };

  return (
    <div>
      <h1>Countries</h1>

      <div>
        Filter by name:
        <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <Countries
        countries={countries}
        filter={newFilter}
        handleCountryButton={handleCountryButton}
        countryToShow={countryToShow}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
