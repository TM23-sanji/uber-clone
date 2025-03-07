import React from 'react'
import axios from 'axios'

const ConfirmRide = (props) => {
    const createRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup: props.pickup,
                destination: props.destination,
                vehicleType: props.vehicleType
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
    }

    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePanel(false)
            }} className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>

            <h4 className='text-xl font-bold mb-3'>Confirm your Ride</h4>

            <div className='flex flex-col gap-2 justify-between items-center'>
                <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png" alt="" />
                <div className='w-full'>

                    <div className='flex items-center gap-4 p-3 border-b-2'>
                        <i className="text-xl ri-home-3-fill"></i>
                        <div>
                            <h3 className='text-lg font-bold'>562/11-A</h3>
                            <p className='text-gray-700 text-sm'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-bold'>562/11-A</h3>
                            <p className='text-gray-700 text-sm'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 '>
                        <i className="text-xl ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-bold'>
                                {props.vehicleType === 'car' ? props.fare.car :
                                    props.vehicleType === 'auto' ? props.fare.auto :
                                        props.vehicleType === 'motorcycle' ? props.fare.motorcycle :
                                            'Error'}                    </h3>
                            <p className='text-gray-700 text-sm'>Cash Payment</p>
                        </div>
                    </div>


                </div>
                <button onClick={() => { props.setVehicleFound(true), props.setConfirmRidePanel(false),createRide() }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmRide