import { useState } from "react";

function NoteForm({
  addNote,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  editIndex,
  updateNote,
  onCancel,
  darkMode
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = editIndex !== null;
  const showForm = isEditing || isOpen;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateNote();
    } else {
      if (!title.trim() || !content.trim()) return;
      addNote({ title, content });
      setTitle("");
      setContent("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      onCancel?.();
    } else {
      setIsOpen(false);
      setTitle("");
      setContent("");
    }
  };

  // Jab form band ho aur edit mode na ho — button dikhaye
  if (!showForm) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all"
      >
        + Add New Note
      </button>
    );
  }

  return (
  <div
  className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
    darkMode ? "bg-gray-800" : "bg-white"
  }`}
>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Header with close button */}
        <div className="flex items-center justify-between">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {isEditing ? "✏️ Edit Note" : "📝 Add New Note"}
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={`border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={`border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
             className={`border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
            />
            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-full sm:flex-1 py-2.5 rounded-lg text-white font-medium transition ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Update Note" : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
