import { setJugador, errors, saveResponseId, setJugadors } from "./jugadorSlice";
import { saveResponseEquipId } from "../Equips/equipSlice";

export const getJugador = ( authToken, id ) => {   

    return async (dispatch) => {
        
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

export const getJugadors = (authToken) => {
  
  return async (dispatch) => {  

    const data = await fetch('http://equip06.insjoaquimmir.cat/api/users', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken,
    },
      method: "GET",
    })
    const resposta = await data.json();

    if (resposta.success === true){
      console.log(resposta)
      dispatch(setJugadors(resposta.jugadors))
    }else{
      console.log('No hi ha jugadors')
    }
  }
}