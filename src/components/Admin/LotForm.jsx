
import Map from "../Map/Map"
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useLots}from '../../context/LotsContext'

export default function LotForm({editionForm,setEditionForm}) {
  const {register,handleSubmit,formState:{errors},getValues,setValue,reset} = useForm()
  /* const reservationPercentageValue = watch("reservationPercentage", 0) */
  const {lot,setLot,createLot,updateLot,deleteLot,formErrors} = useLots()
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
    },
    /* {
      name: "reservationPercentage",
      placeholder: `Porcentaje de reserva ${reservationPercentageValue}%`,
      type: "range",
      containerClass: "col-6 col-lg-6 py-2  col-xxl-3 p-xxl-0 row flex-column justify-content-center align-items-center",
      inputClass: "col-10 p-0 form-range w-100",
        options: { required: "Campo obligatorio",
        validate: (value) => value >= 10 || "Debe ser mayor o igual a 10"
      }
    },
    {
      name: "financiation",
      placeholder: "Financiación",
      type: "checkbox",
      containerClass: "col-6 col-lg-6 form-check d-flex p-0 ps-4 p-xxl-0 m-0 align-items-start justify-content-between col-6 col-xxl-2",
      inputClass: "form-check-input",
      options: { }
    } */
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
      block: values.block,
      area: values.area,
      price: values.price,
      /* reservationPercentage: values.reservationPercentage, */
      reservationPercentage: 30,
      /* financiation: values.financiation, */
      financiation: false,
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
    if(!editionForm){
      reset(initialValues,{keepValues:false})
      setLot({})
    }

  },[editionForm,register,reset,lot])

  return (
    <section className="bg-admin-primary overflow-hidden m-0 text-admin-primary container-fluid row p-2 px-4 px-lg-0 justify-content-between">
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
          {/* <div className="row col-10 col-lg-6 pt-2 pe-lg-4 justify-content-between perimeter">
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
          </div> */}
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