import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';
import { getPartida } from '../../Slices/Partides/thunks';
import { useNavigate } from 'react-router-dom';


const PartidaList = ({partida}) => {
    
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    let id = partida.id

    function unirsePartida() {        
        dispatch(getPartida(authToken, id ))
        navigate('/partidas/:id')
    }
    
   

    return(
        <>
            <td>{partida.nom}</td>
            <td>{partida.puntsVictoria}</td>
            <td>{partida.duracio}</td>           
            <td>
                <button className={authToken ? "button-auth" : "button-noauth"} onClick={unirsePartida} disabled={!authToken}>Apuntarme</button>
            </td>
        
        </>
        
    )
}

export default PartidaList