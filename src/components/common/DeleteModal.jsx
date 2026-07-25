function DeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96">

        <h2 className="text-xl font-bold mb-2">
          🗑️ Delete Note
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this note?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteModal;