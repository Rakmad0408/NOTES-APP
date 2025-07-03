import axios from 'axios';
import {FaEdit, FaTrash} from 'react-icons/fa';




const NoteCard = ({note, onEdit, fetchNotes}) => {

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/notes/deleteNote/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      if(res.data.success){
        alert(res.data.message);
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
      
    }
  }


  return (
    <div className="bg-white p-4 rounded-sm shadow-md">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end mt-2">
        <button className="text-blue-500 mr-2 cursor-pointer" onClick={() => onEdit(note)}>
          <FaEdit />
        </button>
        <button className="text-red-500 cursor-pointer" onClick={() => deleteNote(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default NoteCard
