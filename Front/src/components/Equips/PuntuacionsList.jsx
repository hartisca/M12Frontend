import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../UserContext';
import { PuntuacioList } from './PuntuacioList';
import { getEquips } from '../../Slices/Equips/thunks';
import { useParams } from 'react-router-dom';
import '../components.css'


export const PuntuacionsList = () => {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);

  const { equips = []} = useSelector((state) => state.equip);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getEquips(authToken, id));
  }, []);

  return (
    <>
      <table className='taulaInfo'>
        <thead className='theadInfo'>
          <td>Nom Equip</td>
          <td>Puntuació</td>
        </thead>
        <tbody>
        {equips.map((equip) => (
          <tr key={equip.id}>
            <PuntuacioList equip={equip} equips={equips} />
          </tr>
        ))}
        </tbody>       
      </table>
    </>
  )
}