import React from 'react'
import { MapContainer, Polygon, FeatureGroup,Marker } from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import LotLocation from './LotLocation'
import IconLocation from './IconLocation'
import { useLots } from '../../context/LotsContext'
import { useEffect } from 'react'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import credentials from '../../credentials'

export default function MapEditor({setValue,getValues}) {
    const {lot,lots} = useLots()
    const contornoExterior = [
      [-34.61740919669242,-58.98954391479492],
      [-34.61183817736672,-58.978638052940376],
      [-34.60659130207151,-58.982656002044685],
      [-34.60952613636645, -58.988385200500495],
      [-34.61202541727224,-58.986432552337654],
      [-34.61478167476339, -58.99168968200684]
    ]

/*     const zona1 = [
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
    ] */

    const _onCreate = (e) => {
      if(e.layerType==='marker'){
        setValue('coordinates.lat',e.layer._latlng.lat)
        setValue('coordinates.lng',e.layer._latlng.lng)
      }
      if(e.layerType==='polygon'){
        const perimeter = e.layer.editing.latlngs[0][0]
        setValue('perimeter.x1.lat',perimeter[0].lat)
        setValue('perimeter.x1.lng',perimeter[0].lng)
        setValue('perimeter.x2.lat',perimeter[1].lat)
        setValue('perimeter.x2.lng',perimeter[1].lng)
        setValue('perimeter.y1.lat',perimeter[2].lat)
        setValue('perimeter.y1.lng',perimeter[2].lng)
        setValue('perimeter.y2.lat',perimeter[3].lat)
        setValue('perimeter.y2.lng',perimeter[3].lng)
      }
    }

    const _onEdited = (e) => {
      console.log(e)
    }
    const _onDeleted = (e) => {
      e.layers.eachLayer(layer => {
        const esUnMarker = layer.editing._marker
        if(esUnMarker){
          setValue('coordinates.lat',0)
          setValue('coordinates.lng',0)
        }else{
          setValue('perimeter.x1.lat',0)
          setValue('perimeter.x1.lng',0)
          setValue('perimeter.x2.lat',0)
          setValue('perimeter.x2.lng',0)
          setValue('perimeter.y1.lat',0)
          setValue('perimeter.y1.lng',0)
          setValue('perimeter.y2.lat',0)
          setValue('perimeter.y2.lng',0)
        }
      })
    }

    const _onMounted = drawControl => {
      /* console.log("_onMounted", drawControl) */
    }

    const existingPolygon = ()=>{
      const polygon ={
        x1:{
          lat:getValues('perimeter.x1.lat'),
          lng:getValues('perimeter.x1.lng')
        },
        x2:{
          lat:getValues('perimeter.x2.lat'),
          lng:getValues('perimeter.x2.lng')
        },
        y1:{
          lat:getValues('perimeter.y1.lat'),
          lng:getValues('perimeter.y1.lng')
        },
        y2:{
          lat:getValues('perimeter.y2.lat'),
          lng:getValues('perimeter.y2.lng')
        }
      }

      const conditionX1 = getValues('perimeter.x1.lat')!=="0"&&getValues('perimeter.x1.lat')!==undefined && getValues('perimeter.x1.lng')!=="0"&&getValues('perimeter.x1.lng')!==undefined
      const conditionX2 = getValues('perimeter.x2.lat')!=="0"&&getValues('perimeter.x2.lat')!==undefined && getValues('perimeter.x2.lng')!=="0"&&getValues('perimeter.x2.lng')!==undefined
      const conditionY1 = getValues('perimeter.y1.lat')!=="0"&&getValues('perimeter.y1.lat')!==undefined && getValues('perimeter.y1.lng')!=="0"&&getValues('perimeter.y1.lng')!==undefined
      const conditionY2 = getValues('perimeter.y2.lat')!=="0"&&getValues('perimeter.y2.lat')!==undefined && getValues('perimeter.y2.lng')!=="0"&&getValues('perimeter.y2.lng')!==undefined

      if(conditionX1&&conditionX2&&conditionY1&&conditionY2){
        return <Polygon pathOptions={{color: 'red'}} positions={[[polygon.x1.lat,polygon.x1.lng],[polygon.x2.lat,polygon.x2.lng],[polygon.y1.lat,polygon.y1.lng],[polygon.y2.lat,polygon.y2.lng]]}/>
      }
    }

    const existingMarker = ()=>{
      const conditionLat = getValues('coordinates.lat')!=="0"&&getValues('coordinates.lat')!==undefined
      const conditionLng = getValues('coordinates.lng')!=="0"&&getValues('coordinates.lng')!==undefined
      if(conditionLat&&conditionLng){
        return <Marker position={{lat:getValues('coordinates.lat'),lng:getValues('coordinates.lng')}} icon={IconLocation}/>
      }
    }

    useEffect(()=>{

    },[lot])

    return (
      <div className='map-container'>
      <MapContainer
        center={{lat:"-34.613884",lng:"-58.982545"}}
        zoom={15}
        //Agregar medidas
        style={{ width: '100%', height: '100%' }}
        className='leaflet-container'
      >
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          onMounted={_onMounted}

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

        <ReactLeafletGoogleLayer apiKey={credentials.mapsKey} type={'roadmap'} />
      <Polygon pathOptions={{color: 'gray'}} positions={contornoExterior} />
      {existingPolygon()}
      {existingMarker()}
      {
        lots.map((lotToShow,index)=> <LotLocation lot={lotToShow} key={index}/> )
      }
    </MapContainer>
    </div>
  )
}