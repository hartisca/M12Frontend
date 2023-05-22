import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect, useContext } from 'react';
import { MapContainer as Map, TileLayer, Marker, Popup, CircleMarker,Rectangle, Pane } from 'react-leaflet';
import L from 'leaflet';

import bomberman from '../img/bomberman.png'
import markerIcon from '../img/BOMB.png';
import Icon2 from '../img/boom.png';
import geolib from 'geolib';

import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../UserContext';
import { getFites } from '../../Slices/Fites/thunks';

import { selectResponseId } from '../../Slices/Jugador/jugadorSlice';
import { selectResponseIdPartida}  from '../../Slices/Partides/partidaSlice';
import { selectMapaIdPartida } from '../../Slices/Partides/partidaSlice';
import { getMapa } from '../../Slices/Maps/thunks';
import { selectResponseEquipId } from '../../Slices/Equips/equipSlice';
import { fitaFeta } from '../../Slices/Fites/thunks';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiMineExplosion } from 'react-icons/gi';
import { FaRegFrownOpen } from 'react-icons/fa'

function PartidaMap() {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);


  const jugadorId = useSelector(selectResponseId);
  const partidaId = useSelector(selectResponseIdPartida);
  const mapaId = useSelector(selectMapaIdPartida);
  const equipId = useSelector(selectResponseEquipId);
  const { noFetes = [], fetes = [] } = useSelector((state) => state.fites);
  const { mapa } = useSelector((state) => state.mapa);
  const { nom, lat1, lat2, long1, long2 } = mapa;

  const [userLocation, setUserLocation] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);   
  const colors = ["red", "yellow"];

  const dispatch = useDispatch();

  const notifySuccess = (message) => {
    toast.success(
      <div>        
        {message}
        <GiMineExplosion size={24} style={{ marginLeft: 10 }} />
      </div>,{
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  
  const notifyFailure = (message) => {
    toast.error(
      <div>        
        {message}
        <FaRegFrownOpen size={24} style={{ marginLeft: 10 }} />
      </div>, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
    });
  };

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [28, 36],
    iconAnchor: [16, 32], 
  }); 
 
  const customIcon2 = L.icon({
    iconUrl: Icon2,
    iconSize: [28, 36], 
    iconAnchor: [16, 32], 
  });  

  const customIcon3 = L.icon({
    iconUrl: bomberman,
    iconSize: [28, 36], 
    iconAnchor: [16, 32], 
  });

  const nofetes = noFetes.map((nofete)=>({
    id: nofete.id,
    lat: nofete.lat,
    long: nofete.long,
    partida_id: nofete.partida_id,
    tipus_id: nofete.tipus_id,
    created_at: nofete.created_at,
    updated_at: nofete.updated_at
  }))
  
  const area = {
    "id": 1,
    "nom": nom,
    "lat1": lat1,
    "long1": long1,
    "lat2": lat2,
    "long2": long2,
  }; 

  const rectangle = [
    [parseFloat(area.lat1), parseFloat(area.long1)],
    [parseFloat(area.lat2), parseFloat(area.long2)],
  ];

  const center = [
    (rectangle[0][0] + rectangle[1][0]) / 2, // Latitude
    (rectangle[0][1] + rectangle[1][1]) / 2, // Longitude
  ];  

  useEffect(() => {
    dispatch(getFites(authToken, jugadorId, partidaId ))
    dispatch(getMapa(authToken, mapaId));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((index) => (index === 0 ? 1 : 0));
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []); 


  const getLocationOnClick = () => {
    let isInRange = false;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { latitude, longitude };          
          setUserLocation(userLocation);
                    
          // Compare user location with each object in nofetes
          nofetes.forEach((nofete) => {
            const nofeteLocation = {
              latitude: parseFloat(nofete.lat),
              longitude: parseFloat(nofete.long),
            };

            const distanceInMeters = calculateDistance(userLocation, nofeteLocation);

            // Perform the desired comparison logic here
            if (distanceInMeters <= 10 && !isInRange) {
              isInRange = true;
              let fitaId = nofete.id;
              dispatch(fitaFeta(authToken, jugadorId, fitaId , equipId));
              dispatch(getFites(authToken, jugadorId, partidaId ));
              notifySuccess('Has completat una fita enhorabona!');                
            }
          });
          if (!isInRange) {
            // El usuario no está cerca de ninguna fita
            notifyFailure('No estàs a cap fita.');
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  };

  // Function to calculate distance using the Haversine formula
  const calculateDistance = (start, end) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const latDiff = toRadians(end.latitude - start.latitude);
    const lonDiff = toRadians(end.longitude - start.longitude);
    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(toRadians(start.latitude)) * Math.cos(toRadians(end.latitude)) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c * 1000; // Distance in meters
    return distance;
  };

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
      <>
        <div className='colocaMapa'>
      <Map center={center} zoom={12} scrollWheelZoom={true}  >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Rectangle bounds={rectangle}/>
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={customIcon3}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {nofetes.map((item, id) => (
          <Marker key={id} position={[item.lat, item.long]} icon={customIcon}>              
              <Pane>
              <CircleMarker center={[item.lat, item.long]} pathOptions={{ color: colors[colorIndex], fillColor: colors[colorIndex] }} radius={20} />
            </Pane>
            <Pane>
              <CircleMarker center={[item.lat, item.long]} pathOptions={{ color: colors[colorIndex === 0 ? 1 : 0], fillColor: colors[colorIndex === 0 ? 1 : 0] }} radius={10} />
              </Pane>
            <Popup>
              sóc la fita {item.id}, ESPAVILA!
            </Popup>
          </Marker>
        ))}
        {fetes.map((item,id) => (
          <Marker key={id} position={[item.lat, item.long]} icon={customIcon2}>
              <Popup>
              Ja has fet aquesta fita!
            </Popup>
            </Marker>
        ))}
      </Map>       
    </div>
    <div className='localitza'>
      <button onClick={getLocationOnClick}>Localitza'm</button>
      <ToastContainer />
    </div>    
    
    </>
  )
}


export default PartidaMap