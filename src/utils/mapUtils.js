import L from 'leaflet'


//* Importo los iconos que voy a usar para los marcadores tanto para lotes disponibles como reservados
import selectedIcon from "../assets/locationIcon-normal.svg"
import available from "../assets/locationIcon-success.svg"
import reserved from "../assets/locationIcon-danger.svg"


export const createIcon = (size,type) => {
    return L.icon({
        iconUrl: selectIcon[type],
        iconRetinaURL: selectIcon[type],
        iconSize: size,
        iconAnchor: [size[0] / 2, size[1] / 2],
        popupAnchor: [0, -10],
        shadowSize: [25, 25],
        className: ''
    })
}

const selectIcon = {
    available: available,
    reserved: reserved,
    selected: selectedIcon,
    'undefined': available
}

export const isReserved = (reservation) => reservation? 'reserved' : 'available'

// Función para ajustar el tamaño del icono basado en el nivel de zoom
export const getIconSize = (zoom) => {
    // Aquí ajustas el tamaño según el nivel de zoom
    if (zoom > 25) return [30, 30]
    if (zoom > 22) return [24, 24]
    if (zoom > 20) return [100, 100]
    if (zoom > 19) return [70, 70]
    if (zoom > 18) return [40, 40]
    if (zoom > 17) return [25, 25]
    if (zoom > 16) return [17, 17]
    if (zoom > 15) return [10, 10]
    return [zoom-1, zoom-1]
}

export const isSelected=(originalValues,lotToCompare)=>originalValues.coordinates.lat===lotToCompare.coordinates.lat&&originalValues.coordinates.lng===lotToCompare.coordinates.lng