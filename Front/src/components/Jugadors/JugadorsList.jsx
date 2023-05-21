import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

import {JugadorList} from './JugadorList';
import { getJugadors } from '../../Slices/Jugador/thunks';
import '../components.css'
import RotateLoader from "react-spinners/ClipLoader";


export const JugadorsList = () => {
    let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);

    const {jugadors = []} = useSelector((state) => state.jugador);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getJugadors(authToken));
    }, []);
    console.log(jugadors)
  return (
    <>
        <div className='taulaContainer'>          
            <table className="table1">
              <section className = "tablaHeader">
                <h1>Partides Disponibles</h1>
              </section>
              <section className="tablaBody">
                <table>      
                <thead>
                    <tr>
                        <th>ID Partida</th>
                        <th>Nom Jugador</th>
                        <th>ID Equip</th>                         
                        <th>Accions</th>                      
                    </tr>
                  </thead>            
                  <tbody>
                  { jugadors.length > 0 ? (                      
                    jugadors.map((jugador) => (
                      <tr key={jugador.jugador_id}>
                          <JugadorList jugador={jugador} />
                      </tr>
                    ))                    
                  ) : (
                    <tr>
                      <td colSpan="3" ><RotateLoader color="#000" />Carregant Jugadors...</td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </section>
                
            </table>
        </div>
    </>
  )
}
