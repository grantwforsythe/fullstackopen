import React, { useEffect, useState } from 'react';

import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Footer from './components/Footer';
import Notification from './components/Notification';

import noteService from './services/notes';
import loginService from './services/login';

import './style/App.css';

const App = () => {
  // Everytime a state is updated, the component is rerendered
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [errorMesage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Populate all of the notes
  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  // Check if user already logged in
  useEffect(() => {
    const loggedNoteAppUser = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedNoteAppUser) {
      const loggedUser = JSON.parse(loggedNoteAppUser);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = async id => {
    // IMPORTANT: You never want to mutate the state of a component directly
    // Important: This is not a copy of the note, but a reference to the actual note in memory
    const note = notes.find(n => n.id === id);
    // This only creates a shallow copy (nested objects will just be references to the original objects)
    const changedNode = { ...note, important: !note.important };

    try {
      // Only update the note with the same id
      const returnedNote = noteService.update(id, changedNode);
      setNotes(notes.map(n => (n.id !== id ? n : returnedNote)));
    } catch (error) {
      setErrorMessage(`Note '${note.content}' was already removed from server`);
      // Only display the error for 5 seconds
      setTimeout(() => setErrorMessage(null), 5000);
      // Filter out the deleted note from the state
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const addNote = async event => {
    // The default action belonging to the event will not occur
    // i.e., The submit button of the form will not be submitted which would cause the page to reload
    event.preventDefault();

    const note = {
      content: newNote,
      important: isImportant,
    };

    const returnedNote = noteService.create(note);
    setNotes(notes.concat(returnedNote));
    setNewNote('');
  };

  // Syncs the changes made to the input with the component's state
  // The event handler is called every time a change occurs
  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleImportant = event => {
    console.log(event.target.checked);
    setIsImportant(event.target.checked);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(loggedUser)
      );
      noteService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem('loggedNoteAppUser');
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const noteForm = () => (
    <div>
      <p>{user.name} logged in</p>
      <NoteForm
        addNote={addNote}
        isImportant={isImportant}
        handleImportant={handleImportant}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
      />
    </div>
  );

  console.log(loginForm());

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMesage} />
      {user === null ? loginForm() : noteForm()}
      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      {user !== null && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
      <Footer />
    </div>
  );
};

export default App;
