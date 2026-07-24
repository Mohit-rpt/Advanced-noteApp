function NoteCard({title,content,onDelete,onEdit}){
    return(
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    )
}

export default NoteCard;