import { useEffect } from 'react'

//* Mapa y editor de mapa
import { MapContainer, FeatureGroup,Marker,ImageOverlay  } from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'

//* Estilos de mapa
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

//* Ubicacion de lotes
import LotLocation from './LotLocation'
import IconLocation from './IconLocation'

//* Mapa propio
import quintasMap from '../../assets/map/mapaQuintas.png'

//* Capa de google Maps
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'

//* Contexto de lotes
import { useLots } from '../../context/LotsContext'
import credentials from '../../credentials'

export default function MapEditor({setValue,getValues}) {
    const {lot,lots} = useLots()

    const _onCreate = (e) => {
      if(e.layerType==='marker'){
        setValue('coordinates.lat',e.layer._latlng.lat)
        setValue('coordinates.lng',e.layer._latlng.lng)
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
        }
      })
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
    <div className='map-container-admin'>
    <MapContainer
      center={{lat:"-34.611877785557",lng:"-58.98403511557229"}}
      zoom={16}
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
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            polygon:false,
            marker:{
              icon:IconLocation
            }
          }}
        />
      </FeatureGroup>
      <ImageOverlay
        url={quintasMap}
        /* [-34.61787267051479,-58.99489995728686],[-34.60686830849178, -58.97591241408306] */
        bounds={[
          [-34.61796764772112,-58.9950967727591],
          [-34.60685310029432, -58.97588954690971]]}
      />


      <ReactLeafletGoogleLayer apiKey={credentials.mapsKey} type={'roadmap'} />

      { existingMarker() }

      { lots.map((lotToShow,index)=> <LotLocation lot={lotToShow} key={index}/> ) }
    </MapContainer>
    </div>
  )
}