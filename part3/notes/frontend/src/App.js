import { useEffect, useState } from 'react';

import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Footer from './components/Footer';
import Notification from './components/Notification';

import noteService from './services/notes';

import './style/App.css';

const App = () => {
  // Everytime a state is updated, the component is rerendered
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [errorMesage, setErrorMessage] = useState(null);

  // This is just to indicated when the component has rendered
  console.log('render');

  // const fetchData = async () => {
  //   const response = await fetch('http://localhost:3001/notes');
  //   if (response.ok) {
  //     const notes = await response.json();
  //     return notes; 
  //   } else {
  //     console.log('Failed to make request');
  //   }
  // };

  // Run whenever a state changes
  // The empty array indicates that this is only run once the component is initially rendered
  // (The initial render of a component is referred to as 'mounting')  
  // A hook is just a sideeffect when something happens
  useEffect(() => {
    console.log('Calling useEffect');
    // fetchData().then(notes => setNotes(notes));
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    // IMPORTANT: You never want to mutate the state of a component directly
    // Important: This is not a copy of the note, but a reference to the actual note in memory
    const note = notes.find(n => n.id === id);
    // This only creates a shallow copy (nested objects will just be references to the original objects)
    const changedNode = { ...note, important: !note.important };

    noteService
      .update(id, changedNode)
      .then(returnedNote => {
        // Only update the note with the same id
        setNotes(notes.map(n => n.id !== id ? n : returnedNote));
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        // Only display the error for 5 seconds
        setTimeout(() => setErrorMessage(null), 5000);
        // Filter out the deleted note from the state
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const addNote = (event) => {
    // The default action belonging to the event will not occur
    // i.e., The submit button of the form will not be submitted which would cause the page to reload
    event.preventDefault();

    const note = {
      content: newNote,
      important: isImportant,
    };

    noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  // Syncs the changes made to the input with the component's state
  // The event handler is called every time a change occurs
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
    console.log(event.target.value);
  };

  const handleImportant = (event) => {
    console.log(event.target.checked);
    setIsImportant(event.target.checked);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMesage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <NoteForm
        addNote={addNote}
        isImportant={isImportant}
        handleImportant={handleImportant}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
      />
      <Footer />
    </div>
  );
};

export default App;
