import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from '../../UserContext';
import { getPartida } from '../../Slices/Partides/thunks';
import { useNavigate } from 'react-router-dom';
import {setJugador} from '../../Slices/Jugador/jugadorSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPatchQuestionFill } from 'react-icons/bs'

import { saveResponseEquipId } from '../../Slices/Equips/equipSlice';

const EquipList = ({equip}) => {

    let {authToken, setAuthToken, usuari, setUsuari} = useContext(UserContext)    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const buttonRef = useRef(null);
    
    async function unirseEquip() {
        const confirmacion = await new Promise((resolve) => {
            const toastId = toast.info( <div className="toast-content">
                <div>
                    <BsPatchQuestionFill size={24} />
                    <span>¿Segur que vols unir-te a aquest equip?</span>
                </div>
                <button className="toast-confirm" onClick={() => resolve(true)}>
                    Confirmar
                </button>
            </div>, {
              position: toast.POSITION.TOP_CENTER,
              closeOnClick: false,
              draggable: true,
              draggablePercent: 60,
              hideProgressBar: true,
              progress: undefined,
              autoClose: false,
              icon: false,              
            });
      
            
            toast.onChange((visibleToasts) => {
              if (visibleToasts.length && visibleToasts[0].id === toastId) {
                const { progress } = visibleToasts[0];
                if (progress >= 1) {
                  resolve(false);
                  toast.dismiss(toastId);
                }
              }
            });
          });
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
            if (resposta.success === true){
                dispatch(setJugador(resposta.data));                               
                navigate('/jugadors/' + resposta.data.id)                
            } else {
                console.log("error al crear jugador")
            }
            
            } catch (error) {                
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
            <ToastContainer /> {/* Agrega esta línea */}
        </>
        
    )
}

export default EquipList