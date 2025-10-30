import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../components/lib/axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'

export const CreateNote = () => {
  const [ title, setTitle] = useState("")
  const [content, setContent ] = useState("")
  const [loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("All fields required...");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully...")
      navigate("/")
    } catch (error) {
      console.log("Error while creating notes...", error)
      if(error.response.status === 429){
        toast.error("Slow Down Creating too many notes...",{
          duration:4000,
          icon:"☠️"
        })
      }else{
        toast.error("Error creating notes...")
      }
      
      
    } finally{
      setLoading(false)
    }

  }


  return (
  <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Link to={"/"} className="btn btn-ghost mb-6">
        <ArrowLeftIcon className='size-5'/>
        Back to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4 '>Create Note</h2>
            <form 
            onSubmit={handleSubmit}
            >
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                placeholder='Note title'
                className='input input-bordered'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <input type="text"
                placeholder='Note content'
                className='input input-bordered'
                value={content}
                onChange={(e) => setContent(e.target.value)} />

              </div>

              <div className='card-actions justify-end'>
              <button type='submit' className='btn btn-primary ' disabled= {loading}>
                { loading ? "Creating..." : "Create Note"}

              </button>
            </div>
            </form>

            

          </div>

        </div>

      </div>

    </div>

  </div>
  );
}
export default CreateNote;