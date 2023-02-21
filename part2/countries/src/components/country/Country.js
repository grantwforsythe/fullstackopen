import { useState } from 'react';

const WEATHER_API = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  // Get the weather data for the countries capital
  (async (city) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${city}&aqi=no`);
    if (response.ok) {
      const data = await response.json();
      setWeather({
        city: city,
        temp: data.current.temp_c,
        icon: data.current.condition.icon,
        alt: data.current.condition.text,
        wind: data.current.wind_mph
      });
    } else {
      console.log('Failed to make request')
    }
  })(country.name.common);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital(s): {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li>{language}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <div>
        <h2>Weather in {weather.city}</h2>
        <p>Temperature {weather.temp} Celcius</p>
        <img
          src={weather.icon}
          alt={weather.alt}
        />
        <p>Wind {weather.wind}</p>
      </div>
    </>
  );
};

export default Country;
