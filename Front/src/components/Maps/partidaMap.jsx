
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect, useContext } from 'react';
import { MapContainer as Map, TileLayer, Marker, Popup, CircleMarker,Rectangle, Pane } from 'react-leaflet';
import L from 'leaflet';

import markerIcon from '../img/BOMB.png';
import Icon2 from '../img/boom.png';

import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../UserContext';
import { getFites } from '../../Slices/Fites/thunks';

import {selectResponseId} from '../../Slices/Jugador/jugadorSlice'
import {selectResponseIdPartida} from '../../Slices/Partides/partidaSlice'

function PartidaMap() {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);
  const jugadorId = useSelector(selectResponseId);
  const partidaId = useSelector(selectResponseIdPartida);
  const dispatch = useDispatch();
  const colors = ["red", "yellow"];

  const [data, setData] = useState(null);

  const getMapa = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/mapas/1', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer '  + authToken,
      },
      });
      const jsonData = await response.json();

      if (jsonData.success === true){
        console.log(jsonData.data.data.lat1)
        setData(jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [28, 36], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point of the icon
  });
 
  const customIcon2 = L.icon({
    iconUrl: Icon2,
    iconSize: [28, 36], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point of the icon
  });

  const fetes = [
    {
        "id": 5,
        "lat": "41.2245400",
        "long": "1.7255100",
        "partida_id": 1,
        "tipus_id": 1,
        "created_at": "2023-05-14T17:56:06.000000Z",
        "updated_at": "2023-05-14T17:56:06.000000Z"
    }
];

const nofetes =  [
  {
      "id": 1,
      "lat": "41.2145400",
      "long": "1.7255100",
      "partida_id": 1,
      "tipus_id": 1,
      "created_at": "2023-05-08T15:41:33.000000Z",
      "updated_at": "2023-05-08T15:41:33.000000Z"
  },
  {
      "id": 2,
      "lat": "41.2173000",
      "long": "1.7389200",
      "partida_id": 1,
      "tipus_id": 1,
      "created_at": "2023-05-08T15:42:58.000000Z",
      "updated_at": "2023-05-08T15:42:58.000000Z"
  },
  {
      "id": 3,
      "lat": "41.2242100",
      "long": "1.7259300",
      "partida_id": 1,
      "tipus_id": 1,
      "created_at": "2023-05-08T15:43:58.000000Z",
      "updated_at": "2023-05-08T15:43:58.000000Z"
  }
];
  const area = {
  "id": 1,
  "nom": "vilanova",
  "lat1": "41.1975",
  "long1": "1.7000",
  "lat2": "41.2061",
  "long2": "1.7650"
  };

  const rectangle=[
    [area.lat1, area.long1],
    [area.lat2, area.long2],
  ]

  const lat1 = parseFloat(area.lat1);
  const long1 = parseFloat(area.long1);
  const lat2 = parseFloat(area.lat2);
  const long2 = parseFloat(area.long2);



  const [colorIndex, setColorIndex] = useState(0);
  const [userPosition, setUserPosition] = useState(null);




  useEffect(() => {
    // Retrieve user's position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition(L.latLng(latitude, longitude));
      },
      (error) => {
        console.error('Error retrieving user position:', error);
      }
    );   

    const interval = setInterval(() => {
      setColorIndex((index) => (index === 0 ? 1 : 0));
    }, 4000);


    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    dispatch(getFites(authToken, jugadorId, partidaId ))
    getMapa();
  }, []);

  const checkPositionWithinRadius = (userPosition) => {
    for (const nofete of nofetes) {
      const nofetePosition = {
        latitude: parseFloat(nofete.lat),
        longitude: parseFloat(nofete.long)
      };


      const distance = getDistance(userPosition, nofetePosition);


      if (distance <= 10) {
        console.log(`User is within 10 meters of nofeta with ID ${nofete.id}`);
      }
    }
  };


  const getDistance = (point1, point2) => {
    const latDiff = point2.latitude - point1.latitude;
    const lonDiff = point2.longitude - point1.longitude;
   
    // Assuming 1 degree of latitude is approximately 111 kilometers
    // and 1 degree of longitude is approximately 111 kilometers at the equator
    const latDistance = latDiff * 111;
    const lonDistance = lonDiff * 111;
 
    // Calculating the Euclidean distance
    const distance = Math.sqrt(latDistance ** 2 + lonDistance ** 2);
 
    return distance; // Distance in kilometers (approximation)
  };


       
  
    return (
        <>
          <div className='colocaMapa'>
        <Map center={[41.2512, 1.7245]} zoom={12} scrollWheelZoom={true}  >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Rectangle bounds={rectangle}/>
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
     
      
      </>
  )
}


export default PartidaMap