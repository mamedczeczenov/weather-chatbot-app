export async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=38a14d862d3cb7f74d954349eea831d3`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error("Błąd połączenia z API");
  }
}
