import React from 'react'
import { MapContainer, TileLayer, useMap, Popup, Polyline,Polygon, FeatureGroup } from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import Marker from './Marker'
import IconLocation from './IconLocation'

export default function MapEditor({setValue,getValues}) {
    const clickEnMapa = (e) => { console.log("Se hizo click en mapa!") }

    const contornoExterior = [
      [-34.61740919669242,-58.98954391479492],
      [-34.61183817736672,-58.978638052940376],
      [-34.60659130207151,-58.982656002044685],
      [-34.60952613636645, -58.988385200500495],
      [-34.61202541727224,-58.986432552337654],
      [-34.61478167476339, -58.99168968200684]
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
      if(e.layerType==='marker'){
        setValue('lat',e.layer._latlng.lat)
        setValue('lng',e.layer._latlng.lng)
      }
      if(e.layerType==='polygon'){
        const perimeter = e.layer.editing.latlngs[0][0]
        setValue('x1Lat',perimeter[0].lat)
        setValue('x1Lng',perimeter[0].lng)
        setValue('x2Lat',perimeter[1].lat)
        setValue('x2Lng',perimeter[1].lng)
        setValue('y1Lat',perimeter[2].lat)
        setValue('y1Lng',perimeter[2].lng)
        setValue('y2Lat',perimeter[3].lat)
        setValue('y2Lng',perimeter[3].lng)
      }

    }

    const _onEdited = (e) => {
      console.log(e)
    }
    const _onDeleted = (e) => {
      e.layers.eachLayer(layer => {
        const esUnMarker = layer.editing._marker
        if(esUnMarker){
          setValue('lat',0)
          setValue('lng',0)
        }else{
          setValue('x1Lat',0)
          setValue('x1Lng',0)
          setValue('x2Lat',0)
          setValue('x2Lng',0)
          setValue('y1Lat',0)
          setValue('y1Lng',0)
          setValue('y2Lat',0)
          setValue('y2Lng',0)
        }
      })
    }
    const existingPolygon = ()=>{
      const conditionX2 = getValues('x2Lat')!=="0"&&getValues('x2Lat')!==undefined && getValues('x1Lng')!=="0"&&getValues('x1Lng')!==undefined
      const conditionY1 = getValues('y1Lat')!=="0"&&getValues('y1Lat')!==undefined && getValues('x2Lng')!=="0"&&getValues('x2Lng')!==undefined
      const conditionY2 = getValues('y2Lat')!=="0"&&getValues('y2Lat')!==undefined && getValues('y1Lng')!=="0"&&getValues('y1Lng')!==undefined
      const conditionX1 = getValues('x1Lat')!=="0"&&getValues('x1Lat')!==undefined && getValues('y2Lng')!=="0"&&getValues('y2Lng')!==undefined
      if(conditionX1&&conditionX2&&conditionY1&&conditionY2){
        return <Polygon pathOptions={{color: 'red'}} positions={[[getValues('x1Lat'),getValues('x1Lng')],[getValues('x2Lat'),getValues('x2Lng')],[getValues('y1Lat'),getValues('y1Lng')],[getValues('y2Lat'),getValues('y2Lng')]]}/>
      }
    }

    const existingMarker = ()=>{
      const conditionLat = getValues('lat')!=="0"&&getValues('lat')!==undefined
      const conditionLng = getValues('lng')!=="0"&&getValues('lng')!==undefined
      if(conditionLat&&conditionLng){
        return <Marker coordinates={{lat:getValues('lat'),lng:getValues('lng')}}/>
      }
    }
  return (

    <MapContainer
    center={{lat:"-34.613884",lng:"-58.982545"}}
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
            marker:{
              icon:IconLocation
            },
            polygon:{
              shapeOptions: {
                guidelineDistance: 10,
                color: "navy",
                weight: 3
              }
            }
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{color: 'gray'}} positions={contornoExterior} />
      {existingPolygon()}
      {existingMarker()}
      {/* <Polygon pathOptions={{color: 'white'}} positions={zona1} /> */}
      {/* <Polygon pathOptions={{color: 'blue'}} positions={lote} /> */}
      {/* <Markers/> */}
    </MapContainer>
  );
}