
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect, useContext } from 'react';
import { MapContainer as Map, TileLayer, Marker, Popup, CircleMarker,Rectangle, Pane } from 'react-leaflet';
import L from 'leaflet';

import markerIcon from '../img/BOMB.png';
import Icon2 from '../img/boom.png';
import geolib from 'geolib';

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
      "lat": "41.2352512",
      "long": "1.7301504",
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

  const rectangle = [
    [parseFloat(area.lat1), parseFloat(area.long1)],
    [parseFloat(area.lat2), parseFloat(area.long2)],
  ];

  const center = [
    (rectangle[0][0] + rectangle[1][0]) / 2, // Latitude
    (rectangle[0][1] + rectangle[1][1]) / 2, // Longitude
  ];
  

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



  const [userLocation, setUserLocation] = useState(null);


const getLocationOnClick = () => {
  console.log('botomapa');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { latitude, longitude };
        console.log(position);
        console.log(userLocation);
        setUserLocation(userLocation);

        // Compare user location with each object in nofetes
        nofetes.forEach((nofete) => {
          const nofeteLocation = {
            latitude: parseFloat(nofete.lat),
            longitude: parseFloat(nofete.long),
          };

          const distanceInMeters = calculateDistance(userLocation, nofeteLocation);

          // Perform the desired comparison logic here
          if (distanceInMeters <= 10) {
            console.log('User location is within 10 meters of a nofete location:', nofete.id);
          }
          else{
            console.log('no estas a cap fita');
          }
        });
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




/*

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
  

*/

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
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
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
      </div>

     
      
      </>
  )
}


export default PartidaMap