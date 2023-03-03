import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personServices from './services/persons';

import './styles/App.css';

const WAIT_MS = 5000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(true);

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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      try {
        await personServices.deletePerson(id);
        setNotification(`Removed ${name}`);
        setIsError(false);
      } catch (error) {
        setNotification(`${name} already removed from phonebook. Error: ${error}`);
        setIsError(true);
      } finally {
        // Remove the deleted person from the state
        setPersons(persons.filter(person => person.id !== id));
        setTimeout(() => setNotification(null), WAIT_MS);
      }
    }
  };

  const addPerson = async (event) => {
    event.preventDefault();

    // Send an alert if the number is already in the phonebook
    if (persons.filter(person => person.number === newPhone).length > 0) {
      setNotification(`${newPhone} is already in the phonebook`);
      setIsError(true);
      setTimeout(() => setNotification(null), WAIT_MS);
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

      try {
        const returnedPerson = await personServices.create(newPerson);
        setNotification(`Added ${returnedPerson.name}`);
        setIsError(false);
        setTimeout(() => setNotification(null), WAIT_MS);
        setPersons(persons.concat(returnedPerson))
      } catch (error) {
        setNotification(error.message);
        setIsError(true);
        setTimeout(() => setNotification(null), WAIT_MS);
      }
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
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
        setNotification(`Number for ${returnedPerson.name} has been updated`);
        setIsError(false);
        setTimeout(() => setNotification(null), WAIT_MS);
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id));
        setNotification(`${person.name} has already been deleted from the phonebook. Error ${error}`);
        setIsError(true);
        setTimeout(() => setNotification(null), WAIT_MS);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        isError={isError}
      />
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
