import React, { useState } from "react";
import "./App.css";
import WeatherInfoToday from "./components/components/weather-info-today.js";
import WeatherSearch from "./components/components/weather-search.js";
import CountryList from "./components/components/fetch-countries.js";

function App() {
  const [country, setCountry] = useState(""); 

  return (
    <div>
      <div id="header">
        <h1>Witaj w aplikacji od pogody</h1>
      </div>

      <div className="App">
        <WeatherSearch onSearch={setCountry} />
        <WeatherInfoToday name={country } /> 
      </div>

      <div>
        <CountryList onSubmit={setCountry} />
      </div>
    </div>
  );
}

export default App;
