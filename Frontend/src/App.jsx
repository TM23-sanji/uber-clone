import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

import "leaflet/dist/leaflet.css"
{/* <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" /> */}


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />}  />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/user/logout" element={<UserProtectWrapper><UserLogout/></UserProtectWrapper> } />
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>} />
        <Route path='/captain-logout' element={<CaptainProtectWrapper><CaptainLogout/></CaptainProtectWrapper>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />

        <Route path='/riding' element={<Riding/>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App