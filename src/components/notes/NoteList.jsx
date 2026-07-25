import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote, editNote, togglePin, darkMode }) {
  if (notes.length === 0) {
    return (
      <div className={`rounded-xl shadow-md p-10 text-center mt-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className="text-2xl mb-2">📝</h2>
        <h3 className={`text-xl font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          No Notes Found
        </h3>
        <p className={`mt-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
          Create your first note or try a different Search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id || index}
          title={note.title}
          content={note.content}
          pinned={note.pinned}
          date={note.date}
          onDelete={() => deleteNote(index)}
          onEdit={() => editNote(index)}
          onPin={() => togglePin(index)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default NoteList;