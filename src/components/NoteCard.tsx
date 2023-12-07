import React from "react";
import { deleteNote } from "../helpers";

export default function NoteCard({ note, setNotes, notes }) {
  return (
    <div
      key={note.id}
      className="note"
      style={{ border: `1px solid ${note.color}` }}
    >
      <p>{note.content}</p>
      <p>Category: {note.category}</p>
      <p>Created at: {note.timestamp}</p>
      <button onClick={() => deleteNote(note.id, setNotes, notes)}>
        Delete
      </button>
    </div>
  );
}
