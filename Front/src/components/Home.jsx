import React, {useContext} from 'react'
import { UserContext } from '../UserContext';
import './components.css'
import { Link } from 'react-router-dom';



export const Home = () => {

  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);

    
  return (
    <>
        <div className='containerHome'>
            <h3>Benvingut a GoCatch {usuari}!</h3>
            <div className='textLinks'>
                <div className='linkDreta'>
                    <p>Accedeix al llistat de partides disponibles!</p>
                    <Link to ={"/partidas"}>Ves-hi!</Link>
                </div>
                <div className='linkEsq'>
                    <p>Ves a les teves partides!</p>
                    <Link to ={"/partidas"}>Ves-hi!</Link>
                </div>
            </div>
        </div>
    
    </>
  )
}
