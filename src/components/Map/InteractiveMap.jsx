import React from 'react'
import { MapContainer, ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import LotLocation from './LotLocation'
import { useLots } from '../../context/LotsContext'
import { useEffect } from 'react'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import credentials from '../../credentials'
//* Mapa propio
import quintasMap from '../../assets/map/mapaQuintas.png'

export default function MapEditor({setValue,getValues}) {
    const {lots,fetchLots} = useLots()

    useEffect(()=>{
      if(lots.length === 0) fetchLots()
    },[])

    return (
      <div className='map-container'>
      <MapContainer
        center={{lat:"-34.611877785557",lng:"-58.98403511557229"}}
        zoom={16}
        //Agregar medidas
        style={{ width: '100%', height: '100%' }}
        className='leaflet-container'
      >
      <ImageOverlay
        url={quintasMap}
        bounds={[
          [-34.61796764772112,-58.9950967727591],
          [-34.60685310029432, -58.97588954690971]
        ]}
      />
      <ReactLeafletGoogleLayer apiKey={credentials.mapsKey} type={'roadmap'} />
      {
        lots.map((lotToShow,index)=> <LotLocation lot={lotToShow} key={index}/> )
      }
    </MapContainer>
    </div>
  )
}