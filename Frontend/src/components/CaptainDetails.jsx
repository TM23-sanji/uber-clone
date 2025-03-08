import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/captainContext'

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
                <div className='flex items-center justify-between'>

<div className='flex items-center justify-start gap-3'>
  <img className='h-10 w-10 rounded-full object-cover' src="https://i.pinimg.com/736x/86/d9/40/86d9406158bb197f36567587a07605cf.jpg" alt="" />
  <h4 className='text-lg capitalize font-semibold'>{captain.fullname.firstname + " "  }</h4>
</div>

<div>
  <h4 className='text-xl font-bold'>₹295.20</h4>
  <p className='text-sm font-medium text-gray-600'>Earned</p>
</div>

</div>

<div className='flex p-3 mt-8 bg-gray-100 rounded-xl items-start justify-center gap-5'>
<div className='text-center'>
  <i className="text-3xl mb-2 font-medium ri-timer-2-line"></i>
  <h5 className='text-lg font-medium'>10.2 </h5>
  <p className='text-sm text-gray-600'>Hours Online</p>
</div>
<div className='text-center'>
  <i className="text-3xl mb-2 font-medium ri-speed-up-line"></i>
  <h5 className='text-lg font-medium'>10.2 </h5>
  <p className='text-sm text-gray-600'>Hours Online</p>            
</div>
<div className='text-center'>
  <i className='text-3xl mb-2 font-medium ri-booklet-line'></i>
  <h5 className='text-lg font-medium'>10.2 </h5>
  <p className='text-sm text-gray-600'>Hours Online</p>
</div>
</div>
    </div>
  )
}

export default CaptainDetails