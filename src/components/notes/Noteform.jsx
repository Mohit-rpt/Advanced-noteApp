import { useState } from "react";

function NoteForm({
  addNote,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  editIndex,
  updateNote,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      updateNote();
    } else {
      if (!title.trim() || !content.trim()) return;

      addNote({ title, content });

      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {editIndex !== null ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border rounded-lg p-3"
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="border rounded-lg p-3 h-32 resize-none"
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Update Note
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              Add New Note
            </h2>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Note
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default NoteForm;