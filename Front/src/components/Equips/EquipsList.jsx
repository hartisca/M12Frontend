import React, {useContext, useEffect} from 'react'
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

import { getEquips } from '../../Slices/Equips/thunks';
import EquipList from './EquipList';
import { useParams } from 'react-router-dom';

import RotateLoader from "react-spinners/ClipLoader";
import '../components.css'

export const EquipsList = () => {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);

  const partidaId = useSelector((state)=>state.partida.partidaId)
  const { equips = []} = useSelector((state) => state.equip);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {    
    
    console.log(partidaId)
    dispatch(getEquips(authToken, id));    
    console.log(id);
  }, []);

  return (    
    <div className='taulaContainer'>

      <table className="table1">
        <section className = "tablaHeader">
          <h1>Equips Disponibles</h1>
        </section>
        <section className="tablaBody">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Punts</th>    
                <th>Accions</th>                    
                </tr>
            </thead>          
            <tbody>                
              { equips.length > 0 ? (
                equips.map((equip) => (
                  <tr key={equip.id}>
                      <EquipList equip={equip} />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3"><RotateLoader color="#000" />Carregant equips disponibles...</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </table>
    </div>
  )
}
