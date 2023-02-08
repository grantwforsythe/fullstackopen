import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  const handleFilter = (event) => {
    console.log('filter: ', event.target.value);
    setFilter(event.target.value);
  };

  const handleNewName = (event) => {
    console.log('New name: ', event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    console.log('New phone: ', event.target.value);
    setNewPhone(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    console.log(persons.length);

    // Send an alert if the name is already in the phonebook
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`);
    }
    else if (persons.filter(person => person.number === newPhone).length > 0) {
      alert(`${newPhone} is already in the phonebook`);
    }
    else {
      setPersons(persons.concat({
        id: ++persons.length,
        name: newName,
        number: newPhone
      }));
    }

    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Filter</h2>
      <Filter
       filter={filter}
       handleFilter={handleFilter}
      />
      <h2>Add a New Person</h2>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
      />
    </div>
  );
};

export default App;