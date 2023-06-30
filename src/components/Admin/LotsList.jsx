import { useEffect } from 'react'
import {useLots}from '../../context/LotsContext'

export default function LotsList({setEditionForm}) {

  const {lots,setLot,fetchLots,deleteLot} = useLots()

  const edit = (lotToEdit)=>{
    setEditionForm(true)
    setLot(lotToEdit)
  }

  useEffect(()=>{
    if(lots.length === 0) fetchLots()
  },[lots,fetchLots])

  return (
    <section className="bg-dark-subtle col-12 m-0 row justify-content-center">
      <h2>LOTES</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Área</th>
            <th scope="col">Precio</th>
            <th scope="col">Porcentaje de reserva</th>
            <th scope="col">Financiación</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
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
                    <td>
                      <button onClick={()=>edit(lot)} className="btn btn-primary me-2" >Editar</button>
                      <button onClick={()=>deleteLot(lot)} className="btn btn-danger ms-2" >Eliminar</button>
                    </td>
                  </tr>)})
            }
        </tbody>
      </table>
    </section>
  )
}