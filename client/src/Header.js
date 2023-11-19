import React, { useContext, useEffect, useState } from 'react'
import bloglogo from './images/blog-solid.svg'
import { UserContext } from './context/userContext.js';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const Header = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [userStatus, setUserStatus] = useState(false)
  const {setUserInfo, userInfo} = useContext(UserContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }

  useEffect(() => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    }
    const fetchUserProfile = async () => {
      try{
        const result = await axios.get('http://localhost:5000/api/user/profile', axiosConfig)
        result.data ? setUserInfo(result.data.user) : setUserInfo(undefined)
        setUserStatus(result.data.status)
      } catch(e){
        setUserStatus(false)
      }
      
    }
    fetchUserProfile()
  }, [token, setUserInfo])
  return (
    <header className='flex flex-row justify-between'>
          <a href='/' className='hidden sm:inline-block'>
            <img src={bloglogo} className='w-9' alt='Blog'/>
          </a>    
        
         {userStatus ? <nav className='flex gap-[3rem] align-top'>
          <p className='text-lg p-2'>
          Welcome {userInfo.name.split(' ')[0]}
          </p>
          <button onClick={() => navigate('/addBlog')}>Add Blog</button>
          <button className='text-lg' onClick={handleLogout}>Logout</button>
          </nav>: <nav className='flex gap-[3rem]'>
            <a href="/login" >Login</a>
            <a href="/register" >Register</a>
            </nav>}
         
        </header>
  )
}

export default Header
