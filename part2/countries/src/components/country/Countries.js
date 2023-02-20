import Country from './Country';

const Countries = ({ countries, filter }) => {
  const filteredCountries = countries
    .filter(country => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase());
    });

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul className='countries'>
        {filteredCountries
          .map((country, i) => {
            return <li key={i}>{country.name.common}</li>;
          })}
      </ul>
    );
  }
};

export default Countries;
