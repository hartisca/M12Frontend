import { setEquips, setEquip, errors, startLoadingEquips } from "./equipSlice";

export const getEquips = (authToken, partidaId) => {
  
  return async (dispatch) => {
    dispatch(startLoadingEquips());
    console.log('antes del fetch')
    try{
      const data = await fetch ('http://127.0.0.1:8000/api/equips/list/' + partidaId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,

        },
        method: "GET",
      });

      const resposta = await data.json();
      if (resposta.success === true) {
        dispatch(setEquips(resposta.data));
        console.log(partidaId)
        console.log("222222");
        console.log(resposta);
      } else {
        console.log("equips buits");
      }
    } catch {
      console.log("Error en el listado:", errors);
    }
  };
};