import React, { useState, useEffect } from 'react';

const CountryList = ({ onSubmit }) => {
  const [country, setCountry] = useState(null);

  async function loadCountries() {
    try {
      const randomOffset = Math.floor(Math.random() * 195);
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=1&offset=${randomOffset}`,
        {
          method: "GET",
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': '37a06a45a6mshf1d305aed14fa0bp168055jsn72dd6e45d220'
          }
        }
      );

      const data = await response.json();
      const randomCountry = data.data[0];
      setCountry(randomCountry);
      onSubmit(randomCountry.name);

    } catch (err) {
      console.error("Błąd fetch:", err);
    }
  }

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div>
      <button type="button" onClick={loadCountries}>Losuj kraj</button>
      <p>{country ? `${country.name} (${country.code})` : "Ładowanie..."}</p>
    </div>
  );
};

export default CountryList;
