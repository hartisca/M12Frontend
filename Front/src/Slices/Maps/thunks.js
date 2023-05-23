import { setMapa } from "./mapaSlice";

export const getMapa = (authToken, mapaId) => {
       
    return async (dispatch) => {
                
        try{
            const data = await fetch (`http://equip06.insjoaquimmir.cat/api/mapas/${mapaId}`, {
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