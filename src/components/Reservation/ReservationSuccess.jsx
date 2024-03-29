
export default function ReservationSuccess({reservation}) {
  const paymentStatus = ()=>{
    switch(reservation.payment_status){
      case 'approved':
        return <span className='text-success'>Aprobado</span>
      case 'pending':
        return <span className='text-warning'>Pendiente</span>
      case 'in_process':
        return <span className='text-warning'>En proceso</span>
      case 'rejected':
        return <span className='text-danger'>Rechazado</span>
      default:
        return <span className='text-danger'>Error</span>
    }
  }
  return (
    <div className='col-12 d-flex flex-column align-items-center'>
              <h1 className='alert alert-success text-center bg-quintas-green col-12 col-lg-6'>Felicitaciones {reservation?reservation.userEmail:null}, has reservado tu lote!</h1>
              <div className='col-12'>
                <h2>Datos de tu reserva</h2>
                  <ul className='list-group list-group-flush list-unstyled'>
                    <li className='list-group-item'><b>ID de reserva:</b>{reservation?reservation.reservation_id:null} </li>
                    <li className='list-group-item'><b>Email:</b>{reservation?reservation.userEmail:null} </li>
                    <li className='list-group-item'><b>N° de lote:</b>{reservation.lot.number} </li>
                    <li className='list-group-item'><b>N° de Manzana:</b>{reservation.lot.block} </li>
                    <li className='list-group-item'><b>Precio:</b> USD {reservation.lot.price} </li>
                    <li className='list-group-item'><b>Área:</b> {reservation.lot.area}m2 </li>
                    <li className='list-group-item'><b>Precio de reserva:</b> $50.000</li>
                    <li className='list-group-item'><b>Estado de pago:</b> {paymentStatus()}</li>
                  </ul>
              </div>
              <p>Recibirás un mail a la brevedad</p>
              <h3>Recordá guardar el número de reserva</h3>
      </div>
  )
}