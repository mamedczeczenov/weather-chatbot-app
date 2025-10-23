import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { fetchWeather } from "./weather-fetch-info.js";

const WeatherInfoNerd = ({ name }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetchWeather(name)
      .then((data) => setWeather(data))
      .catch(err => setError("Błąd połączenia z API"));
  }, [name]);

  return (
    <div
      className="d-flex justify-content-center align-items-center mb-3"
      style={{
        width: "100%",
        height: "150px",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
    >
      {error && <div>Błąd: {error}</div>}

      {!error && !weather && "Ładowanie pogody..."}

      {weather && (
        <div className="">
        <ul>
          <li>💧 Wilgotność: {weather.main.humidity}%</li>
          <li>🧭 Wiatr: {weather.wind.speed} m/s z kierunku {weather.wind.deg}°</li>
          <li>📈 Ciśnienie: {weather.main.pressure} hPa</li>
          <li>📍 Pozycja GPS: {weather.coord.lat.toFixed(2)}°N, {weather.coord.lon.toFixed(2)}°E</li>
          <li>🆔 widoczność: {weather.visibility} M</li>
        </ul>
        </div>
      )}
    </div>
      );
};

export default WeatherInfoNerd;
