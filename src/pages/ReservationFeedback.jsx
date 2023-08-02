//* Importo HelmetData para agregar metadata dinámica
import HelmetData from '../components/HelmetData'
import '../assets/styles/reservationForm.css'
import { useLocation } from 'react-router-dom'
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import {useEffect,useState} from 'react'

//* Importo el hook para redireccionar
import { useNavigate } from 'react-router-dom'

import ReservationSuccess from '../components/Reservation/ReservationSuccess'
//* Importo el hook useLots para obtener los datos del lote
import { useLots } from '../context/LotsContext'
import { deleteTempFiles,moveReservationDocuments } from '../services/firebase.config'
export default function ReservationForm({metaData}) {
  const location = useLocation()
  const navigate = useNavigate()
  const queries = new URLSearchParams(location.search)

  //* Context de lotes
  const { getPaymentFeedback,reserveLot } = useLots()
  const [reservation,setReservation]=useState({})

  const feedbackView = {
      loading:
            <div className='col-12 d-flex flex-column align-items-center justify-content-center'>
              <h1 className='alert alert-info text-quintas-green'>Estamos procesando tu pago</h1>
              <h2 className='alert alert-warning text-danger' role="alert">Por favor no cierres esta ventana</h2>
              <div className=' p-2'>
                <div className="spinner-border text-quintas-green" role="status"/>
              </div>
            </div>,
      failure:
            <div className='col-12 d-flex justify-content-center'>
              <h1 className='alert alert-danger text-danger col-12 col-md-8 col-lg-6 text-center fw-bold'>Hubo un error al procesar tu pago</h1>
            </div>
  }
  const [feedbackResponse,setFeedbackResponse] = useState(feedbackView.loading)
  const [feedbackData,setFeedbackData] = useState(null)
  const [status,setStatus]=useState('')

  useEffect(() => {
    //* Función que obtiene los datos del pago
    const getFeedback = async () => {
      //* Obtengo los datos del pago
      const paymentData={
        payment_id: queries.get('payment_id'),
        status: queries.get('status'),
        merchant_order_id: queries.get('merchant_order_id'),
        preference_id: queries.get('preference_id'),
      }

      //* Si el usuario cancela el pago, elimino los archivos temporales y lo redirecciono a la página de inicio
      if(paymentData.payment_id==='null'||paymentData.status==='null'||paymentData.merchant_order_id==='null'||paymentData.preference_id==='null'){
        deleteTempFiles()
        navigate('/')
        return null
      }

      try{
        //* Obtengo el feedback del pago
        const feedback = await getPaymentFeedback(paymentData)
        //* Si el pago ya fue procesado, lo redirecciono a la página de inicio
        setFeedbackData(feedback)
        return feedback
      }catch(error){
        console.log(error)
      }
    }

    //* Función que maneja la reserva final del lote
    const reserve = async () => {
      try{
        const response = await reserveLot(feedbackData)
        console.log(response)
        moveReservationDocuments()
        setStatus('success')
        setFeedbackResponse(<ReservationSuccess reservation={response}/>)
      }catch(error){
        console.log(error)
        setFeedbackResponse(feedbackView.failure)
      }
    }

    //* FLUJO DE LA RESERVA

    //* 1- Si no hay datos del pago, los solicito
    if(feedbackData==null){
      getFeedback()
    }else{
      //* 2.1- Si el pago fue aprobado, reservo el lote
      if(feedbackData.payment.status === 'approved'||feedbackData.payment.status === 'pending'||feedbackData.payment.status === 'in_process'){
        //* Si el estado es distinto de success, significa que aún no se reservó el lote, y recién ahí se ejecuta la reserva
        if(status!=='success'){
          reserve()
        }
      }else{
        //* 2.2- Si el pago no fue aprobado, muestro el error
        setFeedbackResponse(feedbackView.failure)
      }
    }
  }, [feedbackView,reservation,setReservation,feedbackResponse])
  return (
    <>
      <Header />
      <main className="container-fluid p-0 px-3 my-3">
        <HelmetData metaData={metaData} />
        {feedbackResponse}
      </main>
      <Footer />
    </>
  )
}