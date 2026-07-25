function NoteCard({ title, content, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      <p className="text-gray-600 break-words">{content}</p>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
