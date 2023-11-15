import   { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const categoryData = {"Personal": 'cyan',
"Work": 'orange',
"Study": 'green',
"Shopping": 'yellow',
"Other": 'white',
"Important": "red"
}
const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [selectedColor, setSelectedColor] = useState('cyan');

  



  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  

  const addNote = () => {
    if (newNote.trim() === '') return;
    const newNoteObj = {
      id: uuidv4(),
      content: newNote,
      timestamp: new Date().toLocaleString(),
      category: selectedCategory,
      color: selectedColor,
    };
    setNotes([...notes, newNoteObj]);
    localStorage.setItem('notes', JSON.stringify([...notes, newNoteObj] ));
    setNewNote('');
  };
  
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    localStorage.setItem('notes', JSON.stringify(updatedNotes ));
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <div >

      <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1>Welcome! To Sticky Notes </h1>
  <textarea
    type="text"
    placeholder="Enter your note"
    value={newNote}
    style={{outline: `${selectedColor} 2px solid`, borderRadius: "4px"}}
    onChange={(e) => setNewNote(e.target.value)}
    />
  <select onChange={(e) => {
    // setSelectedColor()
    const category = e.target.value
    setSelectedCategory(category)
    setSelectedColor(categoryData[category])
    
    
  }} value={selectedCategory}>
    {Object.keys(categoryData).map((category) => (
      <option key={ category} value={  category}>
        { category} 
      </option>
    ))}
  </select> 
    </div>
  
  <button onClick={addNote}>Add Note</button>
</div>

<div className="filter"  style={{display:"flex", justifyContent:"end"}}>

  <select onChange={(e) => {
    // setSelectedColor()
    const category = e.target.value
    setSelectedCategory(category) 
    
    
  }} value={selectedCategory}>
    {Object.keys(categoryData).map((category) => (
      <option key={ category} value={  category}>
        { category} 
      </option>
    ))}
  </select> 
    </div>

      <div>
      {notes.map((note) => (
  <div key={note.id} className="note" style={{ border: `1px solid ${note.color}` }}>
    <p>{note.content}</p>
    <p>Category: {note.category}</p>
    <p>Created at: {note.timestamp}</p>
    <button onClick={() => deleteNote(note.id)}>Delete</button>
  </div>
))}
      </div>
    </div>
  );
};

export default App;
