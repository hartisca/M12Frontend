import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

import { HiLocationMarker } from 'react-icons/hi'
import { BsPerson, BsFillDice5Fill, BsDeviceSsd } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'

import './layout.css'

export const MenuLogout = () => {

  
  let { authToken, setAuthToken } = useContext(UserContext);

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
      <div className="menuheader2">          
              
        <button className="logout" onClick={(e) => {
          sendLogout(e);
            }}> <RiLogoutBoxLine /> Logout
        </button>    
      </div>         
    </>
  );  
}