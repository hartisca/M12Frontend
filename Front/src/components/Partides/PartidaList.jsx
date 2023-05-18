import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';
import { getPartida } from '../../Slices/Partides/thunks';
import { useNavigate } from 'react-router-dom';

import { setPartidaId } from '../../Slices/Partides/partidaSlice';


const PartidaList = ({partida}) => {
    
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    

    function unirsePartida() {        
        dispatch(getPartida(authToken, partida.id ));
        dispatch(setPartidaId(partida.id));
        navigate('/equips/list/' + partida.id);      
    }

    useEffect(() => {
        
    }, [unirsePartida]);
    
   

    return(
        <>
            <td>{partida.nom}</td>
            <td>{partida.poblacio}</td>
            <td>{partida.puntsVictoria}</td>
            <td>{partida.duracio}</td>           
            <td>
                <button className={authToken ? "button-auth" : "button-noauth"} onClick={unirsePartida} disabled={!authToken}>Apuntarme</button>
            </td>
                    
        </>
        
    )
}

export default PartidaList