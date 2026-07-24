import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import { useState } from "react";

function App() {
  const [notes,setNotes] = useState([]);
  const addNote = (note) => {
    setNotes([...notes, note]);
    console.log(notes);
  }
  return (
    <>
      <Header 
      title="📝 Advanced Notes"
      subtitle="Organize your ideas beautifully."
       />

      <main>
        <NoteForm addNote={addNote} />
        <SearchBar />
        <NoteList notes={notes} />
      </main>

      <Footer />
    </>
  );
}

export default App;