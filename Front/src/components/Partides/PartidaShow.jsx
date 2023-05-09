import React, { useState, useEffect } from 'react';
import FitesList from '../Fites/FitesList';
import { CombatsList } from '../Combats/CombatsList';
import { PuntuacionsList } from '../Equips/PuntuacionsList';

export const PartidaShow = () => {
  return (
    <>
        <h2 className='titolPartida'>Fites Aconseguides</h2>
        <FitesList />
        <h2 className='titolPartida'>Combats Actius</h2>
        <CombatsList />
        <h2 className='titolPartida'>Puntuació Equips</h2>
        <PuntuacionsList /> 
    </>
  )
}
