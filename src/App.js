import React, { useState } from "react";
import "./App.css";
import WeatherInfoToday from "./components/components/weather-info-today.js";
import WeatherSearch from "./components/components/weather-search.js";

function App() {
  const [city, setCity] = useState("Wrocław");

  return (
    <div className="App">
      <WeatherSearch onSearch={setCity} />
      <WeatherInfoToday name={city} /> 
    </div>
  );
}

export default App;
