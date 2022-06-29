import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const CountryDetails = ({ selectedCountry, countryLanguages }) => {
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

const CountryDetailsClicked = ({ countryToShow, filteredCountries }) => {
  const selectedCountry = filteredCountries.find((c) => {
    return c.name === countryToShow;
  });
  const countryLanguages = selectedCountry.languages.map((c) => {
    return <li key={c.name}>{c.name}</li>;
  });

  return (
    <CountryDetails
      selectedCountry={selectedCountry}
      countryLanguages={countryLanguages}
    />
  );
};

const CountryDetailsOneFiltered = ({ filteredCountries }) => {
  const selectedCountry = filteredCountries[0];
  const countryLanguages = selectedCountry.languages.map((c) => {
    return <li key={c.name}>{c.name}</li>;
  });

  return (
    <CountryDetails
      selectedCountry={selectedCountry}
      countryLanguages={countryLanguages}
    />
  );
};

const Countries = ({
  countries,
  filter,
  handleCountryButton,
  countryToShow,
}) => {
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

  if (countryToShow.trim() !== "") {
    return (
      <CountryDetailsClicked
        countryToShow={countryToShow}
        filteredCountries={filteredCountries}
      />
    );
  }

  if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length === 1) {
    return <CountryDetailsOneFiltered filteredCountries={filteredCountries} />;
  }

  return (
    <>
      <ul>{countriesList}</ul>
    </>
  );
};

const App = () => {
  const countriesData = [];

  // usamos un efecto para que solo se llame una vez

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

      {/* <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} /> */}
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
