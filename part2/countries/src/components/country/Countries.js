import uniqid from 'uniqid';

import Country from './Country';

const Countries = ({ countries, filter, handleClick }) => {
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
          .map((country) => {
            return (
            <li key={uniqid()}>
              {country.name.common}
              <button onClick={() => handleClick(country.name)}>show</button>
            </li>
            );
          })}
      </ul>
    );
  }
};

export default Countries;
