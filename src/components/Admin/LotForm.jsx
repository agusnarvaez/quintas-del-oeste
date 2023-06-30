import '../../assets/styles/lotForm.css'
import MapView from "../Map/MapEditor"
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useLots}from '../../context/LotsContext'

export default function LotForm({editionForm,setEditionForm}) {
  const {register,handleSubmit,formState:{errors},watch,getValues,setValue,reset} = useForm()
  const reservationPercentageValue = watch("reservationPercentage", 0)
  const {lot,setLot,createLot,updateLot,formErrors} = useLots()
  const fields = [
    {
      name: "number",
      placeholder: "Número de lote",
      type: "number",
      containerClass: "col-2 p-0 row flex-column",
      inputClass: "form-control col-2",
      options: { required: "Campo obligatorio", min: 1 }
    },
    {
      name: "area",
      placeholder: "Área",
      type: "number",
      containerClass: "col-2 p-0 row flex-column",
      inputClass: "form-control col-2",
      options: {
        required: "Campo obligatorio",
        validate: (value) => value >= 100 || "El valor debe ser mayor a 100"
      }
    },
    {
      name: "price",
      placeholder: "Precio",
      type: "number",
      containerClass: "col-2 p-0 row flex-column",
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
      containerClass: "col-3 p-0 row flex-column",
      inputClass: "col-10 p-0 form-range w-100",
        options: { required: "Campo obligatorio",
        validate: (value) => value >= 10 || "Debe ser mayor o igual a 10"
      }
    },
    {
      name: "financiation",
      placeholder: "Financiación",
      type: "checkbox",
      containerClass: "form-check col-2 flex-column",
      inputClass: "form-check-input",
      options: { }
    }
  ]

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
    setEditionForm(false)
    setLot({})
    reset()
  }

  useEffect(() => {
    if(editionForm&&lot){
      reset(lot)
    }else{
      reset()
    }
  },[editionForm,register,lot])

  return (
    <section className="bg-dark-subtle container-fluid row p-2 justify-content-between">
        <form className="col-6 container-fluid row justify-content-center p-0 px-2" onSubmit={onsubmit}>
          <div className="form-group col-12  container-fluid row justify-content-between p-0 px-3">
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
          <div className="form-row col-6 px-3 justify-content-between">
            <h3>Ubicación</h3>
            <input className="form-control my-2" type="text" placeholder="latitud" defaultValue={0}
              {...register("coordinates.lat")}
            />
            <input className="form-control my-2" type="text" placeholder="longitud" defaultValue={0}
              {...register("coordinates.lng")}
            />
          </div>
          <div className="form-row col-6 px-3 justify-content-between">
            <h3>Perímetro</h3>
            <input className="form-control my-2" type="text" placeholder="x1" defaultValue={0} {...register("perimeter.x1.lat")}  />
            <input className="form-control my-2" type="text" placeholder="x1" defaultValue={0} {...register("perimeter.x1.lng")}  />
            <input className="form-control my-2" type="text" placeholder="x2" defaultValue={0} {...register("perimeter.x2.lat")}  />
            <input className="form-control my-2" type="text" placeholder="x2" defaultValue={0} {...register("perimeter.x2.lng")}  />
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y1.lat")}  />
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y1.lng")}  />
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("perimeter.y2.lat")}  />
            <input className="form-control my-2" type="text" placeholder="y2" defaultValue={0} {...register("perimeter.y2.lng")}  />
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
              <button className="btn btn-danger col-5 fs-3 p-0 m-0">Eliminar</button>
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