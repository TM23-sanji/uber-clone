import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {captain, setCaptain}=useContext(CaptainDataContext)

  const navigate=useNavigate()

  const sumbitHandler = async (e) => {
    e.preventDefault()
    const captain={email:email,password:password}
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    
    if (response.status===200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='bg-cover bg-[url(https://i.pinimg.com/474x/1d/1b/d2/1d1bd2394cfa125dc3216a1d8291dc59.jpg)] p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-5' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

        <form onSubmit={sumbitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder="email@example.com" required />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="password" required />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
          <p className='text-center'>Join a Fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>

      <div>
        <Link to='/login' className='bg-[#6d893a] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin