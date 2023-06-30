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
    const [formErrors,setFormErrrors] = useState([])

    const lotController ={
        create: async (lot) => {
            try{
                const response = await apiLot.create(lot)
                setLots([...lots,response.data.lot])
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
                await apiLot.update(lotToUpdate)
                await lotController.getAll()
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        delete: async (lot) => {
            try{
                await apiLot.delete(lot._id)
                setLot({})
                await lotController.getAll()
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
            }
        },
        reserve: async (lot) => {
            try{
                const response = await apiLot.reserve(lot)
                setLots([...lots,response.data.lot])
            }catch(error){
                console.log(error)
                setFormErrrors(error.response.data.errors)
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
            formErrors,
            createLot:lotController.create,
            fetchLots:lotController.getAll,
            getLot:lotController.get,
            updateLot:lotController.update,
            deleteLot:lotController.delete
        }}>
            {children}
        </LotsContext.Provider>
    )
}