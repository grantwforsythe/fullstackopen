import { useState } from 'react'
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const addNote = (event) => {
    // The default action belonging to the event will not occur
    // i.e., The submit button of the form will not be submitted which would cause the page to reload
    event.preventDefault();

    const note = {
      id: notes.length + 1,
      content: newNote,
      important: isImportant,
    };

    setNotes(notes.concat(note));
    setNewNote('');
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
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        {/*
          The input element is referred to as a controller component
          
          Since we assigned a piece of the App component's state as
          the value attribute of the input element, the App component
          now controls the behavior of the input element.

          We need to have the checkbox first since it is updating the
          isImportant state.
        */}
        <label for='important'>Important: </label>
        <input
          type='checkbox'
          name='important'
          value={isImportant}
          onChange={handleImportant}
        />
        <br></br>
        <label for='note'>New note: </label>
        <input
          type='text'
          name='note'
          placeholder='Add a note'
          value={newNote}
          onChange={handleNoteChange}
        />
        <br></br>
        <button type="submit">Add note</button>
      </form>
    </div>
  );
};

export default App;