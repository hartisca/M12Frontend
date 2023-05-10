import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';
import { getPartida } from '../../Slices/Partides/thunks';
import { useNavigate } from 'react-router-dom';

const EquipList = ({equip}) => {

    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    let id = equip.id

    function unirseEquip() {        
        //dispatch(getEquip(authToken, id ))
        //navigate('/partidas/{id')
    }

    return(
        <>
            <td>{equip.id}</td>
            <td>{equip.nom}</td>
            <td>{equip.punts}</td>           
            <td>
                
            </td>
        
        </>
        
    )
}

export default EquipList