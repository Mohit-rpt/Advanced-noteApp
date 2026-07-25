import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import Navbar from "./components/notes/Navbar";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const[search,setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const updateNote = () => {
    setNotes((prev) =>
      prev.map((note, index) =>
        index === editIndex
          ? { title: editTitle, content: editContent }
          : note
      )
    );

    setEditIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  const filterNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase()) ||
  note.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4">

        <Header
          title="📝 Advanced Notes"
          subtitle="Organize your ideas beautifully."
        />

        <main className="space-y-6">

          <NoteForm
            addNote={addNote}
            editTitle={editTitle}
            editContent={editContent}
            setEditTitle={setEditTitle}
            setEditContent={setEditContent}
            editIndex={editIndex}
            updateNote={updateNote}
          />

          <SearchBar 
          search={search}
          setSearch={setSearch} />

          <NoteList
            notes={filterNotes}
            deleteNote={deleteNote}
            editNote={editNote}
          />

        </main>

        <Footer />

      </div>
    </div>
  );
}

export default App;