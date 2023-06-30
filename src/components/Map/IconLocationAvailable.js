import homeIcon from "../../assets/locationIcon-success.svg"
import L from 'leaflet'

const IconLocation = L.icon({
    iconUrl: homeIcon,
    iconRetinaURL: homeIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -10],
    shadowSize: [25, 25],
    className: ''
})

export default IconLocation