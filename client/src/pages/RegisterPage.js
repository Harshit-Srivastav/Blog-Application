import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.js';


const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const {setUserInfo, setToken, userInfo} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo && Object.keys(userInfo).length > 0){
      console.log(userInfo)
     navigate('/')
    }
  }, [userInfo, navigate])

  const register = async (e) => {
   e.preventDefault()
   setMessage('')
   try{
    if(!name || !email || !password) {
      setMessage('All Fields are required')
      setName('')
      setEmail('')
      setPassword('')
      return
    }
    if(password.length < 4){
      setMessage('Password length should be greater than 4')
    }
    const result = await axios.post('http://localhost:5000/api/user/register', {
      name,
      email,
      password
   })
   
   if(result.data.status) {
    setUserInfo(result.data.user)
    setToken(result.data.token)
    
    localStorage.setItem('token', JSON.stringify(result.data.token))
    navigate('/');
    window.location.reload()
   } else {
    setMessage('User Registration Failed. Please try again')
   }
   } catch(e) {
    setMessage('User Registration Failed')
   }
  }
  return (
    <div className="min-h-screen">
    <div className='mt-[4rem] py-8 px-6 rounded-lg sm:px-10'>
      <form className='mt-8 max-w-full mx-auto xs:w-1 md:w-1/2' onSubmit={register}>
      <h1 className='text-3xl font-semibold bg-gradient-to-r from-teal-600 to-purple-600 text-transparent bg-clip-text '>Register</h1>
      <div className='mt-6'>
       
      {message &&  <div className="bg-indigo-900 text-center py-2 my-3 lg:px-4" role="alert">
        <div>
          <p className="font-bold text-white font-mono">{message}</p>
        </div>
         
      </div>}
         <label htmlFor="name" className="block text-sm font-bold font-mono text-gray-700 ">Enter Name</label>
         <input id='name' name='name' type='text' placeholder='Enter your name...' value={name} onChange={e => setName(e.target.value)} required className='w-full border border-gray-700 px-3 py-1 mt-2 rounded-lg shadow-lg focus:outline-none focus:border-indigo-500'/>
       </div>
       <div className='mt-6'>
         <label htmlFor="email" className="block text-sm font-bold font-mono text-gray-700 ">Email Address</label>
         <input id='email' name='email' type='email' placeholder='Enter your email...' value={email} onChange={e => setEmail(e.target.value)} required className='w-full border border-gray-700 px-3 py-1 mt-2 rounded-lg shadow-lg focus:outline-none focus:border-indigo-500'/>
       </div>
       <div className='mt-4'>
         <label htmlFor="password" className="block text-sm font-bold font-mono text-gray-700 ">Password</label>
         <input id='password' name='password' type='password' placeholder='Enter your password...' value={password} onChange={e => setPassword(e.target.value)} required className='w-full border border-gray-700 px-3 py-1 mt-2 rounded-lg shadow-lg focus:outline-none focus:border-indigo-500'/>
         <button type='submit' className='w-full mt-8 bg-indigo-600 font-semibold text-white text-sm shadow-sm px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-teal-500 hover:white'>
             Regiser
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

export default RegisterPage
