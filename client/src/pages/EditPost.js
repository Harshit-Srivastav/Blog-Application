import React, { useEffect, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import axios from 'axios'
import { UserContext } from '../context/userContext';

const EditPost = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState()
    const [existingFileName, setExistingFileName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const params = useParams()
    const id = params.id
    const {userInfo} = useContext(UserContext)


    useEffect(() => {
        if(userInfo && Object.keys(userInfo).length === 0){
         navigate('/')
        }
      }, [userInfo, navigate])
      
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const {data} = await axios.get(`http://localhost:5000/api/post/${id}`)
                if(data.post){
                    const {post} = data
                    setTitle(post.title)
                    setSummary(post.summary)
                    setContent(post.content)
                    const existingFile = post.img.split('\\')[1]
                    setExistingFileName(existingFile)
                }
            
            } catch(e){
            console.log(e)
            }
        }
        fetchPost()
    }, [existingFileName, id])

    const updatePost = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        if(files && files[0]){
            data.set('file', files[0])
        }
    
    try{
     
      const result = await axios.post(`http://localhost:5000/api/post/edit/${id}`, data, {
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
      setMessage('Try Again...')
    }
    
  }

  return (
    <div>
         <div className='mt-[4rem]'>

<form className='grid gap-4 mt-5 md:w-3/4 mx-auto' onSubmit={updatePost}>
{message &&  <div className="bg-indigo-900 text-center py-2 my-3 lg:px-4" role="alert">
  <div>
    <p className="font-bold text-white font-mono">{message}</p>
  </div>
</div>}
  <p className='text-3xl font-extrabold font-mono text-center'>Edit Post</p>
  <input type='text' className='p-1 rounded-sm' value={title} onChange={e => setTitle(e.target.value)} required placeholder={'Title'} />
  <input type='text' className='p-1 rounded-sm' value={summary} onChange={e => setSummary(e.target.value)} required placeholder={'Summary'} />
  {existingFileName.length > 0 && <p>{existingFileName}</p>}
  <input type='file' onChange={e =>{
    setFiles(e.target.files)}}/>
  <ReactQuill value={content} onChange={(newValue) => setContent(newValue)}/>
  <button className='w-full mt-[3rem] bg-indigo-600 font-semibold text-white text-md shadow-sm px-2 py-1 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white' type="submit">Add Post</button>
</form>
</div>
    </div>
  )
}

export default EditPost
