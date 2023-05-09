import {setPartides, setPartida, startLoadingPartides, errors} from './partidaSlice'

export const getPartides = (authToken) => {

    return async (dispatch) => {
        dispatch(startLoadingPartides());
        try{
            const data = await fetch ('http://127.0.0.1:8000/api/partidas', {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,

              },
              method: "GET",
            });
            const resposta = await data.json();
            if (resposta){
                dispatch(setPartides(resposta));                
            }else{
                console.log('partides buides')
            }
          } catch{
            console.log('Error en el listado:', errors);
          }
    }
}

export const getPartida = (authToken, id ) => {

  return async (dispatch, getState) => {
    dispatch(startLoadingPartides());

    const data = await fetch('http://127.0.0.1:8000/api/partidas/' + id, {

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken,
    },
      method: "GET",
    })
    const resposta = await data.json();
    console.log(resposta)

    if (resposta.success === true){
      dispatch(setPartida(resposta.data))
      console.log('exito')
      console.log(resposta)
    }else{
      console.log('Error en la partida:',errors);
    }
  }
}