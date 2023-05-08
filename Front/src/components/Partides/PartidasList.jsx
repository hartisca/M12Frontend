import React, { useContext, useEffect } from 'react';
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

import PartidaList from './PartidaList';
import { getPartides } from '../../Slices/Partides/thunks';


export default  function PartidasList() {

    let authToken = useSelector((state) => state.token) 
    const { partides = []} = useSelector((state) => state.partida);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPartides(authToken));        
    }, []);

    return(
        <>
            <table className="bg-secondary">
                <tbody>
                    <tr>
                        <th>Nom</th>
                        <th>Punts de victoria</th>
                        <th>Duració</th>                        
                    </tr>
                    { partides.length > 0 ? (
                      partides.map((partida) => (
                        <tr key={partida.id}>
                            <PartidaList partida={partida}/>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No se encontraron partidas</td>
                      </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}