import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';


const PartidaList = ({partida}) => {
    
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
    console.log(authToken)
    const dispatch = useDispatch();

    function unirsePartida() {
        // Aquí iría la lógica para unirse a la partida
        // ...
    }
    

    return(
        <>
            <td>{partida.nom}</td>
            <td>{partida.puntsVictoria}</td>
            <td>{partida.duracio}</td>
            { authToken && (
                <td>
                    <button onClick={unirsePartida}>Apuntarme</button>
                </td>
            )}
            { !authToken && (
                <td>
                    <span>Inicia sesión para apuntarte a esta partida</span>
                </td>
            )}
        </>
        
    )
}

export default PartidaList