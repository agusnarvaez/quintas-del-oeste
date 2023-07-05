//* Importo el contexto de los lotes
import { useLots } from '../../context/LotsContext'

//* Importo el hook para redireccionar
import { useNavigate } from 'react-router-dom'

//* Importo los componentes de Leaflet que me permiten agregar marcadores y popups
import {Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' //* Importo los estilos de Leaflet

//* Importo los iconos que voy a usar para los marcadores tanto para lotes disponibles como reservados
import IconLocationAvailable from './IconLocationAvailable'
import IconLocationReserved from './IconLocationReserved'

export default function Markers({mapLot}) {
    //* Hook para guardar el lote seleccionado
    const {setLot} = useLots()

    //* Guardo las coordenadas del lote
    const coordinates = {lat:mapLot.coordinates.lat,lng:mapLot.coordinates.lng}

    //* Guardo el lote y redirecciono a la página de reserva
    const navigate = useNavigate() //* Hook para redireccionar
    const reserveLot = (lotToReserve)=>{
        setLot(lotToReserve)
        navigate("/reservar-lote")
    }

    return(
        <Marker position={coordinates} icon={mapLot.reserved?IconLocationReserved:IconLocationAvailable}>
            <Popup>
                <ul className='list-group list-group-flush list-unstyled'>
                    <li className='list-group-item'><b>N° de lote:</b> {mapLot.number}</li>
                    <li className='list-group-item'><b>N° de Manzana:</b> {mapLot.block}</li>
                    <li className='list-group-item'><b>Precio:</b> USD {mapLot.price}</li>
                    <li className='list-group-item'><b>Área:</b> {mapLot.area}m2</li>
                    <li className='list-group-item'><b>Precio de reserva:</b> USD {(mapLot.price*mapLot.reservationPercentage)/100}</li>
                    {mapLot.financiation?<li className='list-group-item text-quintas-green fw-bold'>Con financiación</li>:<li className='list-group-item text-danger'>Sin financiación</li>}
                    {mapLot.reserved?<li className='btn btn-danger'>Reservado</li>:<li onClick={()=>reserveLot(mapLot)} className='btn btn-success bg-quintas-green border-quintas-green fw-bold'>Reservar</li>}
                </ul>
            </Popup>
        </Marker>
    )
}