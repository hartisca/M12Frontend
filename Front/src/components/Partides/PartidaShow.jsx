import React, { useState, useEffect } from 'react';
import FitesList from '../Fites/FitesList';
import { PuntuacionsList } from '../Equips/PuntuacionsList';

import '../components.css'

export const PartidaShow = () => {

  

  return (
    <>
      <div className='infoPartidaContainer'>
        <h2 className='titolPartida'>Fites Aconseguides</h2>
          <FitesList />
        <h2 className='titolPartida'>Combats Actius</h2>
          <p>Info Combats</p>
        <h2 className='titolPartida'>Puntuació Equips</h2>
          <PuntuacionsList /> 
        </div>
    </>
  )
}
