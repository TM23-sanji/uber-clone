import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import MapComponent from '../components/Map';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '73%', padding: '24px' })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: '0px' })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { y: '0%' })
    } else {
      gsap.to(vehiclePanelRef.current, { y: '100%' })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { y: '0%' })
    } else {
      gsap.to(confirmRidePanelRef.current, { y: '100%' })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { y: '0%' })
    } else {
      gsap.to(vehicleFoundRef.current, { y: '100%' })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { y: '0%' })
    } else {
      gsap.to(waitingForDriverRef.current, { y: '100%' })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen  relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        <div className='h-full w-full fixed'>
          <MapComponent />
        </div>

      </div>

      <div className='h-screen flex flex-col justify-end  top-0 absolute w-full  rounded-lg'>
        <div className='h-[27%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 text-2xl' onClick={() => { setPanelOpen(false) }}><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-bold'>Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-12 w-1 top-[50%] left-10 bg-gray-900 rounded-full"></div>
            <input value={pickup} onClick={() => { setPanelOpen(true) }} onChange={(e) => { setPickup(e.target.value) }} className='bg-[#eee] px-12 py-1 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input value={destination} onClick={() => { setPanelOpen(true) }} onChange={(e) => { setDestination(e.target.value) }} className='bg-[#eee] px-12 py-1 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-[0%] bg-white '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <VehicalPanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />        
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 '>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
      
    </div>
  )
}

export default Home