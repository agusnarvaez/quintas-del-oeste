import {useEffect, useState} from "react"
import {useLots} from "../../../context/LotsContext"
export default function ReservationData({id}) {
  const [show,setShow]=useState(false)
  const [reservation,setReservation]=useState({})
  const {fetchReservation} = useLots()
  const getReservation = async (id) => {
    try{
      const response = await fetchReservation(id)
      setReservation(response)
    }catch(error){
      console.log(error)
      return error
    }
  }
  useEffect(()=>{
    if(show) {
      getReservation(id)
    }

  },[id,show])
  return (
    <>
      {
        show?
        <div className="reservation-deails p-2 m-0" onClick={()=>setShow(false)}>
          <i className="btn btn-danger bi bi-x p-1 m-0 fs-5 col-12"></i>
          <ul className="list-unstyled m-0 col-12 mt-3">
            <li className="m-0 "><b>DNI:</b> {reservation.dni}</li>
            {reservation.userId?
            <>
              <li className="m-0 "><b>NOMBRE:</b>{reservation.userId.name}</li>
              <li className="m-0 "><b>APELLIDO:</b> {reservation.userId.lastName}</li>
              <li className="m-0 "><b>EMAIL:</b> {reservation.userId.email}</li>
            </>
            :null}
            <li className="m-0 "><b>TEL:</b> {reservation.phone}</li>
            <li className="m-0 "><b>PAGO:</b> {reservation.paymentId}</li>
          </ul>
        </div>
        :<button className="btn btn-success me-2" onClick={()=>setShow(true)}>Reservado</button>
      }
    </>
  )
}