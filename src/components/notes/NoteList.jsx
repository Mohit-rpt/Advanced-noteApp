import NoteCard from "./NoteCard";

function NoteList({ notes }) {
    return (
        <>
            {notes.map((note, index) => (
                <NoteCard
                    key={index}
                    title={note.title}
                    content={note.content}
                />
            ))}
        </>
    );
}

export default NoteList;