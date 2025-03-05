import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {CaptainDataContext} from '../context/captainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')

  const navigate = useNavigate()

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const sumbitHandler = async (e) => {
    e.preventDefault()
    const captainData=({ fullName: { firstName: firstName, lastName: lastName }, email: email, password: password, vehicle: { type: vehicleType, color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity } })
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status===201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
  }
    return (
      <div className='bg-cover bg-[url(https://i.pinimg.com/474x/7a/25/cd/7a25cdc4a60cc8e4c743f8804604271b.jpg)] p-7 flex flex-col justify-between h-screen'>
      <div>
          <div>
            <img className='w-20 mb-5' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

            <form onSubmit={sumbitHandler}>
              <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
              <div className='flex gap-3 mb-7'>
                <input value={firstName} onChange={(e) => {
                  setFirstName(e.target.value)
                }} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base' type="text" placeholder="First name" required />
                <input value={lastName} onChange={(e) => {
                  setLastName(e.target.value)
                }} className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' type="text" placeholder="Last name" required />
              </div>

              <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
              <input value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder="email@example.com" required />

              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="password" required />
              <h3 className='text-lg font-medium mb-2'>Vehicle Type</h3>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required>
                <option value="" disabled>Select vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

              <h3 className='text-lg font-medium mb-2'>Vehicle Color</h3>
              <input value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="text" placeholder="Vehicle color" required />

              <h3 className='text-lg font-medium mb-2'>Vehicle Plate</h3>
              <input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="text" placeholder="Vehicle plate" required />

              <h3 className='text-lg font-medium mb-2'>Vehicle Capacity</h3>
              <input value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="number" placeholder="Vehicle capacity" required />
              <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
            </form>
            <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
          </div>

          <div>
            <Link to='/signup' className='bg-[#6d893a] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
          </div>
        </div>
      </div>
    )
  }

  export default CaptainSignup