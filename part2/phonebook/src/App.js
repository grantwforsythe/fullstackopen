import { useState } from 'react';

import './App.css';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '(012) 345-6789'
    },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Send an alert if the name is already in the phonebook
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`);
    }
    else if (persons.filter(person => person.number === newPhone).length > 0) {
      alert(`${newPhone} is already in the phonebook`);
    }
    else {
      setPersons(persons.concat({
        id: persons.length,
        name: newName,
        number: newPhone
      }));
    }

    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a New Person</h2>
      <form>
        <div>
          <label for='name'>Name: </label>
          <input
            type='text'
            name='name'
            placeholder='John Smith'
            value={newName}
            onChange={handleNewName}
            />
        </div>
        <div>
          <label for='phone'>Number: </label>
          <input
            type='tel'
            placeholder='(012) 345-6789'
            value={newPhone}
            onChange={handleNewPhone}
          />
        </div>
        <div>
          <button
            type='submit'
            onClick={addPerson}
          >
            Add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul class='numbers'>
        {persons.map(person => {
          return <Person
            key={person.id}
            name={person.name}
            number={person.number}
          />;
        })}
      </ul>
    </div>
  );
};

export default App;