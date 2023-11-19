import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const Posts = () => {
 const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get('http://localhost:5000/api/post')
      result.data.success ? setPosts(result.data.posts): setPosts([])
    }
    fetchPosts()
  }, [])
  return (
    <>
      <div className='grid gap-5 px-2 mt-[3rem]'>
          {posts.map((post) => {
              return <article key={post._id} className='grid gap-[2rem] max-w-5xl md:grid-cols-2'>
                        <div className='aspect-w-3 aspect-h-2 md:aspect-h-1 md:aspect-w-2 max-w-lg'>
                                  <img src={`http://localhost:5000/${post.img}
                              `} className="object-cover rounded-xl shadow-lg" alt='Byjus'/>
                        </div>
                        <div className='py-5'>
            <Link to={`/post/${post._id}`}>
              <h2 className='font-sans line-clamp-2 text-[1.5rem]	font-extrabold'  >{post.title}</h2>
            </Link>
            <p className='grid grid-cols-2 py-2 capitalize'>
                <a href='/' className='text-md font-sans tracking-widest'>{post.author.name}</a>
                <time className=''>{
                   new Date().toLocaleDateString()
                  }</time>
              </p>
            <Link to={`/post/${post._id}`}>
            <p className='font-mono text-md font-extralight font-medium line-clamp-3'>{post.summary}</p>
            </Link>
            
            </div>
              </article>
            })}
        </div>
    </>
  )
}

export default Posts
