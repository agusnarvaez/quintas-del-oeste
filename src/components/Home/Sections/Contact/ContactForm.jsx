
import {useRef,useState} from "react"
import { fieldsList,frmContact } from "../../../../services/contact"

import credentials from "../../../../credentials"

//* API de Emails
import emailjs from 'emailjs-com'

import ContactInputs from "./ContactInputs"
import Button from "./Button"
import { buttonState } from "../../../../utils/formUtils"
export default function ContactForm() {
  //* Hook de mail a enviar
  const [contact, setContact] = useState(frmContact)

  const [buttonClass,setButtonClass] = useState(buttonState.default)

  const fields = useRef(fieldsList)

  //* Función que detecta el evento de presionar el botón ENVIAR
  const handleSubmit = (e) => {
      //* Prevengo que refresque la página
      e.preventDefault()

      if(fields.current.some(field=>field.isValid===false)){

          if(fields.current[fields.current.length-1].isValid===false){
              fields.current[fields.current.length-1].showErrors=true
          }else{
              fields.current[fields.current.length-1].showErrors=false
          }
          alert("Por favor revise los campos!")

      }else{
          //* Si está todo ok, muestro el símbolo de carga
          setButtonClass(buttonState.loading)

          //* Si están ok, ejecuta el método de emailJs
          emailjs.send(
              credentials.emailJs.service, //* ID de servicio de mail de la API
              credentials.emailJs.template, //* ID de la plantilla de Mail
              contact,
              credentials.emailJs.id //* ID de usuario de la API
              )
                  .then((response) => {
                      console.log('SUCCESS!', response.status, response.text)
                      setContact(frmContact)
                      setButtonClass(buttonState.success)
                  },

                  //* Capturo el error al enviar el mensaje
                  (err) => {
                      console.log('ERROR:\n', err)
                      setButtonClass(buttonState.error)
                  })
      }
  }

  return (
      <section className="container-fluid my-4 my-lg-0 col-md-8 col-lg-12 contactForm ">
          <h3 className="container-fluid text-center fs-4 fw-normal text-black">¿QUERÉS SABER MÁS? <br/>COORDINÁ UNA REUNIÓN</h3>
          <form className="container-fluid p-0 px-4 d-flex align-items-center justify-content-center flex-column flex-nowrap" onSubmit={handleSubmit}>

              <ContactInputs fields={fields.current} contact={contact} setContact={setContact} />

              <Button buttonClass={buttonClass} setButtonClass={setButtonClass} text='ENVIAR MENSAJE' />

          </form >

      </section>
  )
}