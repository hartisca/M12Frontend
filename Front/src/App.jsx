import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./UserContext";
import { LoginRegister } from './auth/LoginRegister';
import { Menu } from './componentsLayout/Menu';
import  BotoBack  from './componentsLayout/BotoBack'
import PartidasList from './components/Partides/PartidasList';
import NotFound from './NotFound';
import { PartidaShow } from './components/Partides/PartidaShow';

import { EquipsList } from './components/Equips/EquipsList'
import { Jugador }  from './components/Jugadors/Jugador';



function App() {
  let [ authToken, setAuthToken ] = useState("");
  let [ usuari, setUsuari ] = useState("");
  let [ email, setUserEmail ] = useState(""); 

  useEffect(() => {
    
  }, [usuari]);

  return (
    <>
    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken, email, setUserEmail }}>
      {authToken ? ( 
        <> 
        <Menu />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<PartidasList />} />
          <Route path="/partidas" element={<PartidasList />} />
          <Route path="/partidas/:id" element={ <PartidaShow /> } /> {/*Canviar per EquipsList*/}
          <Route path="/equips/list/:id" element={<EquipsList />} />
          <Route path="/jugadors/:id" element={<Jugador />} />
        </Routes>
        <BotoBack />
      </> )
    : (<LoginRegister />)}
    </UserContext.Provider>
    </>
  )
}

export default App
