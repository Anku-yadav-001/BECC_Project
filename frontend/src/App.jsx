import { useState } from 'react'
import './App.css'
import {Login} from './Pages/Login.jsx'
import {Navbar} from './Components/Navbar.jsx'
import { AllRoutes } from './Routes/AllRoutes.jsx'
function App() {
  return (
    <>
    <Navbar/>
    <AllRoutes/>
    </>
  )
}

export default App
