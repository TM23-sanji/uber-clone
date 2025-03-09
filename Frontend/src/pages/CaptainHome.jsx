import React, { useRef, useState, useEffect,useContext } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import MapComponent from '../components/Map';
import {SocketContext} from '../context/socketContext';
import {CaptainDataContext} from '../context/captainContext';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const {captain} = useContext(CaptainDataContext);
  const {socket} = useContext(SocketContext);

  useEffect(() => {
    socket.emit('join', {userId: captain._id, userType: 'captain'});
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', { userId: captain._id, location:{ltd: position.coords.latitude, lng:position.coords.longitude} });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation()
    // return () => clearInterval(locationInterval);
  })

  socket.on('new-ride',(data)=>{
    console.log(data);
  })

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, { y: '0%' })
    } else {
      gsap.to(ridePopupPanelRef.current, { y: '100%' })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, { y: '0%' })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, { y: '100%' })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex  items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg  font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <div className='h-full w-full fixed'>
          <MapComponent />
        </div>
      </div>

      <div className='h-2/5 p-6 fixed bg-white w-full'>
      <CaptainDetails/>
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>


    </div>
  )
}

export default CaptainHome