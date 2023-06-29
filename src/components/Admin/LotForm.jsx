import '../../assets/styles/lotForm.css'
import MapView from "../Map/MapEditor"
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useLots}from '../../context/LotsContext'

export default function LotForm() {
  const {register,handleSubmit,formState:{errors},watch,getValues,setValue} = useForm()
  const reservationPercentageValue = watch("reservationPercentage", 0)

  const perimeter = {
    x1: watch("x1", 0),
    x2: watch("x2", 0),
    y1: watch("y1", 0),
    y2: watch("y2", 0)
  }
  const {createLot,formErrors} = useLots()

  const onsubmit = handleSubmit( async (values,event) => {
    event.preventDefault()
    //* Llamo a la función signUp del contexto de autenticación

    const newLot = {
      number: values.number,
      area: values.area,
      price: values.price,
      reservationPercentage: values.reservationPercentage,
      financiation: values.financiation,
      coordinates: {lat:values.lat,lng:values.lng},
      perimeter:{
        x1:{
          lat:values.x1Lat,
          lng:values.x1Lng
        },
        x2:{
          lat:values.x2Lat,
          lng:values.x2Lng
        },
        y1:{
          lat:values.y1Lat,
          lng:values.y1Lng
        },
        y2:{
          lat:values.y2Lat,
          lng:values.y2Lng
        }
      }
    }
    createLot(newLot)
  })

  const onchange = (field) => {
    console.log(watch(field,0))
  }

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
              {...register("lat")}
            />
            <input className="form-control my-2" type="text" placeholder="longitud" defaultValue={0}
              {...register("lng")}
            />
          </div>
          <div className="form-row col-6 px-3 justify-content-between">
            <h3>Perímetro</h3>
            <input className="form-control my-2" type="text" placeholder="x1" defaultValue={0} {...register("x1Lat")} />
            <input className="form-control my-2" type="text" placeholder="x2" defaultValue={0} {...register("x1Lng")}/>
            <input className="form-control my-2" type="text" placeholder="x2" defaultValue={0} {...register("x2Lat")}/>
            <input className="form-control my-2" type="text" placeholder="x2" defaultValue={0} {...register("x2Lng")}/>
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("y1Lat")} />
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("y1Lng")} />
            <input className="form-control my-2" type="text" placeholder="y1" defaultValue={0} {...register("y2Lat")} />
            <input className="form-control my-2" type="text" placeholder="y2" defaultValue={0} {...register("y2Lng")}/>
          </div>
          {
            formErrors?.map((error, index) => {
              console.log(error)
              return (
                <p key={index} className="text-danger col-12 text-center p-0">
                  {error.msg}
                </p>
              )
            })
          }
          <button type='submit' className="btn btn-success col-6 fs-3 p-0 m-0">Agregar Lote</button>
        </form>
        <MapView setValue={setValue} getValues={getValues}/>
    </section>
  )
}