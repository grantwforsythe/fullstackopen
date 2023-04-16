import React from 'react';

/*
The input element is referred to as a controller component
Since we assigned a piece of the App component's state as
the value attribute of the input element, the App component
now controls the behavior of the input element.
We need to have the checkbox first since it is updating the
isImportant state.
*/
const NoteForm = ({
  addNote,
  isImportant,
  handleImportant,
  newNote,
  handleNoteChange,
}) => (
  <form onSubmit={addNote}>
    <label htmlFor="important">
      Imporant:
      <input
        id="imporant"
        type="checkbox"
        name="important"
        value={isImportant}
        onChange={handleImportant}
      />
    </label>
    <br />
    <label htmlFor="note">
      New note:
      <input
        id="note"
        type="text"
        name="note"
        placeholder="Add a note"
        value={newNote}
        onChange={handleNoteChange}
      />
    </label>
    <br />
    <button type="submit">Add note</button>
  </form>
);

export default NoteForm;
