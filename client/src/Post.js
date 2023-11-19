import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const SinglePost = () => {
  const [post, setPost] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState()
  const [userStatus, setUserStatus] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try{
     const result =   await axios.get(`http://localhost:5000/api/post/${id}`)
     result.data.success ? setPost(result.data.post) : setMessage('No Post Found')
      } catch(e){
     setMessage('No Post Found. Please try again')
      }
    }
    fetchData()
  }, [id])
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const result = await axios.get(`http://localhost:5000/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(result.data.status){
          setUser(result.data.user)
          setUserStatus(true)
        }
      } catch(e){
        setUserStatus(false)
      }
    }
    fetchUser()
  }, [token])
  
  const handleDelete = async () => {
    try{
      const result =  await axios.delete(`http://localhost:5000/api/post/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(result.data)
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
   <article className='grid gap-2 mt-[2rem]'>
    {Object.keys(post).length > 0 ? <div>
      <div className='aspect-w-3 aspect-h-2 md:aspect-h-1 md:aspect-w-3 max-w-full'>
              <img src={`http://localhost:5000/${post.img}
          `} className="object-cover rounded-xl shadow-lg" alt='Byjus'/>
    </div>
    <div className='py-5'>
    <h2 className='font-sans line-clamp-2 text-[1.5rem]	font-extrabold text-center' >{post.title}</h2>
    <p className='flex gap-[2rem] justify-center mt-1'>
    <Link to='/' className='font-mono tracking-widest font-extralight'>{post.author.name}</Link>
    <time className='italic'>{
    new Date().toLocaleDateString()
    }</time>
    </p>
    
      <div dangerouslySetInnerHTML={{__html: post.content}} className='mt-2 p-2 tracking-normal	leading-8'></div>
    <p className='flex gap-3 py-2 justify-center'>
    {user && Object.keys(user).length > 0 && user._id === post.author._id ? <Link to={`/edit/post/${post._id}`} className='mt-5 bg-indigo-600 font-semibold text-white text-sm shadow-sm px-5 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white'>Edit</Link> : ''}
    {user && Object.keys(user).length > 0 && user._id === post.author._id ? <button onClick={handleDelete} className='mt-5 bg-indigo-600 font-semibold text-white text-sm shadow-sm px-5 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white'>Delete</button> : ''}
    </p>
    </div>
    </div>
   : 'No Post Found'}
  </article>
    
  )
}

export default SinglePost;
