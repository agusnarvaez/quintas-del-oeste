import React from 'react'
import { MapContainer, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import LotLocation from './LotLocation'
import { useLots } from '../../context/LotsContext'
import { useEffect } from 'react'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import credentials from '../../credentials'

export default function MapEditor({setValue,getValues}) {
    const {lot,lots,fetchLots} = useLots()
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

    useEffect(()=>{
      if(lots.length === 0) fetchLots()
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

      <ReactLeafletGoogleLayer apiKey={credentials.mapsKey} type={'roadmap'} />
      <Polygon pathOptions={{color: 'gray'}} positions={contornoExterior} />
      {
        lots.map((lotToShow,index)=> <LotLocation lot={lotToShow} key={index}/> )
      }
    </MapContainer>
    </div>
  )
}