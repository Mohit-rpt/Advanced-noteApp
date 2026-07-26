import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import Navbar from "./components/notes/Navbar";
import Toast from "./components/common/Toast";
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
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const showToastMsg = (message, type = "success") => {
    setToast({ show: true, message, type });
  };
  const hideToast = () => setToast({ show: false, message: "", type: "success" });

  const addNote = (note) => {
    setNotes([...notes, { ...note, pinned: false, id: Date.now(), date: new Date().toISOString() }]);
    showToastMsg("Note added!", "success");
  };

  const deleteNote = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  function confirmDelete() {
    setNotes((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
    setDeleteIndex(null);
    showToastMsg("Note deleted!", "error");
  }

  const editNote = (index) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const updateNote = () => {
    setNotes((prev) =>
      prev.map((note, i) => (i === editIndex ? { ...note, title: editTitle, content: editContent } : note))
    );
    setEditIndex(null);
    setEditTitle("");
    setEditContent("");
    showToastMsg("Note updated!", "info");
  };

  const togglePin = (index) => {
    const willPin = !notes[index].pinned;
    setNotes((prev) => prev.map((note, i) => (i === index ? { ...note, pinned: willPin } : note)));
    showToastMsg(willPin ? "Note pinned!" : "Unpinned", "info");
  };

  // 📤 Export Notes
  const exportNotes = () => {
    const data = JSON.stringify(notes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notes-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToastMsg("Notes exported!", "success");
  };

  const filterNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const sortedNotes = [...filterNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <Header title="📝 Advanced Notes" subtitle="Organize your ideas beautifully." darkMode={darkMode} />

        <main className="space-y-6">
          {/* Search + Export */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar search={search} setSearch={setSearch} darkMode={darkMode} />
            </div>
            <button
              onClick={exportNotes}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition border ${
                darkMode
                  ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              📤 Export
            </button>
          </div>

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
          darkMode={darkMode}
        />

        <Footer darkMode={darkMode} />
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} darkMode={darkMode} />
      )}
    </div>
  );
}

export default App;