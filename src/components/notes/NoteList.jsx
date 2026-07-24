import NoteCard from "./NoteCard";

function NoteList({ notes, deleteNote ,editNote}) {
    return (
        <>
            {notes.map((note, index) => (
                <NoteCard
                    key={index}
                    title={note.title}
                    content={note.content}
                    onDelete={() => deleteNote(index)}
                    onEdit={() => editNote(index)}
                />
            ))}
        </>
    );
}

export default NoteList;