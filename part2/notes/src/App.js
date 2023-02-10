import { useEffect, useState } from 'react'

import Note from './components/Note';
import NoteForm from './components/NoteForm';

import noteService from './services/notes';

import './App.css'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);

  // Run whenever the component is rerendered
  // The empty array indicates that this is only run once
  // the component is initially rendered
  useEffect(() => {
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
            // toggleImportance={() => toggleImportanceOf(note.id)}
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
    </div>
  );
};

export default App;