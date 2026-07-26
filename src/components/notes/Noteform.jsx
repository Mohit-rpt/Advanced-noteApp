import { useState, useEffect } from "react";

const COLORS = [
  { name: "white", light: "bg-white", dark: "dark:bg-gray-800" },
  { name: "blue", light: "bg-blue-50", dark: "dark:bg-blue-900/20" },
  { name: "green", light: "bg-green-50", dark: "dark:bg-green-900/20" },
  { name: "yellow", light: "bg-yellow-50", dark: "dark:bg-yellow-900/20" },
  { name: "pink", light: "bg-pink-50", dark: "dark:bg-pink-900/20" },
  { name: "purple", light: "bg-purple-50", dark: "dark:bg-purple-900/20" },
];

function NoteForm({
  addNote,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  editIndex,
  updateNote,
  onCancel,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("white");
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = editIndex !== null;
  const showForm = isEditing || isOpen;
  const maxChars = 500;
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const charCount = content.length;

  // 💾 Auto-save draft
  useEffect(() => {
    if (!isEditing && isOpen) {
      localStorage.setItem("noteDraft", JSON.stringify({ title, content, color }));
    }
  }, [title, content, color, isOpen, isEditing]);

  useEffect(() => {
    if (!isEditing && isOpen) {
      const saved = localStorage.getItem("noteDraft");
      if (saved) {
        try {
          const d = JSON.parse(saved);
          setTitle(d.title || "");
          setContent(d.content || "");
          setColor(d.color || "white");
        } catch {}
      }
    }
  }, [isOpen, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateNote();
    } else {
      if (!title.trim() || !content.trim()) return;
      addNote({ title, content, color });
      setTitle("");
      setContent("");
      setColor("white");
      setIsOpen(false);
      localStorage.removeItem("noteDraft");
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      onCancel?.();
    } else {
      setIsOpen(false);
      setTitle("");
      setContent("");
      setColor("white");
      localStorage.removeItem("noteDraft");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full py-3.5 rounded-xl border-2 border-dashed font-medium transition-all flex items-center justify-center gap-2 ${
          darkMode
            ? "border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:bg-gray-800/50"
            : "border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50"
        }`}
      >
        <span className="text-xl">+</span> Add New Note
      </button>
    );
  }

  return (
    <div className={`rounded-xl shadow-lg border p-6 transition-colors ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    }`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {isEditing ? "✏️ Edit Note" : "📝 Add New Note"}
          </h2>
          <button type="button" onClick={handleCancel} className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
            darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}>✕</button>
        </div>

        {isEditing ? (
          <>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition ${
                darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-green-500" : "bg-white border-gray-200 text-gray-900 focus:ring-green-500"
              }`} />
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 transition ${
                darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-green-500" : "bg-white border-gray-200 text-gray-900 focus:ring-green-500"
              }`} />
          </>
        ) : (
          <>
            <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition ${
                darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
              }`} />
            <textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} rows={4} maxLength={maxChars}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 transition ${
                darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
              } ${charCount > maxChars - 50 ? (darkMode ? "border-yellow-500" : "border-yellow-400") : ""}`} />

            {/* 🔢 Word Count + 🎨 Color Picker */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <span className={charCount > maxChars - 50 ? "text-yellow-500 font-semibold" : ""}>
                  {charCount}/{maxChars}
                </span>
                <span className="mx-2">•</span>
                <span>{wordCount} words</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Color:</span>
                {COLORS.map((c) => (
                  <button key={c.name} type="button" onClick={() => setColor(c.name)}
                    className={`w-6 h-6 rounded-full border-2 transition ${color === c.name ? "border-gray-800 dark:border-white scale-110" : "border-transparent"} ${c.light} ${c.dark}`}
                    title={c.name} />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={handleCancel}
            className={`w-full sm:flex-1 py-2.5 rounded-lg font-medium transition ${
              darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>Cancel</button>
          <button type="submit"
            className={`w-full sm:flex-1 py-2.5 rounded-lg text-white font-medium transition ${
              isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}>{isEditing ? "Update Note" : "Add Note"}</button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;