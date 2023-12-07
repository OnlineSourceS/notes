import { useState, useEffect } from "react";

import "./index.css";
import { addNote, categoryData, setLocalStorage } from "./helpers";
import NoteCard from "./components/NoteCard";
import NotesContainer from "./components/NotesContainer";
import SelectCategory from "./components/SelectCategory";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [selectedColor, setSelectedColor] = useState("cyan");

  useEffect(() => {
    if (notes.length) setLocalStorage("notes", notes);

    return () => {};
  }, [notes]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedColor(categoryData[category]);
  }
  return (
    <div className="App">
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Welcome! To Sticky Notes </h1>
          <textarea
            type="text"
            placeholder="Enter your note"
            value={newNote}
            style={{
              outline: `${selectedColor} 2px solid`,
              borderRadius: "4px",
            }}
            className="text-input"
            onChange={(e) => setNewNote(e.target.value)}
          />
          <SelectCategory
            categoryData={categoryData}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
        </div>

        <button
          onClick={() => {
            setNotes(addNote(newNote, notes, selectedCategory, selectedColor));
            setNewNote("");
          }}
        >
          Add Note
        </button>
      </div>

      <NotesContainer notes={notes} setNotes={setNotes}>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            notes={notes}
            setNotes={setNotes}
          ></NoteCard>
        ))}
      </NotesContainer>
    </div>
  );
};

export default App;
