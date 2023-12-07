//* Estilos de mapa
import { Marker } from 'react-leaflet'

import {getIconSize,createIcon} from '../../utils/mapUtils'

export default function ExistingMarker({getValues,zoom}) {

  const conditionLat = getValues('coordinates.lat')!=="0"&&getValues('coordinates.lat')!==undefined
  const conditionLng = getValues('coordinates.lng')!=="0"&&getValues('coordinates.lng')!==undefined

  return (
    <>
      {(conditionLat&&conditionLng)&&<Marker
              position={
                {
                  lat:getValues('coordinates.lat'),
                  lng:getValues('coordinates.lng')
                }
              }
              icon={createIcon(getIconSize(zoom),'selected')}/>}
    </>
  )
}