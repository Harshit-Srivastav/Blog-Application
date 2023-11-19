import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.js';
import { useHistory } from 'react-router-dom';
import { redirect } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const {setUserInfo, setToken, userInfo} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo && Object.keys(userInfo).length > 0){
     navigate('/')
    }
  }, [userInfo, navigate])

  const login = async (e) => {
   e.preventDefault()
   setMessage('')
   try{
    console.log(email, password)
    if(!email || !password) {
      setMessage('All Fields are required')
      setEmail('')
      setPassword('')
      return
    }
    const result = await axios.post('http://localhost:5000/api/user/login', {
      email,
      password
   })
  
   if(result.data.status) {
    setUserInfo(result.data.user)
    setToken(result.data.token)
    localStorage.setItem('token', JSON.stringify(result.data.token))
    navigate('/', { replace: true })
    window.location.reload()
   } else {
    setMessage('User Login Failed. Please try again')
   }
   } catch(e) {
    setMessage('User Login Failed')
   }
  }
  return (
  <div className="min-h-screen">
     <div className='mt-[4rem] py-8 px-6 rounded-lg sm:px-10'>
       <form className='mt-8 max-w-2xl mx-auto md:w-1/2' onSubmit={login}>
       <h1 className='text-3xl font-semibold bg-gradient-to-r from-teal-600 to-purple-600 text-transparent bg-clip-text '>Login</h1>
        <div className='mt-6'>
        {message &&  <div className="bg-indigo-900 text-center py-2 my-3 lg:px-4" role="alert">
        <div>
          <p className="font-bold text-white font-mono">{message}</p>
        </div>
         
      </div>}
          <label htmlFor="email" className="block text-sm font-bold font-mono text-gray-700 ">Email Address</label>
          <input id='email' name='email' value={email} type='email' placeholder='Enter your email...' required className='w-full border border-gray-700 px-3 py-1 mt-2 rounded-lg shadow-lg focus:outline-none focus:border-indigo-500' onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className='mt-4'>
          <label htmlFor="password" className="block text-sm font-bold font-mono text-gray-700 ">Password</label>
          <input id='password' name='password' value={password} type='password' placeholder='Enter your password...' required className='w-full border border-gray-700 px-3 py-1 mt-2 rounded-lg shadow-lg focus:outline-none focus:border-indigo-500' onChange={e => setPassword(e.target.value)}/>
          <button type='submit' className='w-full mt-8 bg-indigo-600 font-semibold text-white text-sm shadow-sm px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white'>
              Login
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
    </p>
        </div>
      </form> 
      </div>
  </div>
  )
}

export default LoginPage
