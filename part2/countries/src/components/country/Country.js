const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital(s): {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li>{language}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
    </>
  );
};

export default Country;
