import {Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import IconLocation from './IconLocation'


export default function Markers({places}) {
 /*    const markers = places.map((item) => {
        
    }) */
    
    return(
        <Marker position={{lat:"-34.62058929730762",lng:"-58.981031506685305"}} icon={IconLocation}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    )
}