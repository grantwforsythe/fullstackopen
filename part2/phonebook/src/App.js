import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personServices from './services/persons';

import './styles/App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personServices.deletePerson(id);
      // Remove the deleted person from the state
      setPersons(persons.filter(person => person.id !== id));
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Send an alert if the number is already in the phonebook
    if (persons.filter(person => person.number === newPhone).length > 0) {
      alert(`${newPhone} is already in the phonebook`);
    }
    // Prompt the user to update a phone number for a person
    else if (persons.filter(person => person.name === newName).length > 0) {
      const statement = `
        ${newName} is already in the phonebook,
        replace the old number with a new one?
      `;

      if (window.confirm(statement)) {
        // Like filter but returns the first element that matches the condtion instead of a new array
        const person = persons.find(person => person.name === newName);
        updatePerson(person);
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newPhone
      };

      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        });
    }

    setNewName('');
    setNewPhone('');
  };

  const updatePerson = (person) => {
    const updatedPerson = {
      ...person,
      number: newPhone
    };

    personServices
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p: returnedPerson));
      })
      .catch(error => {
        alert(`${person.name} has already been deleted from the phonebook`);
        setPersons(persons.filter(p => p.id !== person.id));
      });
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;