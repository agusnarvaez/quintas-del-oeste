//* Mapa y editor de mapa
import {FeatureGroup } from 'react-leaflet'
import {EditControl} from 'react-leaflet-draw'

//* Estilos de mapa
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

//* Ubicacion de lotes
import IconLocation from './IconLocation'

export default function MapEditor({setValue}) {

    const _onCreate = (e) => {
        setValue('coordinates.lat',e.layer._latlng.lat)
        setValue('coordinates.lng',e.layer._latlng.lng)
    }

    const _onEdited = (e) => {
      console.log(e)
    }

    const _onDeleted = (e) => {
      e.layers.eachLayer(layer => {
          setValue('coordinates.lat',0)
          setValue('coordinates.lng',0)
      })
    }

  return (
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
  )
}