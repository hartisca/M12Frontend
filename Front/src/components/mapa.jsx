/*
import React from 'react'
import { Map, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const mapa = {id:1, lat1:41.2400, long1:1.6800, lat2:41.21, long2: 1.750};

const rectBounds = [[mapa.lat1, mapa.long1], [mapa.lat2, mapa.long2]];

const rectCenter = [(rectBounds[0][0] + rectBounds[1][0]) / 2, (rectBounds[0][1] + rectBounds[1][1]) / 2];

function Mapa() {
  return (
    <div className="App">
    <Map center={rectCenter} zoom={14}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={25} />
        <Rectangle bounds={rectBounds} color="yellow" weight={1} />
    </Map>
    </div>
  )
}
*/
