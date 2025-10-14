import React, { useState, useEffect } from "react";

const WeatherInfo = ({ name = "Wroclaw" }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Wroclaw&units=metric&lang=pl&appid=38a14d862d3cb7f74d954349eea831d3`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.cod !== 200) {
          setError(data.message);
        } else {
          setWeather(data);
        }
      })
      .catch(err => setError("Błąd połączenia z API"));
  }, [name]);

  return (
    <div
      className="d-flex justify-content-center align-items-center mb-3"
      style={{
        width: "100%",
        height: "150px",
        backgroundColor: "#0d6efd",
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
        <div className="">
          {Math.round(weather.main.temp)}°C 🌤️ {weather.name}: <br />
          {weather.weather[0].description}
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
