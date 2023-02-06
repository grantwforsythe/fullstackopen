import { useState } from 'react';

import './App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } 
  ]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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

    console.log(persons.length);

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