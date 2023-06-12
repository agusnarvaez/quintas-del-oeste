

import icon from '../assets/icon.png'
import L from 'leaflet'


const IconLocation = L.icon({
    iconUrl: icon,
    iconRetinaURL: icon,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    shadowSize: [25, 25],
    className: 'leaflet-div-icon'
})

export default IconLocation