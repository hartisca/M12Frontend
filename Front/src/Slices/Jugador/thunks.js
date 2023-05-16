import { setJugador, errors, saveResponseId } from "./jugadorSlice";

export const getJugador = ( authToken, id ) => {    
    return async (dispatch, getState) => {
        
      const data = await fetch('http://127.0.0.1:8000/api/jugadors/' + id, {
  
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
        console.log(resposta)
      }else{
        console.log('Error en el jugador:',errors);
      }
    }
  }