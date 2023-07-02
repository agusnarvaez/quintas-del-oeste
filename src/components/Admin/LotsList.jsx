import { useEffect,useState } from 'react'
import {useLots}from '../../context/LotsContext'
import DeleteConfirmation from './DeleteConfirmation'

export default function LotsList({setEditionForm,setShowForm}) {

  const {lots,setLot,fetchLots} = useLots()
  const [showPopUp,setShowPopUp] = useState(false)
  const [lotToDelete,setLotToDelete] = useState({})

  const edit = (lotToEdit)=>{
    setShowForm(true)
    setEditionForm(true)
    setLot(lotToEdit)
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
    <section className="bg-dark-subtle col-12 m-0 row justify-content-center position-relative">
      <h2>LOTES</h2>
      <table className="table col-12">
        <thead>
          <tr>
            <th scope="col" className="w-auto">N°</th>
            <th scope="col" className="w-auto">Área</th>
            <th scope="col" className="col-1">Precio</th>
            <th scope="col" className="col-2">Porcentaje de reserva</th>
            <th scope="col" className="col-1">Financiación</th>
            <th scope="col" className="col-1">Estado</th>
            <th scope="col" className="col-5">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {
              lots
                ?.sort((a, b) => a.number - b.number)
                .map((lot,i)=>{
                return(
                  <tr key={i}>
                    <td>{lot.number}</td>
                    <td>{lot.area}</td>
                    <td>{lot.price}</td>
                    <td>{lot.reservationPercentage}%</td>
                    <td>{lot.financiation?"Si":"No"}</td>
                    <td>{lot.reservationUser?<button className="btn btn-primary me-2">Reservado</button>:"Sin reservar"}</td>
                    <td className='d-flex'>
                      <button onClick={()=>edit(lot)} className="bi bi-pencil-square btn btn-primary me-2" > Editar</button>
                      {showPopUp&&lotToDelete===lot?<DeleteConfirmation lot={lot} hidePopUp={hidePopUp}/>:<button onClick={()=>showPopUpDelete(lot)} className="bi bi-trash btn btn-danger ms-2" > Eliminar</button>}
                    </td>
                  </tr>)})
            }
        </tbody>
      </table>
    </section>
  )
}