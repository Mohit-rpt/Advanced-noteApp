import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import Navbar from "./components/notes/Navbar";
import { useState, useEffect } from "react";
import "./index.css";
import DeleteModal from "./components/common/DeleteModal";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const[search,setSearch] = useState("");
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [deleteIndex,setDeleteIndex] = useState(null);
  const [darkMode,setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index) => {
   setDeleteIndex(index);
   setShowDeleteModal(true);
  }
  function confirmDelete(){
    setNotes((prevNotes)=>
    prevNotes.filter((_,i)=> i !== deleteIndex)
  )
  setShowDeleteModal(false);
  setDeleteIndex(null);
  }

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
   <div
  className={`min-h-screen transition-colors duration-300 ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
  }`}
>
      <Navbar  
        darkMode={darkMode}
        setDarkMode={setDarkMode}/>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
    
        <Header
          title="📝 Advanced Notes"
          subtitle="Organize your ideas beautifully."
          darkMode={darkMode}
        />

        <main className="space-y-6">

          <SearchBar 
          search={search}
          setSearch={setSearch} />


          <NoteForm
            addNote={addNote}
            editTitle={editTitle}
            editContent={editContent}
            setEditTitle={setEditTitle}
            setEditContent={setEditContent}
            editIndex={editIndex}
            updateNote={updateNote}
            onCancel={() => setEditIndex(null)}
            darkMode={darkMode}
          />

         
          <NoteList
            notes={filterNotes}
            deleteNote={deleteNote}
            editNote={editNote}
            darkMode={darkMode}
          />

        </main>
        <DeleteModal 
          isOpen={showDeleteModal}
          onCancel={()=> setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          />

        <Footer />

      </div>
    </div>
  );
}

export default App;