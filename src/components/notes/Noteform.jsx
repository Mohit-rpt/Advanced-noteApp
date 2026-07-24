import React, { useState } from "react";

function NoteForm({
  addNote,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  editIndex,
  updateNote
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      updateNote();
    }else{
    addNote({ title, content });
    setTitle("");
    setContent("");
    }

    
  };
  console.log(
    "NoteForm values:",
    editTitle,
    editContent,
    editIndex
  );

 return (
  <form onSubmit={handleSubmit}>

    {editIndex !== null ? (
      <>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />

        <button type="submit">
          Update Note
        </button>
      </>
    ) : (
      <>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">
          Add Note
        </button>
      </>
    )}

  </form>
);
}

export default NoteForm;
