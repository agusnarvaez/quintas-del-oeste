import { useEffect,useState } from 'react'
import {useLots}from '../../context/LotsContext'
import DeleteConfirmation from './DeleteConfirmation'
import ReservationData from './ReservationData'
export default function LotsList({setEditionForm,setShowForm}) {

  const {lots,setLot,fetchLots} = useLots()
  const [showPopUp,setShowPopUp] = useState(false)
  const [lotToDelete,setLotToDelete] = useState({})

  const edit = (lotToEdit)=>{
    setShowForm(true)
    setLot(lotToEdit)
    setEditionForm(true)
  }
  const showPopUpDelete = (lot)=>{
    setLotToDelete(lot)
    setShowPopUp(true)
  }
  const hidePopUp = ()=>{
    setShowPopUp(false)
    setLotToDelete({})
  }

  useEffect(()=>{
    if(lots.length === 0) fetchLots()
  },[lots,fetchLots])

  return (
    <section className="lotsList text-admin-primary bg-admin-primary col-12 m-0 justify-content-center position-relative">
      <h2>LOTES</h2>
      <div className="lotList-table d-flex flex-column text-admin-primary bg-admin-primary">
        <ul className='lotList-header d-flex justify-content-between fw-bold text-admin-primary bg-admin-primary'>
            <li className='lotList-header-item col-1'>N°</li>
            <li className='lotList-header-item col-1'>Manzana</li>
            <li className='lotList-header-item col-1'>Área</li>
            <li className='lotList-header-item col-2'>Precio</li>
            {/* <li className='lotList-header-item col-1'>Porcentaje de reserva</li>
            <li className='lotList-header-item col-2'>Financiación</li> */}
            <li className='lotList-header-item col-1'>Estado</li>
            <li className='lotList-header-item col-3'>Acciones</li>
        </ul>
        <div className='lotList-content text-admin-primary bg-admin-primary'>
            {
              lots
                ?.sort((a, b) => a.number - b.number)
                .map((lot,i)=>{
                return(
                  <article className='lotList-content-row d-flex justify-content-between my-3' key={i}>
                    <div className='lotList-content-item col-1 fw-bold'>{lot.number}</div>
                    <div className='lotList-content-item col-1 '>{lot.block}</div>
                    <div className='lotList-content-item col-1 '>{lot.area} m2</div>
                    <div className='lotList-content-item col-2 '>USD {lot.price}</div>
                    {/* <div className='lotList-content-item col-1 '>{lot.reservationPercentage}%</div> */}
                    {/* <div className='lotList-content-item col-2 '>{lot.financiation?"Si":"No"}</div> */}
                    <div className='lotList-content-item col-1 position-relative '>{lot.reservation?<ReservationData id={lot.reservation} />:"Sin reservar"}</div>
                    <div className='lotList-content-item d-flex col-3'>
                    {showPopUp&&lotToDelete===lot?
                      <DeleteConfirmation lot={lot} hidePopUp={hidePopUp}/>:
                      <>
                        <button onClick={()=>edit(lot)} className="bi bi-pencil-square btn btn-primary me-2" > Editar</button>
                        <button onClick={()=>showPopUpDelete(lot)} className="bi bi-trash btn btn-danger ms-2" > Eliminar</button>
                      </>
                    }
                    </div>
                  </article>)})
            }
        </div>
      </div>
    </section>
  )
}