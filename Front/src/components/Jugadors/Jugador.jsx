import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../UserContext';
import { getJugador } from '../../Slices/Jugador/thunks';
import { useParams } from 'react-router-dom';


import '../components.css'

export const Jugador = () => {
  
  const { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);  

  const jugador = useSelector((state) => state.jugador.jugador);  
  const dispatch = useDispatch();
  const { id } = useParams();  
  
  useEffect(() => {    
    dispatch(getJugador(authToken, id));
  }, []);

  return (
    
    <div className='wrapper'>
      <div className='left'>       
      </div>
      <div className='right'>
        <div className='jugadorInfo'>
          <h3>Informació del Jugador</h3>
          <p>ID: {jugador.id}</p>
          <p>Soldadets: {jugador.soldadets}</p>
          <p>Equip ID: {jugador.equip_id}</p>
        </div>
      </div>
      
    </div>   
    
  );
};



