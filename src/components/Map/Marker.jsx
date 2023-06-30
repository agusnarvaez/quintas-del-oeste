import {Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import IconLocation from './IconLocation'


export default function Markers({coordinates}) {

    return(
        <Marker position={coordinates} icon={IconLocation}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    )
}