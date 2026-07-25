import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote ,editNote,darkMode}) {
    if(notes.length === 0){
        return (
            <div className="bg-white rounded-xl shadow-md p-10 text-center mt-6">
                <h2 className="text-2xl mb-2">📝</h2>
                <h3 className="text-xl font-semibold text-gray-700">
                    No Notes Found
                </h3>
                <p className="text-gray-500 mt-2">
                    Create your first note or try a different Search.
                </p>
            </div>
        );
    }
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
                <NoteCard
                    key={index}
                    title={note.title}
                    content={note.content}
                    onDelete={() => deleteNote(index)}
                    onEdit={() => editNote(index)}
                    darkMode={darkMode}
                />
            ))}
        </div>
        </>
    );
}

export default NoteList;