import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NoteForm from "./components/notes/NoteForm";
import SearchBar from "./components/notes/SearchBar";
import NoteList from "./components/notes/NoteList";
import { useState,useEffect } from "react";

function App() {
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
});
  const [editIndex,setEditIndex] = useState(null);
  const [editTitle,setEditTitle] = useState("");
  const [editContent,setEditContent] = useState("");


  useEffect(() => {
    console.log("Saving Notes:", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
   }, [notes]);


  const addNote = (note) => {
    setNotes([...notes, note]);
    console.log(notes);
  }

  function deleteNote(index){
    setNotes((prevNotes) =>
      prevNotes.filter((_,i)=> i !== index))
  }

  function editNote(index){
    console.log("Edit clicked", index);
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
      console.log(notes[index]);
  }

  function updateNote(){
    setNotes((prevNotes) => 
    prevNotes.map((note,index)=>{
      if(index ===  editIndex){
        return {
          title:editTitle,
          content:editContent
        }
      }
      return note;
    }))
    setEditIndex(null);
    setEditTitle("");
    setEditContent("");
  }
  return (
    <>
      <Header 
      title="📝 Advanced Notes"
      subtitle="Organize your ideas beautifully."
       />

      <main>
        <NoteForm addNote={addNote}
                  editTitle={editTitle}
                  editContent={editContent}
                  setEditTitle={setEditTitle}
                  setEditContent={setEditContent}
                  editIndex={editIndex}
                  updateNote={updateNote}
                   />
        <SearchBar />
        <NoteList notes={notes}
                  deleteNote={deleteNote}
                  editNote={editNote} />
      </main>

      <Footer />
    </>
  );
}

export default App;