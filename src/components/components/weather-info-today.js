import React, { useState, useEffect } from "react";
import WeatherInfoNerd from './weather-info-nerd.js';
import { fetchWeather } from "./weather-fetch-info.js";

const WeatherInfo = ({ name }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [showNerd, setNerd] = useState(false);

   useEffect(() => {
    fetchWeather(name).then((data) => setWeather(data));
  }, [name]);

  return (
    <div
      className="d-flex justify-content-center align-items-center mb-3"
      style={{
        width: "100%",
        height: "150px",
        border: "3px solid #66b2ff",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
    >
      {error && <div>Błąd: {error}</div>}

      {!error && !weather && "Ładowanie pogody..."}

      {weather && (
        <div>
    {(() => {
        const condition = weather.weather[0].main.toLowerCase();

        let emoji = "🌍";
        if (condition.includes("clear")) emoji = "☀️";
        else if (condition.includes("cloud")) emoji = "☁️";
        else if (condition.includes("rain")) emoji = "🌧️";
        else if (condition.includes("snow")) emoji = "❄️";
        else if (condition.includes("thunder")) emoji = "⛈️";
        else if (condition.includes("mist") || condition.includes("fog")) emoji = "🌫️";

        return (
          <div>
            {Math.round(weather.main.temp)}°C {emoji} {weather.name}: <br />
            {weather.weather[0].description} (odczuwalna {Math.round(weather.main.feels_like)}°C)
          </div>
        );
      })()}
    </div>
      )}
      
      {!showNerd ?(
        <button className="btn btn-warning" onClick={() => setNerd(true)}>
          Statystyki dla nerdów 🤓
        </button>
      ):(
        <button className="btn btn-warning" onClick={() => setNerd(false)}>
          schowaj 🤓
        </button>
        )
        }
        {showNerd &&(
        <WeatherInfoNerd name={ name }/>
        
      )}
    
    </div>
)};

export default WeatherInfo;