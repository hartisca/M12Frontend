import { setPartides, setPartida, startLoadingPartides, errors, setPartidaId, setMapaId } from './partidaSlice'

export const getPartides = (authToken) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPartides());
    const state = getState();
    const filter = state.partida.filter;
    console.log(filter);
    
    let url = "http://equip06.insjoaquimmir.cat/api/partidas";   

    let poblacio = filter.poblacio !== "" ? "?poblacio=" + filter.poblacio : "";

    url = url + poblacio;
    console.log(url);
    try {
      const data = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta) {
        console.log(resposta)
        dispatch(setPartides(resposta.data));
      } else {
        console.log("partides buides");
      }
    } catch {
      console.log("Error en el listado:", errors);
    }
  };
};


export const getPartida = (authToken, id ) => {

  return async (dispatch) => {
    dispatch(startLoadingPartides());

    const data = await fetch('http://equip06.insjoaquimmir.cat/api/partidas/' + id, {

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken,
    },
      method: "GET",
    })
    const resposta = await data.json();
    
    if (resposta.success === true){
      dispatch(setPartida(resposta.data))  
      dispatch(setPartidaId(resposta.data.id))  
      dispatch(setMapaId(resposta.data.mapa_id))       
    }else{
      console.log('Error en la partida:',errors);
    }
  }
}