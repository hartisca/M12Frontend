import React, {useContext} from 'react'
import { useDispatch } from 'react-redux';
import { UserContext } from '../../UserContext'
import { getPartida } from '../../Slices/Partides/thunks';
import { setPartidaId } from '../../Slices/Partides/partidaSlice';
import { useNavigate } from 'react-router-dom';
import { saveResponseId } from '../../Slices/Jugador/jugadorSlice';

export const JugadorList = ({jugador}) => {

    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    function carregaPartida() {    
        dispatch(getPartida(authToken, jugador.partida_id));
        dispatch(setPartidaId(jugador.partida_id));
        dispatch(saveResponseId(jugador.jugador_id))
        navigate('/partidas/' + jugador.partida_id);  
    }
    
  return (
    <>
        <td>{jugador.partida_id}</td>
        <td>{jugador.nom}</td>   
        <td>{jugador.equip_id}</td> 
        <td>
            <button className={authToken ? "button-auth" : "button-noauth"} onClick={carregaPartida} >Ves a la partida</button>
        </td>
    </>
  )
}
