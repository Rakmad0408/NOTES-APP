import { useEffect, useState } from "react";
import axios from "axios";
const NoteModal = ({closeModal, fetchNotes, currentNote}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    if(currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentNote) {
      try {
        const res = await axios.put(`http://localhost:5000/api/notes/updateNote/${currentNote._id}`,
          { title, description }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

        if(res.data.success) {
          alert(res.data.message);
          setTitle("");
          setDescription("");
          fetchNotes();
          closeModal();
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Error updating note");
        
      }
    }else {
        try {

        const res = await axios.post("http://localhost:5000/api/notes/addNote",
          { title, description },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )

        if(res.data.success) {
          alert(res.data.message);
          setTitle("");
          setDescription("");
          fetchNotes();
          closeModal();
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Error adding note");
      }
    }
  };

    

  return (
    <div className="fixed inset-0 bg-gray-800/75 transition-opacity flex items-center justify-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">{ currentNote ? "Edit Note" : "Add New Note"}</h2>
        <form onSubmit={handleSubmit}>

          <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Note Title"
            className="border-2 border-gray-300 p-2 w-full mb-4 rounded-sm"
          />

          <textarea 
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Note Description"
            className="border-2 border-gray-300 p-2 w-full h-36 mb-4 rounded-sm"
          />

          <div className="flex justify-between">
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-600 transition duration-200 font-bold"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
            <button
              type="button" 
              className="text-white bg-red-500 px-4 py-2 font-bold rounded-sm cursor-pointer hover:bg-red-600 transition duration-200"
              onClick={closeModal}
            >
              Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteModal
