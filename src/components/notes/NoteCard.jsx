import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";

const colorMap = {
  white: { bg: "bg-white", darkBg: "dark:bg-gray-800", border: "border-gray-200", darkBorder: "dark:border-gray-700" },
  blue: { bg: "bg-blue-50", darkBg: "dark:bg-blue-900/20", border: "border-blue-200", darkBorder: "dark:border-blue-800" },
  green: { bg: "bg-green-50", darkBg: "dark:bg-green-900/20", border: "border-green-200", darkBorder: "dark:border-green-800" },
  yellow: { bg: "bg-yellow-50", darkBg: "dark:bg-yellow-900/20", border: "border-yellow-200", darkBorder: "dark:border-yellow-800" },
  pink: { bg: "bg-pink-50", darkBg: "dark:bg-pink-900/20", border: "border-pink-200", darkBorder: "dark:border-pink-800" },
  purple: { bg: "bg-purple-50", darkBg: "dark:bg-purple-900/20", border: "border-purple-200", darkBorder: "dark:border-purple-800" },
};

// ⏰ Time Ago
function timeAgo(dateString) {
  if (!dateString) return "";
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(dateString).toLocaleDateString();
}

function NoteCard({ title, content, color, pinned, date, onDelete, onEdit, onPin, darkMode }) {
  const c = colorMap[color] || colorMap.white;

  return (
    <div className={`relative rounded-xl border shadow-sm p-4 transition-all hover:shadow-md ${
      pinned
        ? darkMode ? `${c.darkBg} ${c.darkBorder} border-2` : `${c.bg} ${c.border} border-2 border-yellow-400`
        : darkMode ? `${c.darkBg} ${c.darkBorder}` : `${c.bg} ${c.border}`
    }`}>
      {/* Pin */}
      <button onClick={onPin}
        className={`absolute top-3 right-3 p-1.5 rounded-lg transition ${
          pinned
            ? darkMode ? "text-yellow-400 bg-yellow-900/30" : "text-yellow-600 bg-yellow-100"
            : darkMode ? "text-gray-500 hover:text-yellow-400 hover:bg-gray-700" : "text-gray-400 hover:text-yellow-500 hover:bg-gray-100"
        }`} title={pinned ? "Unpin" : "Pin"}>
        <FaThumbtack className={`w-4 h-4 ${pinned ? "" : "-rotate-45"}`} />
      </button>

      {pinned && (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${
          darkMode ? "bg-yellow-900/40 text-yellow-300" : "bg-yellow-100 text-yellow-700"
        }`}><FaThumbtack className="w-3 h-3" /> PINNED</span>
      )}

      <h3 className={`font-bold text-lg mb-2 pr-10 ${darkMode ? "text-white" : "text-gray-800"}`}>{title}</h3>
      <p className={`text-sm break-words ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{content}</p>

      {/* ⏰ Time Ago */}
      <p className={`text-xs mt-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{timeAgo(date)}</p>

      <div className={`flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-3 border-t ${
        darkMode ? "border-gray-700" : "border-gray-100"
      }`}>
        <button onClick={onDelete} className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">
          <FaTrash /> Delete
        </button>
        <button onClick={onEdit} className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
          <FaEdit /> Edit
        </button>
      </div>
    </div>
  );
}

export default NoteCard;