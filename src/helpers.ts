import { v4 as uuidv4 } from "uuid";
export function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export const deleteNote = (id, setNotes, notes) => {
  const updatedNotes = notes.filter((note) => note.id !== id);
  setNotes(updatedNotes);
  return updatedNotes;
};

export const addNote = (newNote, notes, selectedCategory, selectedColor) => {
  if (newNote.trim() === "") return;
  const newNoteObj = {
    id: uuidv4(),
    content: newNote,
    timestamp: new Date().toLocaleString(),
    category: selectedCategory,
    color: selectedColor,
  };

  const updatedNotes = [...notes, newNoteObj];

  setLocalStorage("notes", updatedNotes);

  return updatedNotes;
};

export const categoryData = {
  Personal: "cyan",
  Work: "orange",
  Study: "green",
  Shopping: "yellow",
  Other: "white",
  Important: "red",
};
