//* Importo HelmetData para agregar metadata dinámica
import HelmetData from '../components/HelmetData'
import '../assets/styles/reservationForm.css'
import { useLocation } from 'react-router-dom'
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import {useState} from 'react'

//* Importo el hook useLots para obtener los datos del lote
import { useLots } from '../context/LotsContext'

export default function ReservationForm({metaData}) {
  const location = useLocation()
  const queries = new URLSearchParams(location.search)

  const paymentData={
    collection_id: queries.get('collection_id'),
    collection_status: queries.get('collection_status'),
    payment_id: queries.get('payment_id'),
    status: queries.get('status'),
    external_reference: queries.get('external_reference'),
    payment_type: queries.get('payment_type'),
    merchant_order_id: queries.get('merchant_order_id'),
    preference_id: queries.get('preference_id'),
    site_id: queries.get('site_id'),
    processing_mode: queries.get('processing_mode'),
    merchant_account_id: queries.get('merchant_account_id')
  }
  
  //* Context de lotes
  const { lot } = useLots()


  return (
    <>
      <Header />
      <main className="container-fluid p-0 px-3 my-3">
        <HelmetData metaData={metaData} />
        <h1>Has reservado tu lote!</h1>
        <div className='col-12 col-lg-6'>
          <h2> Datos de lote</h2>
          <ul className='list-group list-group-flush list-unstyled'>
            <li className='list-group-item'><b>N° de lote:</b>{lot.number} </li>
            <li className='list-group-item'><b>N° de Manzana:</b>{lot.block} </li>
            <li className='list-group-item'><b>Precio:</b> USD {lot.price} </li>
            <li className='list-group-item'><b>Área:</b> {lot.area}m2 </li>
            <li className='list-group-item'><b>Precio de reserva:</b> USD {(lot.price * lot.reservationPercentage) / 100} </li>
            {lot.financiation ? <li className='list-group-item text-quintas-green fw-bold'>Con financiación</li> : <li className='list-group-item text-danger'>Sin financiación</li>}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}