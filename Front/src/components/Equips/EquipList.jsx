import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';
import { getPartida } from '../../Slices/Partides/thunks';
import { useNavigate } from 'react-router-dom';
import {setJugador} from '../../Slices/Jugador/jugadorSlice';

const EquipList = ({equip}) => {

    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const buttonRef = useRef(null);
    

    async function unirseEquip() {
        const confirmacion = window.confirm('¿Segur que vols unir-te a aquest equip?');
        if (confirmacion) {
            const data = {
                equip: equip.id
              };            
            
            try {
            const response = await fetch('http://127.0.0.1:8000/api/jugadors', {
                
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
        
                },
                method: 'POST',
                body: JSON.stringify(data),
                
            });
            const resposta = await response.json();
            console.log('arar=')
            console.log(data)
            if (resposta.success === true){
                console.log(resposta.data);
                dispatch(setJugador(resposta.data));
                navigate('/jugadors/' + resposta.data.id)
                
            } else {
                console.log("error al crear jugador")
            }
            
            } catch (error) {
                // Manejar el error si ocurre alguno
                console.error('Error:', error);
            }
        }
    }

    return(
        <>
            <td>{equip.id}</td>
            <td>{equip.nom}</td>
            <td>{equip.punts}</td>           
            <td>
                <button className={authToken ? "button-auth" : "button-noauth"} ref={buttonRef} onClick={unirseEquip}> Unir-me </button>
            </td>
        
        </>
        
    )
}

export default EquipList