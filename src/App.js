import React, { useState } from "react";
import "./App.css";
import WeatherInfoToday from "./components/components/weather-info-today.js";
import WeatherSearch from "./components/components/weather-search.js";
import CountryList from "./components/components/fetch-countries.js";
import GeminiChat from "./components/components/chatbot.js";

function App() {
  const [country, setCountry] = useState(""); 

  return (
    <div>
      <div id="header" className="d-flex justify-content-center align-items-center">
        <h1>Witaj w aplikacji pogodowej</h1>
      </div>

      <div className="App">
        <WeatherSearch onSearch={setCountry} />
        <WeatherInfoToday name={country } /> 
      <div>
        <CountryList onSubmit={setCountry} />
      </div>
      </div>
      <div>
        <GeminiChat/>
      </div>

     
    </div>
  );
}

export default App;
