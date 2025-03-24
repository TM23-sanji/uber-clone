import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MapComponent from '../components/Map'

const Riding = () => {
    const location= useLocation();
    const {ride}=location.state || {}
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 right-2 top-2 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg  font-medium ri-home-4-line"></i>
            </Link>

            <div className='h-1/2'>
                {/* <img className='h-full w-full object-cover' src="https://i.pinimg.com/736x/4d/b4/cc/4db4cc43defd406d7a1f06a2276d2101.jpg" alt="" /> */}
                 <div className='h-[50%] w-full fixed'>
                    <MapComponent />
                </div>               

            </div>

            <div className='h-1/2 p-4'>

                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-semibold capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-bold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 justify-between items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-4 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-bold'>562/11-A</h3>
                                <p className='text-gray-700 text-sm'>{ride?.destination}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 p-3 '>
                            <i className="text-xl ri-money-rupee-circle-line"></i>
                            <div>
                                <h3 className='text-lg font-bold'>{ride?.fare}</h3>
                                <p className='text-gray-700 text-sm'>Cash Payment</p>
                            </div>
                        </div>


                    </div>
                </div>
                <button className=' mt-3 w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding