import { useEffect,useState } from 'react'
import React from 'react'
//* Mapa y editor de mapa
import { MapContainer,ImageOverlay,useMapEvents,useMap } from 'react-leaflet'

//* Estilos de mapa
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

//* Ubicacion de lotes
import Marker from './Marker'
import MapEditor from './MapEditor'
import ExistingMarker from './ExistingMarker'

//* Mapa propio
import quintasMap from '../../assets/map/mapaQuintas.png'

//* Contexto de lotes
import { useLots } from '../../context/LotsContext'

import {isSelected} from '../../utils/mapUtils'

export default function Map({setValue,getValues,adminMode}) {
    const {lot,lots,fetchLots} = useLots()
    const [zoomLevel, setZoomLevel] = useState(13)
    useEffect(()=>{
      if(lots.length === 0) fetchLots()
    },[lot])

    function ZoomListener({ setZoomLevel }) {
      const map = useMap() // Obtiene la instancia del mapa
      useMapEvents({
          zoomend: () => {
              setZoomLevel(map.getZoom()) // Usa el objeto del mapa para obtener el nivel de zoom actual
          }
      })
      return null
    }

  return (
    <div className={adminMode?'map-container-admin':'map-container'}>
    <MapContainer
      center={{lat:"-34.611877785557",lng:"-58.98403511557229"}}
      zoom={16}
      //Agregar medidas
      style={{ width: '100%', height: '100%' }}
      className='leaflet-container'
    >
      <ZoomListener setZoomLevel={setZoomLevel} />

      { adminMode && <MapEditor setValue={setValue} /> }
      <ImageOverlay
        url={quintasMap}

        bounds={[
          [-34.61796764772112,-58.9950967727591],
          [-34.60685310029432, -58.97588954690971]]}
      />

      {adminMode && <ExistingMarker getValues={getValues} zoom={zoomLevel}/>}

      { lots.map((lotToShow,index)=>
        ((!lotToShow.reservation&&!adminMode) ||
        (adminMode&&!isSelected(getValues(),lotToShow)))
         &&
        <Marker
          key={index}
          lot={lotToShow}
          zoom={zoomLevel}
          /> ) }
    </MapContainer>
    </div>
  )
}