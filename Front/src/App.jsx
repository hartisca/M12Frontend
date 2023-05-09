import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext } from "./UserContext";
import { LoginRegister } from './auth/LoginRegister';
import PartidasList from './components/Partides/PartidasList'



function App() {
  let [ authToken, setAuthToken ] = useState("");
  let [ usuari, setUsuari ] = useState("");
  let [ email, setUserEmail ] = useState(""); 

  

  return (
    <>
    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken, email, setUserEmail }}>
      {authToken ? (<PartidasList />) : (<LoginRegister />)}
      
    </UserContext.Provider>
    </>
  )
}

export default App
