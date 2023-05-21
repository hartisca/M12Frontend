import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./UserContext";
import { LoginRegister } from './auth/LoginRegister';
import { Menu } from './componentsLayout/Menu';
import { MenuLogout } from './componentsLayout/MenuLogout';

import  BotoBack  from './componentsLayout/BotoBack'
import PartidasList from './components/Partides/PartidasList';
import NotFound from './NotFound';
import { PartidaShow } from './components/Partides/PartidaShow';

import { EquipsList } from './components/Equips/EquipsList'
import { Jugador }  from './components/Jugadors/Jugador';
import Mapa from './components/Maps/partidaMap';
import { PartidaMenu } from './components/Partides/PartidaMenu';
import {Home} from './components/Home';



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
        
        <Routes>
          <Route path="*" element={<> <NotFound /><MenuLogout /> </>} />
          <Route path="/" element={<> <Home /><MenuLogout /> </>} />
          <Route path="/partidas" element={ <><PartidasList /><PartidaMenu /></>} />
          <Route path="/partidas/:id" element={ <> <PartidaShow /><Menu /> </> } /> 
          <Route path="/equips/list/:id" element={<><EquipsList /><MenuLogout /></>} />
          <Route path="/jugadors/:id" element={<><Jugador /><Menu /></>} />
          <Route path="/mapa/:id" element={<><Mapa /><Menu /></>} />
        </Routes>
        <BotoBack />
      </> )
    : (<LoginRegister />)}
    </UserContext.Provider>
    </>
  )
}

export default App
