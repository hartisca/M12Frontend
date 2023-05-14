
import 'bootstrap/dist/css/bootstrap.min.css';

import { MapContainer as Map, TileLayer, Marker, Popup, Rectangle, Circle, CircleMarker} from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function PartidaMap() {

    const  fites =[
        {
            "id": 1,
            "lat": "41.2145400",
            "long": "1.7255100",
            "partida_id": 1,
            "tipus_id": 1
        },
        {
            "id": 2,
            "lat": "41.2173000",
            "long": "1.7389200",
            "partida_id": 1,
            "tipus_id": 1
        },
        {
            "id": 3,
            "lat": "41.2242100",
            "long": "1.7259300",
            "partida_id": 1,
            "tipus_id": 1
        }
      ];

    const area = {
    "id": 1,
    "nom": "vilanova",
    "lat1": "41.1975",
    "long1": "1.7000",
    "lat2": "41.23961",
    "long2": "1.7650"}

    const rectangle = [
        [area.lat1, area.long1],
        [area.lat2, area.long2],
    ];
    const center = [40.505, 1.2309]
    const greenOptions = { color: 'green', fillColor: 'green' }    
  
    return (
        <>
       <div className='colocaMapa' style={{ height: 'calc(100vh - 200px)' }}>
  <Map center={[41.2512, 1.7245]} zoom={12} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Rectangle bounds={rectangle} />
    {fites.map((item, id) => (
      <Marker key={id} position={[item.lat, item.long]}>
        <CircleMarker center={[item.lat, item.long]} pathOptions={greenOptions} radius={10} />
        <Popup>{item.id}</Popup>
      </Marker>
    ))}
  </Map>
</div>
    </>
  )
}


export default PartidaMap