import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/userContext'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const {user, setUser} = React.useContext(UserDataContext)

  const sumbitHandler = async (e) => {
    e.preventDefault()
    const userData={ email:email, password:password }
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status===200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='bg-cover bg-[url(https://i.pinimg.com/474x/d2/14/92/d2149216168cedbf4253337607317c5e.jpg)] p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-5' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

        <form onSubmit={sumbitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder="email@example.com" required />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="password" required />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      <div>
        <Link to='/captain-login' className='bg-[#6d893a] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin