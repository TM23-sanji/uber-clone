import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-[url(https://i.pinimg.com/736x/9e/e6/6e/9ee66ebf6b34ff4438bf4609828d2052.jpg)] h-screen w-full pt-8 flex justify-between flex-col'>
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
            <div className=' py-4 px-4'>
                <h2 className='text-2xl font-bold '> Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4 '>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Start