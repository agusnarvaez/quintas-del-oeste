import '../../assets/styles/lotForm.css'
import MapView from "../Map/MapEditor"
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useLots}from '../../context/LotsContext'

export default function LotForm({editionForm,setEditionForm}) {
  const {register,handleSubmit,formState:{errors},watch,getValues,setValue,reset} = useForm()
  const reservationPercentageValue = watch("reservationPercentage", 0)
  const {lot,setLot,createLot,updateLot,deleteLot,formErrors} = useLots()
  const fields = [
    {
      name: "number",
      placeholder: "Número de lote",
      type: "number",
      containerClass: "col-6 pe-5 ps-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control",
      options: { required: "Campo obligatorio", min: 1 }
    },
    {
      name: "area",
      placeholder: "Área",
      type: "number",
      containerClass: "col-6 ps-5 pe-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control",
      options: {
        required: "Campo obligatorio",
        validate: (value) => value >= 100 || "El valor debe ser mayor a 100"
      }
    },
    {
      name: "price",
      placeholder: "Precio",
      type: "number",
      containerClass: "col-6 pe-5 ps-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center",
      inputClass: "form-control col-2",
      options: {
        required: "Campo obligatorio",
        validate: (value) => value >= 10000 || "El valor debe ser mayor a 10000"
      }
    },
    {
      name: "reservationPercentage",
      placeholder: `Porcentaje de reserva ${reservationPercentageValue}%`,
      type: "range",
      containerClass: "col-6 ps-5 pe-2 col-xxl-3 p-xxl-0 row flex-column justify-content-center align-items-center",
      inputClass: "col-10 p-0 form-range w-100",
        options: { required: "Campo obligatorio",
        validate: (value) => value >= 10 || "Debe ser mayor o igual a 10"
      }
    },
    {
      name: "financiation",
      placeholder: "Financiación",
      type: "checkbox",
      containerClass: "form-check d-xxl-flex ps-4 py-2 p-xxl-0 m-0 align-items-center justify-content-center col-6 col-xxl-2 flex-column",
      inputClass: "form-check-input",
      options: { }
    }
  ]
  const initialValues ={
    number: 0,
    area: '',
    price: '',
    reservationPercentage: 0,
    financiation: false,
    coordinates: {
      lat: 0,
      lng: 0
    },
    perimeter: {
      x1: { lat: 0, lng: 0 },
      x2: { lat: 0, lng: 0 },
      y1: { lat: 0, lng: 0 },
      y2: { lat: 0, lng: 0 }
    }
  }

  const onsubmit = handleSubmit( async (values,event) => {
    event.preventDefault()

    const newLot = {
      _id:lot?._id,
      number: values.number,
      area: values.area,
      price: values.price,
      reservationPercentage: values.reservationPercentage,
      financiation: values.financiation,
      coordinates: {lat:values.coordinates.lat,lng:values.coordinates.lng},
      perimeter:{
        x1:{
          lat:values.perimeter.x1.lat,
          lng:values.perimeter.x1.lng
        },
        x2:{
          lat:values.perimeter.x2.lat,
          lng:values.perimeter.x2.lng
        },
        y1:{
          lat:values.perimeter.y1.lat,
          lng:values.perimeter.y1.lng
        },
        y2:{
          lat:values.perimeter.y2.lat,
          lng:values.perimeter.y2.lng
        }
      }
    }
    if(editionForm){
      await updateLot(newLot)
    }else{
      createLot(newLot)
    }
  })

  const discardChanges = ()=>{
    reset(initialValues,{ keepValues: false })
    setEditionForm(false)
    setLot({})
  }

  useEffect(() => {
    if(editionForm&&lot){
      reset(lot,{keepValues:false})
    }
  },[editionForm,register,lot,reset,setLot])

  return (
    <section className="bg-dark-subtle container-fluid row p-2 justify-content-between">
        <form className="col-6 container-fluid row justify-content-center p-0 px-2" onSubmit={onsubmit}>
          <div className="col-12 row container-fluid justify-content-between align-items-stretch p-0 px-3 mb-xxl-4">
            <h3 className="col-12 fs-3 m-0 p-0">Datos principales</h3>

            {
              fields.map((field, index) => {
                return (
                  <div key={index} className={field.containerClass}>
                    <label className="form-label m-0">{field.placeholder}</label>
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
          <div className="location w-50 d-flex flex-wrap align-items-start">
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
          <div className="row col-6 px-3 justify-content-between perimeter">
            <h3 className='fs-3 w-100 form-title'>Perímetro</h3>
            <div className='d-flex w-50 p-0 pe-1 flex-wrap justify-content-between'>
              <label className='w-100 m-0  text-center'>x1</label>
              <input className="form-control coordinateInput my-2" type="text" placeholder="x1" defaultValue={0} {...register("perimeter.x1.lat")}  />
              <input className="form-control coordinateInput my-2" type="text" placeholder="x1" defaultValue={0} {...register("perimeter.x1.lng")}  />
            </div>
            <div className='d-flex w-50 p-0 ps-1 flex-wrap justify-content-between'>
              <label className='w-100 m-0  text-center'>x2</label>
              <input className="form-control coordinateInput my-2" type="text" placeholder="x2" defaultValue={0} {...register("perimeter.x2.lat")}  />
              <input className="form-control coordinateInput my-2" type="text" placeholder="x2" defaultValue={0} {...register("perimeter.x2.lng")}  />
            </div>
            <div className='d-flex w-50 p-0 pe-1 flex-wrap justify-content-between'>
              <label className='w-100 m-0 text-center'>y1</label>
              <input className="form-control coordinateInput my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y1.lat")}  />
              <input className="form-control coordinateInput my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y1.lng")}  />
            </div>
            <div className='d-flex w-50 p-0 ps-1 flex-wrap justify-content-between'>
              <label className='w-100 m-0 text-center'>y2</label>
              <input className="form-control coordinateInput my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y2.lat")}  />
              <input className="form-control coordinateInput my-2" type="text" placeholder="y2" defaultValue={0} {...register("perimeter.y2.lng")}  />
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
          <div className='col-12 row justify-content-between'>
          <button type='submit' className="btn btn-success col-3 fs-3 p-0 m-0">{editionForm?"Editar":"Agregar"} Lote</button>
          {
            editionForm ?
            (<div className='col-6 row justify-content-between'>
              <button onClick={()=>deleteLot(lot)} className="btn btn-danger col-5 fs-3 p-0 m-0">Eliminar</button>
              <button onClick={discardChanges} type="reset" className="btn btn-secondary col-5 fs-3 p-0 m-0" >Descartar</button>
            </div>)
            : null
          }
          </div>

        </form>
        <MapView setValue={setValue} getValues={getValues}/>
    </section>
  )
}