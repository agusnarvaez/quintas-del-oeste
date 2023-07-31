import { createContext, useState, useContext, useEffect } from "react"
import {  apiLot } from '../api/lots'

//* Creo el contexto de autenticación para poder usarlo en cualquier parte de la aplicación
export const LotsContext = createContext()

//* Creo un hook para poder usar el contexto de autenticación en cualquier parte de la aplicación
export const useLots = () => {
    //* Obtengo el contexto de lotes desde el proveedor LotsContext
    const context = useContext(LotsContext)
    if(!context) throw new Error("useLots debe estar dentro del proveedor LotsContext")
    return context
}

//* Creo el proveedor de lotes para poder usarlo en cualquier parte de la aplicación
export const LotsProvider = ({children}) => {
    const [lots, setLots] = useState([])
    const [lot, setLot] = useState({})
    const [reservation,setReservation]=useState({})
    const [formErrors,setFormErrrors] = useState([])

    const lotController ={
        create: async (lot) => {
            try{
                const response = await apiLot.create(lot)
                setLots([...lots,response.data.lot])
                return response
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        getAll: async () => {
            try{
                const response = await apiLot.getAll()
                setLots(response.data.lots)
            }catch(error){
                setLots([])
                console.log(error)
            }
        },
        get: async (lot) => {
            try{
                const response = await apiLot.get(lot)
                setLot(response.data.lot)
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        update: async (lotToUpdate) => {
            try{
                const response = await apiLot.update(lotToUpdate)

                const updatedLots = lots.map(lot => lot._id === response.data.lot._id? response.data.lot: lot)
                setLots(updatedLots)
                return response
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
                return error
            }
        },
        delete: async (lot) => {
            try{
                await apiLot.delete(lot._id)
                setLot({})
                setLots(lots.filter(lotItem => lotItem._id !== lot._id))
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        reserve: async (reservation) => {
            try{
                const response = await apiLot.reserve(reservation)
                return response.data
                //setLots([...lots,response.data.lot])
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        fetchReservation: async (id) => {
            try{
                const response = await apiLot.reservation(id)
                return(response.data.reservation)
            }catch(error){
                console.log(error)
                return error
            }
        },
        createPaymentOrder: async (reservation) => {
            try{
                const response = await apiLot.createPaymentOrder(reservation)
                return response
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        getPaymentFeedback: async(paymentData)=>{
            try {

                const paymentFeedback = await apiLot.getPaymentFeedback(paymentData)
                return paymentFeedback.data.response
            }catch(e){
                console.log(e)
                return e.response.data
            }
        }
    }

    useEffect(() => {
        if(formErrors.length > 0){
            const timer = setTimeout(() => {
                setFormErrrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [formErrors])

    return (
        <LotsContext.Provider value={{
            lot,
            setLot,
            lots,
            reservation,
            setReservation,
            formErrors,
            createLot:lotController.create,
            fetchLots:lotController.getAll,
            getLot:lotController.get,
            updateLot:lotController.update,
            deleteLot:lotController.delete,
            reserveLot:lotController.reserve,
            createPaymentOrder:lotController.createPaymentOrder,
            getPaymentFeedback:lotController.getPaymentFeedback,
            fetchReservation: lotController.fetchReservation
        }}>
            {children}
        </LotsContext.Provider>
    )
}