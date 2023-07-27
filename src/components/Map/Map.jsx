import { useEffect } from 'react'

//* Mapa y editor de mapa
import { MapContainer,ImageOverlay  } from 'react-leaflet'

//* Estilos de mapa
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

//* Ubicacion de lotes
import LotLocation from './LotLocation'
import MapEditor from './MapEditor'
import ExistingMarker from './ExistingMarker'

//* Mapa propio
import quintasMap from '../../assets/map/mapaQuintas.png'

//* Capa de google Maps
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'

//* Contexto de lotes
import { useLots } from '../../context/LotsContext'
import credentials from '../../credentials'

export default function Map({setValue,getValues,adminMode}) {
    const {lot,lots,fetchLots} = useLots()

    useEffect(()=>{
      if(lots.length === 0) fetchLots()
    },[lot])

  return (
    <div className={adminMode?'map-container-admin':'map-container'}>
    <MapContainer
      center={{lat:"-34.611877785557",lng:"-58.98403511557229"}}
      zoom={16}
      //Agregar medidas
      style={{ width: '100%', height: '100%' }}
      className='leaflet-container'
    >
      { adminMode && <MapEditor setValue={setValue} /> }
      <ImageOverlay
        url={quintasMap}
        /* [-34.61787267051479,-58.99489995728686],[-34.60686830849178, -58.97591241408306] */
        bounds={[
          [-34.61796764772112,-58.9950967727591],
          [-34.60685310029432, -58.97588954690971]]}
      />

      <ReactLeafletGoogleLayer apiKey={credentials.mapsKey} type={'roadmap'} />

      {adminMode && <ExistingMarker getValues={getValues}/>}

      { lots.map((lotToShow,index)=> <LotLocation lot={lotToShow} key={index}/> ) }
    </MapContainer>
    </div>
  )
}