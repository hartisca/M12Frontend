import { setMapa } from "./mapaSlice";

export const getMapa = (authToken, partidaId) => {
       
    return async (dispatch) => {
                
        try{
            const data = await fetch (`http://127.0.0.1:8000/api/mapas/${partidaId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,    
                  },
                  method: "GET",                  
                })   
            
            const resposta = await data.json();            
                                   
            if (resposta.success == true){  
                dispatch(setMapa(resposta));                
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}