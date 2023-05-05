import React from 'react'
import { Link } from 'react-router-dom';


import {HiLocationMarker} from 'react-icons/hi'
import {BsPerson, BsFillDice5Fill, BsDeviceSsd} from 'react-icons/bs'
import {IoMdSettings} from 'react-icons/io'

export const Menu = () => {
  return (

    <div className="menuheader">

        <div className="icon"><Link className="link-secondary text-decoration-none text-uppercase" to="#"><HiLocationMarker /></Link></div>
        <div className="icon"><Link className="link-secondary text-decoration-none text-uppercase" to="#"><BsPerson /></Link></div>
        <div className="icon"><Link className="link-secondary text-decoration-none text-uppercase" to="#"><BsFillDice5Fill /></Link></div>
        <div className="icon2"><Link className="link-secondary text-decoration-none text-uppercase" to="#"><IoMdSettings /></Link></div>
               
    </div>    
  );  
}
