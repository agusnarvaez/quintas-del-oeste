import 'leaflet/dist/leaflet.css'
import Marker from './Marker'
import {Polygon } from 'react-leaflet'

export default function LotLocation({lot}) {
    return(
        <>
            <Polygon  pathOptions={{color: lot.reserved?'red':'blue'}} positions={[[lot.perimeter.x1.lat,lot.perimeter.x1.lng],[lot.perimeter.x2.lat,lot.perimeter.x2.lng],[lot.perimeter.y1.lat,lot.perimeter.y1.lng],[lot.perimeter.y2.lat,lot.perimeter.y2.lng]]}/>
            <Marker mapLot={lot} />
        </>
    )
}