import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const AddBlog = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState()
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const {userInfo} = useContext(UserContext)

  useEffect(() => {
    if(userInfo && Object.keys(userInfo).length === 0){
     navigate('/')
    }
  }, [userInfo, navigate])

  const createPost = async (e) => {

    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    try{
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }
      const result = await axios.post('http://localhost:5000/api/post', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      if(result.data.success){
        navigate('/', { replace: true })
        window.location.reload()
      } else {
        setMessage('Please Try Again...')
      }
    } catch(e){
      setMessage(e.message)
    }
    

  }
  return (
    <div className='mt-[4rem]'>

      <form className='grid gap-4 mt-5 md:w-3/4 mx-auto' onSubmit={createPost}>
      {message &&  <div className="bg-indigo-900 text-center py-2 my-3 lg:px-4" role="alert">
        <div>
          <p className="font-bold text-white font-mono">{message}</p>
        </div>
      </div>}
        <p className='text-3xl font-extrabold font-mono text-center'>Add Post</p>
        <input type='text' className='p-1 rounded-sm' value={title} onChange={e => setTitle(e.target.value)} required placeholder={'Title'} />
        <input type='text' className='p-1 rounded-sm' value={summary} onChange={e => setSummary(e.target.value)} required placeholder={'Summary'} />
        <input type='file' onChange={e => setFiles(e.target.files)} required/>
        <ReactQuill value={content} onChange={(newValue) => setContent(newValue)}/>
        <button className='w-full mt-[3rem] bg-indigo-600 font-semibold text-white text-md shadow-sm px-2 py-1 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white' type="submit">Add Post</button>
      </form>
    </div>
  )
}

export default AddBlog
