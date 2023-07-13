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
    const getFeedback = async () => {
      const paymentData={
        payment_id: queries.get('payment_id'),
        status: queries.get('status'),
        merchant_order_id: queries.get('merchant_order_id'),
        preference_id: queries.get('preference_id'),
      }
      if(paymentData.payment_id==='null'||paymentData.status==='null'||paymentData.merchant_order_id==='null'||paymentData.preference_id==='null'){
        navigate('/')
        return null
      }
      try{
        const feedback = await getPaymentFeedback(paymentData)
        console.log(feedback)
        setFeedbackData(feedback)
        return feedback
      }catch(error){
        console.log(error)
      }
    }
    const reserve = async () => {
      try{
        const response = await reserveLot(feedbackData)
        console.log(response)
        //setReservation(response)
        //console.log(reservation)
        setStatus('success')
        setFeedbackResponse(<ReservationSuccess reservation={response}/>)
      }catch(error){
        console.log(error)
        setFeedbackResponse(feedbackView.failure)
      }
    }

    if(feedbackData==null){

      getFeedback()
    }else{
      if(feedbackData.payment.status === 'approved'||feedbackData.payment.status === 'pending'||feedbackData.payment.status === 'in_process'){
        if(status!=='success'){
          reserve()
        }
      }else{
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