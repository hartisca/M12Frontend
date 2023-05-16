import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

import { HiLocationMarker } from 'react-icons/hi'
import { BsPerson, BsFillDice5Fill, BsDeviceSsd } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

import './layout.css'
import { selectResponseId } from '../Slices/Jugador/jugadorSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectResponseIdPartida } from '../Slices/Partides/partidaSlice';

export const Menu = () => {
  
  let { authToken, setAuthToken } = useContext(UserContext);

  const rutaActual =  window.location.pathname;
  const jugadorId = useSelector(selectResponseId);
  const partidaId = useSelector(selectResponseIdPartida);

  const [motraBoto, setMostrarBoto] = useState(false);

  const sendLogout = async (e) => {
    e.preventDefault();
    try{
        const data = await fetch("http://127.0.0.1:8000/api/logout", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "POST",
        });
        const resposta = await data.json();
        if (resposta.success === true) setAuthToken("")
        else console.log("Error logout")
    }catch{
        console.log(data);        
    }    
  };

  useEffect(() => {
    
    if (rutaActual === '/mapa'){
      setMostrarBoto(true);
    } else{
      setMostrarBoto(false);
    }
  }, [rutaActual]);

  return (
    <>
      <div className="menuheader">
        {/*
        <div className='logo'>
          <img src="" alt="" />
        </div> */}
        <nav>
          <ul className='nav-links'>
            <li><Link to ="/mapa">Mapa</Link></li>
            <li><Link to ={"/jugadors/" + jugadorId}>Jugador</Link></li>
            <li><Link to ={"/partidas/" + partidaId}>Info Partida</Link></li>   
            {motraBoto ? <li><button onClick={''}>Localitza'm</button></li> : <></>}         
          </ul>
        </nav>
              
        <button className="logout justify-content-end" onClick={(e) => {
          sendLogout(e);
            }}> <RiLogoutBoxLine /> Logout
        </button>    
      </div>         
    </>
  );  
}
