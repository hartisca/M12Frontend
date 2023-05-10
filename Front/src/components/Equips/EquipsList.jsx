import React, {useContext, useEffect} from 'react'
import {UserContext} from '../../UserContext'
import { useDispatch, useSelector } from "react-redux";

import { getEquips } from '../../Slices/Equips/thunks';
import EquipList from './EquipList';

export const EquipsList = () => {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);

  const partidaId = useSelector((state)=>state.partida.partidaId)
  const { equips = []} = useSelector((state) => state.equip);
  const dispatch = useDispatch();
 

  useEffect(() => {    
    console.log('ueueue')
    console.log(partidaId)
    dispatch(getEquips(authToken, partidaId));    
  }, []);

  return (
    <>
    <table className="bg-secondary">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Punts</th>                        
                    </tr>
                    { equips.length > 0 ? (
                      equips.map((equip) => (
                        <tr key={equip.id}>
                            <EquipList equip={equip} />
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">Carregant equips disponibles de la partida...</td>
                      </tr>
                    )}
                </tbody>
            </table>
        </>
  )
}
