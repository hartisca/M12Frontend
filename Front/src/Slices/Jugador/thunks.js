import { setJugador, errors, saveResponseId } from "./jugadorSlice";
import { saveResponseEquipId } from "../Equips/equipSlice";

export const getJugador = ( authToken, id ) => {    
    return async (dispatch, getState) => {
        
      const data = await fetch('http://equip06.insjoaquimmir.cat/api/jugadors/' + id, {
  
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer '  + authToken,
      },
        method: "GET",
      })
      const resposta = await data.json();      
  
      if (resposta.success === true){
        dispatch(setJugador(resposta.data))  
        dispatch(saveResponseId(resposta.data.id));
        dispatch(saveResponseEquipId(resposta.data.equip_id));
        console.log(resposta)
      }else{
        console.log('Error en el jugador:',errors);
      }
    }
  }