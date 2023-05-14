import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

import { HiLocationMarker } from 'react-icons/hi'
import { BsPerson, BsFillDice5Fill, BsDeviceSsd } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

import './layout.css'

export const Menu = () => {

  
  let { authToken, setAuthToken } = useContext(UserContext);

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

  return (
    <>
      <div className="menuheader">
        {/*
        <div className='logo'>
          <img src="" alt="" />
        </div> */}
        <nav>
          <ul className='nav-links'>
            <li><Link to ="#"></Link>Mapa</li>
            <li><Link to ="#"></Link>Jugador</li>
            <li><Link to ="#"></Link>Info Partida</li>
            <li><Link to ="#"></Link>Settings</li>
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
