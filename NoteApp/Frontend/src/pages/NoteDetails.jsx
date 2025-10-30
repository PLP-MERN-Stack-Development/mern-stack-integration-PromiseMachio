import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from "../components/lib/axios.js"
import toast from 'react-hot-toast'
import { Route } from 'react-router'
import {  ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

export const NoteDetails = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();
  const  {id} = useParams()

  // Fetch the actuall note
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        
      } catch (error) {
        console.log('Error in fetching note...', error)
        toast.error("Failed to fetch note...")
        
      } finally{
        setLoading(false)
      }
    }

  fetchNotes();
  }, [id])
  const handleDelete = async () => {

    if(!window.confirm("Proceed to delete..."))
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted sucessfully...")
      navigate("/")
      
    } catch (error) {
      console.log("Error while deleting...", error)
      toast.error("Error deleting note...")
      
      
    }
    

  }
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Add title and content to create...")
      return
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note updated successfully...')
      navigate("/")
      
    } catch (error) {
      console.log("Error while updating...", error)
      toast.error("Error updating note...")
      
    }finally{
      setSaving(false)
    }

  }

  // Loading spinner
  if(loading) return(
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
    <LoaderIcon className='animate-spin size-10' />
    
    </div>
  )

  if (!note) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <p className="text-lg text-gray-500">Note not found.</p>
      </div>
    )
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto" >
          <div className="flex justify-between mb-6">
            <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='size-5' />
            Back To Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-5' />
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                placeholder='Title'
                className='input input-bordered'
                value={note.title}
                onChange={(e) => setNote({...note, title:e.target.value})} />
              </div>

              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <input type="text"
                placeholder='Content'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e) => setNote({...note, content:e.target.value})} />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Saving changes..."}

                </button>
              </div>
            </div>

          </div>


        </div>

      </div>

    </div>
    
  );
}
export default NoteDetails;