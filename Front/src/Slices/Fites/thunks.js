import { startLoadingFites, setMissatge, setFetes, setNoFetes } from './fitesSlice'
import { createAsyncThunk } from '@reduxjs/toolkit';

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
                dispatch(setFetes(resposta.fetes))
                dispatch(setNoFetes(resposta.nofetes))               
            }
        } catch {
            console.log('Error al fetchFites')
        }
    }
}

export const fitaFeta = (authToken, jugadorId, fitaId, equipId) => {    
    
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('equip', equipId);
        formData.append('jugador', jugadorId);
        formData.append('fita', fitaId);    
        
        try{
            
            const data = await fetch (`http://127.0.0.1:8000/api/fitasfetas/`, {
                headers: {
                    Accept: "application/json",                
                    Authorization: "Bearer " + authToken,    
                    },
                    body: formData,
                    method: "POST",                  
                })   
            
            const resposta = await data.json();            
                                 
            if (resposta.success == true){                            
                dispatch(setFetes(resposta.fetes))
                dispatch(setNoFetes(resposta.nofetes))                
            }
        } catch {
            console.log('Error al fetchFites')
        }
    }
}
