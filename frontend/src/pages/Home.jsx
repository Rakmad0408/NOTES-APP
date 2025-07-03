import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import { FaPlus } from "react-icons/fa6";
import NoteModal from '../components/NoteModal';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);



  useEffect(() => {
    if (query) {
      const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(query.toLowerCase()) || 
        note.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [query, notes]);

  const fetchNotes = async ()=>{
    try {
      const res = await axios.get("http://localhost:5000/api/notes/getNotes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setNotes(res.data.notes);
      console.log(res.data.notes);
    } catch (error) {
      console.log(error)
    }
  };


  const onEdit = (note)=>{
    setIsModalOpen(true);
    setCurrentNote(note);
  }


  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setQuery={setQuery}/>

      <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        { filteredNotes.length > 0 ? filteredNotes.map( (note, index) => (
          <NoteCard
            key={index} 
            note={note} 
            onEdit={onEdit}
            fetchNotes={fetchNotes}
          />
        )) : <p className="font-bold text-4xl text-gray-400">No notes Avaliable</p>}
      </div>
      

      <button 
        onClick={()=>setIsModalOpen(true)}
        className="fixed bottom-14 right-16 bg-orange-400 text-white text-2xl p-4 rounded-full cursor-pointer hover:bg-orange-500 transition duration-200">
        <FaPlus />
      </button>
      {isModalOpen && <NoteModal closeModal={closeModal} fetchNotes={fetchNotes} currentNote={currentNote}/>}

    </div>
  )
}

export default Home
