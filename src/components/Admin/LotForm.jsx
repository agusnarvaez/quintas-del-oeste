
import Map from "../Map/Map"
import { useEffect,useState } from 'react'
import {useForm} from 'react-hook-form'
import {useLots}from '../../context/LotsContext'
import CRUDNotification from "./CRUDNotification"

export default function LotForm({editionForm,setEditionForm}) {
  const {register,handleSubmit,formState:{errors},getValues,setValue,reset} = useForm()
  const {lot,setLot,createLot,updateLot,deleteLot,formErrors} = useLots()
  const [showPopUp,setShowPopUp] = useState(false)
  const [text,setText] = useState("")
  const fields = [
    {
      name: "number",
      placeholder: "Número de lote",
      type: "number",
      containerClass: "col-6 col-lg-6 py-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control",
      options: {
        required: "Campo obligatorio",
        validate: (value) => (value > 0 && value <55) || "El número de lote debe ser mayor a 0 y menor a 55"
      }
    },
    {
      name: "block",
      placeholder: "Manzana",
      type: "number",
      containerClass: "col-6 col-lg-6 py-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control",
      options: {
        required: "Campo obligatorio",
        validate: (value) => (value > 0 && value <52) || "El número de manzana debe ser mayor a 0 y menor a 52"
      }
    },
    {
      name: "area",
      placeholder: "Área",
      type: "text",
      containerClass: "col-6 col-lg-6 py-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control",
      options: {
        required: "Campo obligatorio",
        validate: (value) => value >= 100 || "El valor debe ser mayor a 100"
      }
    },
    {
      name: "price",
      placeholder: "Precio",
      type: "text",
      containerClass: "col-6 col-lg-6 py-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control col-2",
      options: {
        required: "Campo obligatorio",
        validate: (value) => value >= 10000 || "El valor debe ser mayor a 10000"
      }
    }
  ]
  const initialValues ={
    number: 0,
    block: 0,
    area: '',
    price: '',
    reservationPercentage: 0,
    financiation: false,
    coordinates: {
      lat: 0,
      lng: 0
    }
  }

  const onsubmit = handleSubmit( async (values,event) => {
    event.preventDefault()

    const newLot = {
      _id:lot?._id,
      number: values.number,
      block: values.block,
      area: values.area,
      price: values.price,
      reservationPercentage: 30,
      financiation: false,
      coordinates: {lat:values.coordinates.lat,lng:values.coordinates.lng}
    }
    if(editionForm){
      const response = await updateLot(newLot)
      if(response.status===200) {
        setText("SU LOTE HA SIDO EDITADO CORRECTAMENTE")
        setShowPopUp(true)
      }
    }else{
      const response = await createLot(newLot)
      if(response.status===200) {
        setText("SU LOTE HA SIDO CREADO CORRECTAMENTE")
        setShowPopUp(true)
      }
      reset(initialValues,{keepValues:false})
    }
  })

  useEffect(() => {
    //* Cuando se edita un lote, se setea el formulario con los valores del lote
    if(editionForm&&lot){
      reset(lot,{keepValues:false})
    }

    //* Cuando se cancela la edición de un lote, se resetea el formulario y se setea el estado de edición en false
    if(!editionForm){
      reset(initialValues,{keepValues:false})
    }
  },[editionForm,lot,register,reset])

  return (
    <section className="bg-admin-primary position-relative overflow-hidden m-0 text-admin-primary container-fluid row p-2 px-4 px-lg-0 justify-content-between">
        <CRUDNotification showPopUp={showPopUp} setShowPopUp={setShowPopUp} text={text}  />
        <form className="rounded-4 bg-admin-secondary-dark rounded col-12 col-lg-5 container-fluid d-flex flex-column flex-lg-row flex-wrap justify-content-center justify-content-lg-between align-items-center align-items-lg-start p-0 m-0" onSubmit={onsubmit}>
          <div className="col-11 col-lg-12 d-flex flex-wrap flex-lg-row px-4 justify-content-between align-items-center container-fluid justify-content-lg-between align-items-lg-stretch p-0 mb-xxl-4">
            <h3 className="col-12 fs-3 m-0 p-0 pt-4 px-lg-0">Datos principales</h3>
            {
              fields.map((field, index) => {
                return (
                  <div key={index} className={field.containerClass}>
                    <label className="form-label p-0 m-0 pb-3">{field.placeholder}</label>
                    <input
                      className={field.inputClass}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name, field.options)}
                    />
                    {errors[field.name] && (
                      <p className="text-danger col-12 text-center p-0">
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                )
              })
            }
          </div>
          <div className="location col-10 col-lg-6 pt-2 ps-lg-2 d-flex flex-wrap align-items-start">
            <h3 className="fs-3 w-100 form-title">Ubicación</h3>
            <div className="w-50 h-100 m-0 pe-2">
              <label>Latitud</label>
              <input className="form-control my-2" type="text" placeholder="latitud" defaultValue={0}
                {...register("coordinates.lat")}
              />
            </div>
            <div className="w-50 m-0 ps-2">
              <label>Longitud</label>
              <input className="form-control my-2" type="text" placeholder="longitud" defaultValue={0}
                {...register("coordinates.lng")}
              />
            </div>
          </div>
          {
            formErrors?.map((error, index) => {
              return (
                <p key={index} className="text-danger col-12 text-center p-0">
                  {error.msg}
                </p>
              )
            })
          }
          <div className='col-12 row justify-content-around my-4'>
            <button type='submit' className={`formButton btn btn-success bi bi-${editionForm?"house-up":"house-add-fill"} col-4 fs-4 p-xxl-0 m-0`}>{editionForm?" Editar":" Agregar"}</button>
            {
              editionForm ?
              (<div className='col-4 row justify-content-between'>
                <button onClick={()=>deleteLot(lot)} className="formButton bi bi-house-dash btn btn-danger col-12 fs-4 p-0 m-0 me-3"> Eliminar</button>
              </div>)
              : null
            }
          </div>

        </form>
        <Map setValue={setValue} getValues={getValues} adminMode={true}/>
    </section>
  )
}