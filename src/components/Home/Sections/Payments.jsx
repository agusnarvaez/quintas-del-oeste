import Cercanias from './Location/CloseStreets'
import Direccion from './Location/Address'

import GoogleMap from './Location/GoogleMap'

import credentials from '../../../credentials'

export default function Payments() {
  return (
    <section className="container-fluid p-0 mt-5 mx-0 row justify-content-center" id="location">
      <h2 className='text-quintas-green text-center fw-bold'>FORMAS DE PAGO</h2>
      <ul className="row list-unstyled col-12 mt-2 col-md-10 col-lg-8 p-0 align-items-center justify-content-center">
        <li className='col-4 row me-1'>
          <span className='bg-quintas-gray py-3 mb-2 d-flex align-items-center justify-content-center text-center text-white fw-bold fs-2'>30%</span>
          <span className='bg-quintas-dark-gray d-flex flex-wrap justify-content-center align-items-center py-4 text-center text-white fw-bold fs-12px fs-md-14px'>ANTICIPO</span>
        </li>
        <li className='col-4 row me-1'>
        <span className='bg-quintas-gray py-3 mb-2 d-flex align-items-center justify-content-center text-center text-white fw-bold fs-2'>24</span>
          <span className='bg-quintas-dark-gray d-flex flex-wrap justify-content-center align-items-center py-4 text-center text-white fw-bold fs-12px fs-md-14px'>CUOTAS</span>
        </li>
        <li className='col-4 row'>
          <span className='bg-quintas-gray py-3 mb-2 d-flex align-items-center justify-content-center text-center text-white fw-bold fs-2'>10%</span>
          <span className='bg-quintas-dark-gray py-3 px-0 d-flex flex-wrap justify-content-center align-items-center text-center text-white fw-bold fs-12px fs-md-14px'>DE DESCUENTO<p className='fw-light m-0 fs-9px w-100'>POR PAGO EN EFECTIVO</p></span>
        </li>
      </ul>
      <div className='col-12 mt-4 row align-items-center justify-content-center'>
        <a href={credentials.whatsappApi} target='_blank' rel='noreferrer' className='greenHover text-decoration-none m-0 p-0 bg-quintas-green col-3 col-lg-2 text-white p-3 fs-4 text-center'>QUIERO MAS INFO</a>
      </div>
    </section>
  )
}