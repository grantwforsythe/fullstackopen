import axios from 'axios';
import { useEffect, useState } from 'react'

import Note from './components/Note';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);

  // Run whenever the component is rerendered
  // The empty array indicates that this is only run once
  // the component is initially rendered
  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => setNotes(response.data));
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    // IMPORTANT: You never want to mutate the state of a component directly
    // Important: This is not a copy of the note, but a reference to the actual note in memory
    const note = notes.find(n => n.id === id);
    const changedNode = { ...note, important: !note.important };

    axios
      .put(url, changedNode)
      .then(response => {
        // Only update the note with the same id
        setNotes(notes.map(n => n.id !== id ? n : response.data));
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

    axios
      .post('http://localhost:3001/notes', note)
      .then(response => {
        setNotes(notes.concat(response.data));
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