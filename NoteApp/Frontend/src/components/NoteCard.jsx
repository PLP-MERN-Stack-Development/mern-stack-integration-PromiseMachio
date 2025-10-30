import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router';
import { formatDate } from './lib/utility.js'
import api from './lib/axios.js'
import toast from 'react-hot-toast';


export const NoteCard = ({note, setNotes}) => {
  const handleDelete = async (e, id) =>{
    e.preventDefault();
    if(!window.confirm("Proceed deleting notes...")) return

    try {
      await api.delete(`notes/${id}`);
      setNotes((prev)=> prev.filter(note => note._id !== id))
      toast.success('Note deleted successfully...')
    } catch (error) {
      console.log("Error deleting notes...", error)
      toast.error("Error deleting notes...")
      
    }


  }


  return <Link to={`/note/${note._id}`}
  className=" card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
  <div className='card-body'>
    <h3 className='card-title text-base-content'>{note.title}</h3>
    <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
    <div className='card-actions justify-between items-center mt-4'>
        <span className='text-xs text-base-content/60'>
            {formatDate(note.createdAt)}
        </span>
        <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)} >
                <Trash2Icon className='size-4' />
            </button>

        </div>

    </div>


  </div>
  
  </Link>
}
export default NoteCard;