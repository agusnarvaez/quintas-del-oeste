//* Importo HelmetData para agregar metadata dinámica
import HelmetData from '../components/HelmetData'
import {useState} from 'react'

//* Estilos de la página
import '../assets/styles/reservationForm.css'

//* Importo los componentes de la página
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import Button from '../components/Home/Sections/Contacto/Button'

//* Importo el contexto useLots para obtener los datos del lote
import { useLots } from '../context/LotsContext'

//* Configuración de carga de archivos de Firebase
import {uploadReservationFile} from '../services/firebase.config'

//* Importo useForm para manejar el formulario
import {useForm} from 'react-hook-form'

//* Importo el estado de los botones
import {buttonState} from '../utils/formUtils'

export default function ReservationForm({metaData}) {
  //* Hook para guardar el lote seleccionado
  const [documentFileName, setDocumentFileName] = useState('Ningún archivo seleccionado')
  const [idConfirmationFileName, setIdConfirmationFileName] = useState('Ningún archivo seleccionado')
  const [buttonClass,setButtonClass] = useState(buttonState.default)

  //* Context de lotes
  const { lot,setReservation,createPaymentOrder } = useLots()
  //* Hook de formulario de reserva de lote
  const {register,handleSubmit,formState:{errors},getValues} = useForm()

  const fields = [
    {
      name: "name",
      placeholder: "Nombre",
      type: "text",
      options: {
        required: "El nombre obligatorio",
      }
    },
    {
      name: "lastName",
      placeholder: "Apellido",
      type: "text",
      options: {
        required: "El apellido es obligatorio",
      }
    },
    {
      name: "dni",
      placeholder: "DNI",
      type: "number",
      options: {
        required: "El DNI es obligatorio",
        validate: {
          isPositive: (value) => {
            return value > 0 || "El DNI debe ser mayor que 0"
          }
        }
      }
    },
    {
      name: "dniConfirmation",
      placeholder: "Repetir DNI",
      type: "number",
      options: {
        required: "El DNI es obligatorio",
        validate: {
          isPositive: (value) => {
            return value > 0 || "El DNI debe ser mayor que 0"
          },
          matchesPreviousDni: (value) => {
            const { dni } = getValues()
            return dni === value || "Los DNI no coinciden"
          }
        }
      }
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
      options: {
        required: "El email es obligatorio",
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: "El email no es válido"
        }
      }
    },
    {
      name: "repeatEmail",
      placeholder: "Repetir Email",
      type: "email",
      options: {
        required: "El email es obligatorio",
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: "El email no es válido"
        },
        validate: {
          matchesPreviousEmail: (value) => {
            const { email } = getValues()
            return email === value || "Los emails no coinciden"
          }
        }
      }
    },
    {
      name: "phone",
      placeholder: "Teléfono",
      type: "text",
      options:{
        required: "El teléfono es obligatorio"
      }
    }
  ]

  const attachFields = [
    {
      name: "documentFile",
      placeholder: "Foto de DNI",
      type: "file",
      fileName: documentFileName,
      options:{
        required: "La foto de DNI es obligatoria",
        validate: {
          isImage: (value) => {
            return value[0].type.includes('image') || "El archivo debe ser una imagen"
          },
          isLessThan2MB: (value) => {
            return value[0].size < 2000000 || "El archivo debe pesar menos de 2MB"
          }
        }
      }
    },
    {
      name: "idConfirmationFile",
      placeholder: "Selfie CON DNI en mano",
      type: "file",
      fileName: idConfirmationFileName,
      options:{
        required: "La selfie con DNI es obligatoria",
        validate: {
          isImage: (value) => {
            return value[0].type.includes('image') || "El archivo debe ser una imagen"
          },
          isLessThan2MB: (value) => {
            return value[0].size < 2000000 || "El archivo debe pesar menos de 2MB"
          }
        }
      }
    }
  ]

  const handleDocumentFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if(event.target.name==="documentFile"){
      if (selectedFile) {
        setDocumentFileName(selectedFile.name)
      } else {
        setDocumentFileName('Ningún archivo seleccionado')
      }
    }else{
      if (selectedFile) {
        setIdConfirmationFileName(selectedFile.name)
      }else{
        setIdConfirmationFileName('Ningún archivo seleccionado')
      }
    }
  }

  const onsubmit = handleSubmit(async (data) => {
    setButtonClass(buttonState.loading)
    try{
      const documentFileUrl = await uploadReservationFile(data.documentFile[0],'documentFile',data.dni)
      const idConfirmationFileUrl = await uploadReservationFile(data.idConfirmationFile[0],'idConfirmationFile',data.dni)
      const reservation = {
        lot:{
          _id: lot.id,
          number: lot.number,
          block: lot.block,
          reservationPrice: 12345,
        },
        user:{
          name: data.name,
          lastName: data.lastName,
          email: data.email,
        },
        dni: data.dni,
        phone: data.phone,
        documentFile: documentFileUrl,
        idConfirmationFile: idConfirmationFileUrl
      }
      setReservation(reservation)

      const response = await createPaymentOrder(reservation)

      const initPoint = response.data.initPoint

      window.open(initPoint)

    }catch(error){
      console.log(error)
      alert('Ocurrió un error al generar el pago, inténtelo mas tarde nuevamente y comuníquese con el propietario de la página.')
    }
  })

  return (
    <>
      <Header />
      <main className="container-fluid p-0 px-3 my-3">
        <HelmetData metaData={metaData} />
        <h1>Reservar Lote</h1>
        <div className='col-12 col-lg-6'>
          <h2> Datos de lote</h2>
          <ul className='list-group list-group-flush list-unstyled'>
            <li className='list-group-item'><b>N° de lote:</b>{lot.number} </li>
            <li className='list-group-item'><b>N° de Manzana:</b>{lot.block} </li>
            <li className='list-group-item'><b>Precio:</b> USD {lot.price} </li>
            <li className='list-group-item'><b>Área:</b> {lot.area}m2 </li>
            <li className='list-group-item'><b>Precio de reserva:</b> USD {(lot.price * lot.reservationPercentage) / 100} </li>
            {lot.financiation ? <li className='list-group-item text-quintas-green fw-bold'>Con financiación</li> : <li className='list-group-item text-danger'>Sin financiación</li>}
          </ul>
        </div>
        <form onSubmit={onsubmit} className='col-12 col-lg-6'>
          <h2 className='mb-3'> Datos del comprador</h2>
          {
            fields.map((field, index) => {
              return (
                <div key={index} className='col-12 col-lg-6 m-0 my-2 col-xxl-2 m-xxl-0 p-xxl-0 row flex-column align-items-center'>
                  <label htmlFor={field.name} className="form-label">{field.placeholder}</label>
                  <input
                    type={field.type}
                    className='form-control rounded-0 col-12 p-2'
                    id={field.name}
                    {...register(field.name, field.options)}
                  />
                  {errors[field.name] && <div className="alert alert-danger mt-2">{errors[field.name].message}</div>}
                </div>
              )
            })
          }

          {
            attachFields.map((field, index) => {
              return(
              <div className='col-12 px- my-3' key={index}>
                <label htmlFor={field.name} className='col-12'>
                    {field.placeholder}
                </label>
                <label htmlFor={field.name} className="custom-file-upload me-3">
                  <i className="fa fa-cloud-upload"></i> Seleccionar archivo
                </label>
                <input
                  id={field.name}
                  type="file"
                  style={{ display: 'none' }}
                  className='file-upload'
                  {...register(field.name, field.options)}
                  onChange={(e)=>{
                    handleDocumentFileChange(e)
                    register(field.name, field.options).onChange(e)
                  }}
                />
                <span id="file-name">{field.fileName}</span>
                {errors[field.name] && <div className="alert alert-danger mt-2">{errors[field.name].message}</div>}
            </div>)
            })
          }
          <Button buttonClass={buttonClass} setButtonClass={setButtonClass} text='Ir a firma de contrato' />
        </form>
      </main>
      <Footer />
    </>
  )
}