import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("sticknotes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("sticknotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    const newNoteObj = {
      id: uuidv4(),
      content: newNote,
      position: { x: 0, y: 0 },
    };
    setNotes([...notes, newNoteObj]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId !== id) {
      const draggedNote = notes.find((note) => note.id === draggedId);
      const overNote = notes.find((note) => note.id === id);

      if (draggedNote && overNote) {
        const updatedNotes = notes.map((note) => {
          if (note.id === draggedId) {
            return { ...note, position: overNote.position };
          }
          if (note.id === id) {
            return { ...note, position: draggedNote.position };
          }
          return note;
        });

        setNotes(updatedNotes);
      }
    }
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
          <div
            key={note.id}
            className="note"
            style={{
              transform: `translate(${note.position.x}px, ${note.position.y}px)`,
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, note.id)}
            onDragOver={(e) => handleDragOver(e, note.id)}
          >
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
