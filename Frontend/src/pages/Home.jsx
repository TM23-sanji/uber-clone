import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import MapComponent from '../components/Map';
import axios from 'axios';
import { SocketContext } from '../context/socketContext';
import {UserDataContext} from '../context/userContext';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [suggestions,setSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType,setVehicleType] = useState('')

  const [pickupOn,setPickupOn] = useState(false)
  const [destinationOn,setDestinationOn] = useState(false)

  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [ride, setRide] = useState(null)
  const navigate=useNavigate()

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const {socket} = React.useContext(SocketContext)
  const {user} = React.useContext(UserDataContext)

  useEffect(()=>{
    socket.emit('join',{userType:'user',userId:user._id})
  },[user])

  useEffect(() => {
    const handleRideConfirmed = (ride) => {
      console.log('Ride Confirmed:', ride);
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    };
  
    const handleRideStarted = (ride) => {
      console.log('Ride Started:', ride);
      setWaitingForDriver(false);
      navigate('/riding',{state:{ride}});
    };
    socket.on('ride-confirmed', handleRideConfirmed);
    socket.on('ride-started', handleRideStarted);
  
    // Cleanup listeners on unmount
    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]); // Ensure `navigate` is included in dependencies
  

  const fetchSuggestions = async (query) =>{
    if (!query || query.length<4) {
      setSuggestions([])
      return
    }
    try {
      const token=localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      
      setSuggestions(response.data || [])
      console.log(response.data)
    }
    catch (err){
      console.error('Error fetching suggestions:', err);
    }
  }

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
            <input value={pickup} onClick={() => { setPanelOpen(true); setPickupOn(true); setDestinationOn(false) }} onChange={(e) => { setPickup(e.target.value);fetchSuggestions(e.target.value) }} className='bg-[#eee] px-12 py-1 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input value={destination} onClick={() => { setPanelOpen(true);setDestinationOn(true); setPickupOn(false) }} onChange={(e) => { setDestination(e.target.value),fetchSuggestions(e.target.value) }} className='bg-[#eee] px-12 py-1 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-[0%] bg-white '>
          <LocationSearchPanel fare={fare} setFare={setFare} pickup={pickup} destination={destination} pickupOn={pickupOn} destinationOn={destinationOn} setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} suggestions={suggestions} setPickup={setPickup} setDestination={setDestination} setPickupOn={setPickupOn} setDestinationOn={setDestinationOn} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <VehicalPanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRide vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />        
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 '>
        <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver}/>
      </div>
      
    </div>
  )
}

export default Home