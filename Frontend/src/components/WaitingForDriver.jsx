import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
    <h5 onClick={() => {
            props.setWaitingForDriver(false)
        }} className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
    
    <div className='flex items-center justify-between'>
    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png" alt="" />
    <div className='text-right'>
      <h2 className='text-lg font-semibold capitalize'>{props.ride?.captain.fullname.firstname + " " +props.ride?.captain.fullname.lastname}</h2>
      <h4 className='text-xl font-bold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
      <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
      <h1>{props.ride?.otp}</h1>
    </div>
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
    </div>

</div>  ) 
}

export default WaitingForDriver