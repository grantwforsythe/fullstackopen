import { useEffect, useState } from 'react';

import Countries from './components/country/Countries';
// import Notification from './components/common/Notification';

import './styles/App.css';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');
  // const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        console.log('Failed to make request', response.status);
      }
    };
    fetchData();
  }, []);

  // Render component when the request has been made
  if (!countries) return null;

  return (
    <div>
      <label for='filter'>Find countries: </label>
      <input
        name='filter'
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <Countries
        countries={countries} 
        filter={filter}
      />
    </div>
  );
};

export default App;
