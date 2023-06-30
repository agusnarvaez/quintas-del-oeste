import {Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import IconLocation from './IconLocation'


export default function Markers({lot}) {
    const coordinates = {lat:lot.coordinates.lat,lng:lot.coordinates.lng}
    return(
        <Marker position={coordinates} icon={IconLocation}>
            <Popup>
                <ul className='list-group list-group-flush list-unstyled'>
                    <li className='list-group-item'><b>N° de lote:</b> {lot.number}</li>
                    <li className='list-group-item'><b>Precio:</b> USD {lot.price}</li>
                    <li className='list-group-item'><b>Área:</b> {lot.area}m2</li>
                    <li className='list-group-item'><b>Precio de reserva:</b> USD {(lot.price*lot.reservationPercentage)/100}</li>
                    {lot.financiation?<li className='list-group-item text-success fw-bold'>Con financiación</li>:<li className='list-group-item text-danger'>Sin financiación</li>}
                    {lot.reserved?<li className='btn btn-danger'>Reservado</li>:<li className='btn btn-success'>Reservar</li>}
                </ul>
            </Popup>
        </Marker>
    )
}