import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div >
    <h5 onClick={() => {
        props.setFinishRidePanel(false)

    }} className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>

    <h4 className='text-xl font-bold mb-3'>Finish this Ride!</h4>

    <div className='flex items-center justify-between mt-2 p-3 border-2 border-yellow-500 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://i.pinimg.com/474x/d6/d2/9d/d6d29d91b2045fe84eb2adef85edbc2c.jpg" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+ " "+ props.ride?.user.fullname.lastname}</h2>
        </div>

        <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>

    <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full'>

            <div className='flex items-center gap-4 p-3 border-b-2'>
                <i className="text-xl ri-home-3-fill"></i>
                <div>
                    <h3 className='text-lg font-bold'>562/11-A</h3>
                    <p className='text-gray-700 text-sm'>{props.ride?.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-4 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-bold'>562/11-A</h3>
                    <p className='text-gray-700 text-sm'>{props.ride?.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-3 p-3 '>
                <i className="text-xl ri-money-rupee-circle-line"></i>
                <div>
                    <h3 className='text-lg font-bold'>{props.ride?.fare}</h3>
                    <p className='text-gray-700 text-sm'>Cash Payment</p>
                </div>
            </div>

        </div>

        <div className='mt-6 w-full'>
            <Link to='/captain-home' className='w-full flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</Link>
        </div>
    </div>

</div>
  )
}

export default FinishRide