import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/userContext'
// import { loginUser } from '../../../Backend/controllers/user.controller'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const {user, setUser} = React.useContext(UserDataContext)

  const sumbitHandler = async (e) => {
    e.preventDefault()
    const newUser= { fullname:{firstname:firstName, lastname:lastName}, email:email, password:password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    console.log(response)

    if (response.status===201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
      
    }
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div>
      <div className='bg-cover bg-[url(https://i.pinimg.com/736x/29/7c/71/297c71377afb169a67e974650a0597d1.jpg)] p-7 flex flex-col justify-between h-screen'>
        <div>
          <img className='w-20 mb-5' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

          <form onSubmit={sumbitHandler}>
            <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
            <div className='flex gap-3 mb-7'>
              <input value={firstName} onChange={(e)=>{
                setFirstName(e.target.value)
              }} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base' type="text" placeholder="First name" required />
              <input value={lastName} onChange={(e)=>{
                setLastName(e.target.value)
              }} className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' type="text" placeholder="Last name" required />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
            <input value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder="email@example.com" required />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="password" required />
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>

        <div>
          <Link to='/captain-signup' className='bg-[#6d893a] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
      </div>
    </div>
  )
}

export default UserSignup