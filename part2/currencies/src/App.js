import { useState, useEffect } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  // Run everytime currency changes
  useEffect(() => {
    console.log('Effect run, currency is now ', currency);

    // Skip currency if it is not defined
    if (currency) {
      console.log('Fetching exchange rates...')

      fetch(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => response.json())
        .then(data => setRates(data.rates));
    }
  }, [currency]);

  // Only want to change the state once the full currency as been entered
  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <label for="currency">Currency: </label>
        <input 
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Exchange rates</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  );
};

export default App;
