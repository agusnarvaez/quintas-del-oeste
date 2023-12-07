//* Importo el contexto de los lotes
import { useLots } from '../../context/LotsContext'

//* Importo el hook para redireccionar
import { useNavigate } from 'react-router-dom'

//* Importo los componentes de Leaflet que me permiten agregar marcadores y popups
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' //* Importo los estilos de Leaflet

//* Para hacer scroll suave
import Scroll from 'react-scroll'

import {createIcon,isReserved,getIconSize} from '../../utils/mapUtils'

export default function Markers({lot,size,zoom}) {
    //* Hook para guardar el lote seleccionado
    //* Guardo el lote y redirecciono a la página de reserva
    const navigate = useNavigate() //* Hook para redireccionar
    const {setLot} = useLots()
    var scroller = Scroll.animateScroll

    //* Guardo las coordenadas del lote
    const coordinates = {lat:lot.coordinates.lat,lng:lot.coordinates.lng}

    const reserveLot = (lotToReserve)=>{
        setLot(lotToReserve)
        scroller.scrollToTop()
        navigate("/reservar-lote")
    }

    return(
        <Marker position={coordinates} icon={createIcon(getIconSize(zoom),isReserved(lot.reservation))}>
            <Popup>
                <ul className='list-group list-group-flush list-unstyled'>
                    <li className='list-group-item'><b>N° de lote:</b> {lot.number}</li>
                    <li className='list-group-item'><b>N° de Manzana:</b> {lot.block}</li>
                    <li className='list-group-item'><b>Precio:</b> USD {lot.price}</li>
                    <li className='list-group-item'><b>Área:</b> {lot.area}m2</li>
                    <li className='list-group-item'><b>Precio de reserva:</b> $ 50.000</li>
                    {/* {lot.financiation?<li className='list-group-item text-quintas-green fw-bold'>Con financiación</li>:<li className='list-group-item text-danger'>Sin financiación</li>} */}
                    {lot.reservation?<li className='btn btn-danger'>Reservado</li>:<li onClick={()=>reserveLot(lot)} className='btn btn-success bg-quintas-green border-quintas-green fw-bold'>Reservar</li>}
                </ul>
            </Popup>
        </Marker>
    )
}