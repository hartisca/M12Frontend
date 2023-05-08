import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginRegister } from './auth/LoginRegister';

import { UserContext } from "./UserContext";



function App() {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [idUser, setIdUser] = useState("");

  

  return (
    <>
    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken,idUser, setIdUser }}>
      {authToken ? (<LoginRegister />) : (<>Va el token</>)}
      
    </UserContext.Provider>
    </>
  )
}

export default App
