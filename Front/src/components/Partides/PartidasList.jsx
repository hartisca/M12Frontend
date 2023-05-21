import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

import PartidaList from './PartidaList';
import { getPartides } from '../../Slices/Partides/thunks';
import '../components.css'
import RotateLoader from "react-spinners/ClipLoader";


export default  function PartidasList() {
  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);
    
    const { partides = [], filter } = useSelector((state) => state.partida);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPartides(authToken));
    }, [filter]);

    return(
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
                        <th>Nom</th>
                        <th>Població</th>
                        <th>Punts de victoria</th>
                        <th>Duració</th>  
                        <th>Accions</th>                      
                    </tr>
                  </thead>
                  <tbody>
                  { partides.length > 0 ? (
                    partides.map((partida) => (
                      <tr key={partida.id}>
                          <PartidaList partida={partida} />
                      </tr>
                    ))                    
                  ) : (
                    <tr>
                      <td colSpan="3" ><RotateLoader color="#000" />Carregant partides...</td>
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

