import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import Navbar from "./components/notes/Navbar";
import { useState, useEffect } from "react";
import "./index.css";
import DeleteModal from "./components/common/DeleteModal";
import Toast from "./components/common/Toast";


function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });


    const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    };

    const hideToast = () => {
      setToast({ show: false, message: "", type: "success" });
    };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, { ...note, pinned: false, id: Date.now(), date: new Date().toISOString() }]);
     showToast("Note added successfully!", "success"); 
  };

  const deleteNote = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  function confirmDelete() {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
    setDeleteIndex(null);
    showToast("Note deleted!", "error");
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
          ? { ...note, title: editTitle, content: editContent }
          : note
      )
    );
    setEditIndex(null);
    setEditTitle("");
    setEditContent("");
    showToast("Note updated!", "info");
  };

  // 👇 PIN TOGGLE FUNCTION
  const togglePin = (index) => {
    setNotes((prev) =>
      prev.map((note, i) =>
        i === index ? { ...note, pinned: !note.pinned } : note
      )
    );
    showToast(isPinned ? "Note pinned!" : "Note unpinned!", "info");
  };

  const filterNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // 👇 SORT: Pinned notes first
  const sortedNotes = [...filterNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <Header
          title="📝 Advanced Notes"
          subtitle="Organize your ideas beautifully."
          darkMode={darkMode}
        />

        <main className="space-y-6">
          <SearchBar search={search} setSearch={setSearch} />

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

          {/* 👇 togglePin prop pass kiya */}
          <NoteList
            notes={sortedNotes}
            deleteNote={deleteNote}
            editNote={editNote}
            togglePin={togglePin}
            darkMode={darkMode}
          />
        </main>

        <DeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        <Footer />
      </div>
         {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;