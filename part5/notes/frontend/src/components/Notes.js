import React from 'react';
import Note from './Note';

const Notes = ({ notesToShow }) => (
  <ul>
    {notesToShow.map(note => (
      <Note key={note.id} note={note} />
    ))}
  </ul>
);

export default Notes;
