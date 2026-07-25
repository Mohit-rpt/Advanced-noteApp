import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";

function NoteCard({ title, content, pinned, date, onDelete, onEdit, onPin, darkMode }) {
  return (
    <div
      className={`relative rounded-xl shadow-md p-5 transition-all duration-300 ${
        pinned
          ? darkMode
            ? "bg-gray-800 text-white border-2 border-yellow-500"
            : "bg-white text-black border-2 border-yellow-400"
          : darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Pin Button - Top Right */}
      <button
        onClick={onPin}
        className={`absolute top-3 right-3 p-2 rounded-lg transition ${
          pinned
            ? darkMode
              ? "text-yellow-400 bg-yellow-900/30"
              : "text-yellow-600 bg-yellow-50"
            : darkMode
            ? "text-gray-500 hover:text-yellow-400 hover:bg-gray-700"
            : "text-gray-400 hover:text-yellow-500 hover:bg-gray-100"
        }`}
        title={pinned ? "Unpin note" : "Pin note"}
      >
        <FaThumbtack className={`w-4 h-4 ${pinned ? "" : "-rotate-45"}`} />
      </button>

      {/* Pinned Badge */}
      {pinned && (
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${
          darkMode
            ? "bg-yellow-900/40 text-yellow-300"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          <FaThumbtack className="w-3 h-3" /> PINNED
        </div>
      )}

      {/* Title */}
      <h3 className={`text-xl font-bold mb-2 pr-10 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        {title}
      </h3>

      {/* Content */}
      <p className={`break-words ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {content}
      </p>

      {/* Date */}
      {date && (
        <p className={`text-xs mt-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          {new Date(date).toLocaleDateString()}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaTrash /> Delete
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          <FaEdit /> Edit
        </button>
      </div>
    </div>
  );
}

export default NoteCard;