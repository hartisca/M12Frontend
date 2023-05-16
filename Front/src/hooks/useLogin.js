import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsuari } from '../Slices/authSlice'

import { UserContext } from '../UserContext'

const useLogin = () => {

  let {usuari, setUsuari, email, setUserEmail, authToken, setAuthToken} = useContext(UserContext);
  const [error, setError] = useState();


    const checkAuthToken = async () => {

      let myToken =localStorage.getItem("authToken") || ""
        
        if(myToken.length > 0){
          const data = await fetch("http://127.0.0.1:8000/api/user", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + myToken,
            },
            method: "GET",
          });

          const resposta = await data.json();
          console.log(resposta)
          if (resposta.success === true) {            
            setAuthToken(myToken);           
            setUserEmail(resposta.email);
            setUsuari(resposta.usuari);                     
          }
        }
        else{
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
            setAuthToken(resposta.authToken)
            localStorage.setItem("authToken",resposta.authToken);
            setUser(resposta.usuari);
            setUserEmail(resposta.email);
                       
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