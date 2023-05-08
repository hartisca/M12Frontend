import React, { useContext } from 'react';
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

const PartidaList = ({partida}) => {

   

    return(
        <>
            <td>{partida.nom}</td>
            <td>{partida.puntsVictoria}</td>
            <td>{partida.duracio}</td>

        </>
    )
}

export default PartidaList