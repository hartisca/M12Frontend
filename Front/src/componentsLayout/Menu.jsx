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
import { selectMapaIdPartida } from '../Slices/Partides/partidaSlice';

export const Menu = () => {
  
  let { authToken, setAuthToken } = useContext(UserContext);
  const jugadorId = useSelector(selectResponseId);
  const partidaId = useSelector(selectResponseIdPartida);
  const mapaId = useSelector(selectMapaIdPartida);


  const sendLogout = async (e) => {
    e.preventDefault();
    try{
        const data = await fetch("http://equip06.insjoaquimmir.cat/api/logout", {
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
            <li><Link to ={"/"}>Home</Link></li>
            <li><Link to ={"/mapa/" + mapaId}>Mapa</Link></li>
            <li><Link to ={"/jugadors/" + jugadorId}>Jugador</Link></li>
            <li><Link to ={"/partidas/" + partidaId}>Info Partida</Link></li>                     
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
