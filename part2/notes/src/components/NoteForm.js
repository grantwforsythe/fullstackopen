const NoteForm = ({
  addNote,
  isImportant,
  handleImportant,
  newNote,
  handleNoteChange
}) => {
  return (
    <>
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
    </>
  );
};

export default NoteForm;