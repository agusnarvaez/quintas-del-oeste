import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline,Polygon, FeatureGroup } from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import Markers from './Markers'


export default function MapView() {
    const clickEnMapa = (e) => { console.log("Se hizo click en mapa!") }
    const contornoExterior = [
      [-34.61525353546566, -58.985513189134394],
      [-34.627649, -58.976640],
      [-34.630166, -58.979870],
      [-34.621549, -58.986575],
      [-34.624401, -58.991886],
      [-34.620463, -58.995266],
      [-34.61525353546566, -58.985513189134394]
    ]
    const zona1 = [
      [-34.627649, -58.976640],
      [-34.629395, -58.978793],
      [-34.627331, -58.980316],
      [-34.625900, -58.977915],
      [-34.627649, -58.976640]
    ]
    const lote = [
      [-34.627649, -58.976640],
      [-34.628133, -58.977158],
      [-34.627702, -58.977612],
      [-34.627396, -58.976965],
      [-34.627649, -58.976640]
    ]

    const _onCreate = (e) => {
      console.log(e)
    }
    const _onEdited = (e) => {
      console.log(e)
    }
    const _onDeleted = (e) => {
      console.log(e)
    }


  return (

    <MapContainer
    center={{lat:"-34.62058929730762",lng:"-58.981031506685305"}}
    zoom={15}
    >
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{color: 'red'}} positions={contornoExterior} />
      {/* <Polygon pathOptions={{color: 'white'}} positions={zona1} /> */}
      {/* <Polygon pathOptions={{color: 'blue'}} positions={lote} /> */}

      <Markers/>
    </MapContainer>
  );
}