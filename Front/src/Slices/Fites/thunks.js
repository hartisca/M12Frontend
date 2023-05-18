import { setPartidaId } from '../Partides/partidaSlice'
import { startLoadingFites, setMissatge, setFetes, setNoFetes } from './fitesSlice'

export const getFites = (authToken, jugadorId, partidaId) => {
    const partida = partidaId;
    const id = jugadorId;
   
    return async (dispatch) => {
                
        try{
            const data = await fetch (`http://127.0.0.1:8000/api/fitas/list/${partida}/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,    
                  },
                  method: "GET",                  
                })   
            
            const resposta = await data.json();            
                                   
            if (resposta.success == true){  
                console.log('dintresuccess')              
                dispatch(setFetes(resposta.fetes))
                dispatch(setNoFetes(resposta.nofetes))
                console.log(resposta.fetes)
                console.log(resposta.nofetes)  
            }
        } catch {
            console.log('Error al fetchFites')
        }
    }
}