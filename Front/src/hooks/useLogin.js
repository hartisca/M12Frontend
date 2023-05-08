import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsuari } from '../Slices/authSlice'

import { UserContext } from '../UserContext'

const useLogin = () => {

    let {authToken,setAuthToken,usuari, setUsuari,idUser, setIdUser} = useContext(UserContext)
    const [error, setError] = useState();

    /*
    const token = useSelector((state) => state.token)

    const dispatch = useDispatch();*/

    let myToken =localStorage.getItem("authToken") || ""

    const checkAuthToken = async () => {
        
        if(myToken.length > 0){
          const data = await fetch("http://127.0.0.1:8000/api/user", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + token,
            },
            method: "GET",
          });

          const resposta = await data.json();
          console.log(resposta)
          if (resposta.success === true) {
            /*dispatch(setToken(token));
            dispatch(setUsuari(email));  */
            setAuthToken(myToken);
            setUsuari(resposta.user.email)
            setIdUser(resposta.user.id)                      
          }
        }
        else{
          //dispatch(setToken(''));
          setAuthToken("");
        }
    }

    const sendLogin = async (data) => {

        const { email,password} = data
        try {
          
          const data = await fetch("http://127.0.0.1:8000/api/login", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
            
          });
          const resposta = await data.json();          
          if (resposta.success === true) {
            /*
            dispatch(setToken(resposta.authToken))
            console.log("try") */
            setAuthToken(resposta.authToken);
            setUsuari(email)
            localStorage.setItem("authToken",resposta.authToken)  
            console.log(resposta)                  
          }else {
            setError(resposta.message)
          }
        }catch{
          setError(data)
        };
    
    };
    useEffect(() => {
        checkAuthToken()
      }, []);
  
      return { sendLogin, error}
}
export default useLogin