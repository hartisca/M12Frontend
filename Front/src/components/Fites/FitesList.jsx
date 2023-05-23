import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {UserContext} from '../../UserContext'



export default function FitesList() {

    let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);

    
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        
    }, []);


   return (
    <div>
      Info Fites
    </div>
   )
}