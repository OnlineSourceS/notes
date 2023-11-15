import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('sticknotes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('sticknotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === '') return;
    const newNoteObj = { id: uuidv4(), content: newNote };
    setNotes([...notes, newNoteObj]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>Stick Notes App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id} className="note">
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
