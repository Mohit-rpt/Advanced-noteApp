import { FaEdit, FaTrash } from "react-icons/fa";

function NoteCard({ title, content, onDelete, onEdit,darkMode }) {
  return (
    <div
className={`rounded-xl shadow-md p-5 transition-colors duration-300 ${
    darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black"
}`}
>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      <p className="text-gray-600 break-words">{content}</p>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
            <FaTrash/>
          Delete
        </button>
        <button
          onClick={onEdit}
         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            <FaEdit/>
          Edit
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
