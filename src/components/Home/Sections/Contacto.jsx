import bgContact from "../../../assets/background/bg-contact.jpg"
import ContactForm from "./Contacto/ContactForm"
export default function Contacto() {
  return (
    <div className="container-fluid p-0  flex-nowrap mb-5" id="contact">

      <div className="container-fluid p-0 d-flex align-items-center justify-content-center position-relative vh-75">
        <div className="image-container background-image p-0 h-100">
          <img className="img-fluid h-100"src={bgContact} alt="Contact Background"/>
        </div>
        <h2 className="text-white fs-3 text-center px-5">TU LOTE ESTÁ <br/>EN GENERAL RODRIGUEZ <br/>DESCUBRÍ QUINTAS</h2>
      </div>

      <ul className="container-fluid d-flex flex-column row mx-0 my-3">
        <li className="container col-6 d-flex justify-content-center align-items-center bg-quintas-green p-2 my-2"><a className="text-white text-decoration-none" href="google.com">AGENDÁ TU VISITA</a></li>
        <li className="container col-6 d-flex justify-content-center align-items-center bg-quintas-green p-2 my-2"><a className="text-white text-decoration-none" href="google.com">VER FOLLETO</a></li>
        <li className="container col-6 d-flex justify-content-center align-items-center bg-quintas-green p-2 my-2"><a className="text-white text-decoration-none" href="google.com">QUIERO QUE ME LLAMEN</a></li>
      </ul>

      <div className="container-fluid px-5">
        <h2 className="fs-3 text-quintas-green">NATURALEZA, UBICACIÓN Y COMODIDAD</h2>
        <p className="fs-5 m-0">Se parte de un proyecto nuevo, un barrio cerrado de 55 hectáreas con 1000 lotes de 300 m<sup>2</sup> a 500 m<sup>2</sup>.</p>
        <p className="fs-5 fw-bold m-0">Bajas expensas, con esctrituración inmediata y seguridad.</p>
      </div>

      <ContactForm/>
    </div>
  )
}