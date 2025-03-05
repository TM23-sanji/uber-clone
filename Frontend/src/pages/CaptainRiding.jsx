import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import MapComponent from '../components/Map'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { y: '0%' })
    } else {
      gsap.to(finishRidePanelRef.current, { y: '100%' })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen relative'>

      <div className='fixed p-6 top-0 flex  items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg  font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-5/6'>
        {/* <img className='h-full w-full object-cover' src="https://i.pinimg.com/736x/4d/b4/cc/4db4cc43defd406d7a1f06a2276d2101.jpg" alt="" /> */}
        <div className='h-full w-full fixed'>
          <MapComponent />
        </div>

      </div>

      <div onClick={()=>{setFinishRidePanel(true)}} className='h-1/6 p-6 pt-10 bg-white flex items-center justify-between relative'>
              <h5 onClick={() => {}} className='p-1 text-center absolute right-0 mr-4 top-0'><i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i></h5>
      <h4 className='text-xl font-semibold font-mono border-b-2 border-b-yellow-500'>4-KM away</h4>
      <button className='bg-green-600 text-white font-semibold p-2 px-10 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>

    </div>

    
  )
}

export default CaptainRiding