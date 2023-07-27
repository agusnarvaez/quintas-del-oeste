import { useEffect } from 'react'

//* Estilos de mapa
import IconLocation from './IconLocation'
import { Marker } from 'react-leaflet'
//* Contexto de lotes
import { useLots } from '../../context/LotsContext'

export default function ExistingMarker({getValues}) {
  const {lot} = useLots()
  const existingMarker = ()=>{
    const conditionLat = getValues('coordinates.lat')!=="0"&&getValues('coordinates.lat')!==undefined
    const conditionLng = getValues('coordinates.lng')!=="0"&&getValues('coordinates.lng')!==undefined
    if(conditionLat&&conditionLng){
      return <Marker position={{lat:getValues('coordinates.lat'),lng:getValues('coordinates.lng')}} icon={IconLocation}/>
    }
  }


  return (
    <>
      {existingMarker()}
    </>
  )
}