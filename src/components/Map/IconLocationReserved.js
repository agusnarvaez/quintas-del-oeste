

import homeIcon from "../../assets/locationIcon-danger.svg"
import L from 'leaflet'

const IconLocation = L.icon({
    iconUrl: homeIcon,
    iconRetinaURL: homeIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -10],
    shadowSize: [25, 25],
    className: ''
})


export default IconLocation