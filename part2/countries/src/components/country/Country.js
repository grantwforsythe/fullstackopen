import { useEffect, useState } from 'react';

const WEATHER_API = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  // Get the weather data for the countries capital
  useEffect(() => {
    (async (city) => {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${city}&aqi=no`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        console.log('Failed to make request')
      }
    })(country.name.common);
  }, [country]);

  if (!weather) return null;

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
        <h2>Weather in {country.name.common}</h2>
        <p>Temperature {weather.current.temp_c} Celcius</p>
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
        />
        <p>Wind {weather.current.wind_mph}</p>
      </div>
    </>
  );
};

export default Country;
