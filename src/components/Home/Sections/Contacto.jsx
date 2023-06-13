import bgContact from "../../../assets/background/bg-contact.jpg"
import ContactForm from "./Contacto/ContactForm/ContactForm"
import LinksInfo from "./Contacto/LinksInfo"
export default function Contacto() {
  return (
    <div className="container-fluid p-0  flex-nowrap mb-3" id="contact">

      <div className="container-fluid banner-container p-0 d-flex align-items-center justify-content-center position-relative py-lg-4 flex-wrap w-100">

        {/* <div className="image-container background-image p-0 h-100 vw-100"> */}
        <img className="img-fluid background-image"src={bgContact} alt="Contact Background"/>
        {/* </div> */}

        <h2 className="text-white fs-3 text-center px-5 col-lg-6">TU LOTE ESTÁ <br/>EN GENERAL RODRIGUEZ <br/>DESCUBRÍ QUINTAS</h2>

        <div className="d-none d-lg-block contactForm bg-white py-lg-3 col-lg-5 " >
          <ContactForm/>
        </div>
        <div className="d-none d-lg-flex justify-content-center m-lg-0 py-lg-3 col-lg-12 z-index-150" >
          <LinksInfo />
        </div>
      </div>
      <div className="d-lg-none z-index-150">
        <LinksInfo/>
      </div>

      <div className="container-fluid px-5 col-lg-8 my-lg-3">
        <h2 className="fs-3 text-quintas-green mb-lg-3">NATURALEZA, UBICACIÓN Y COMODIDAD</h2>
        <p className="fs-5 m-0">Se parte de un proyecto nuevo, un barrio cerrado de 55 hectáreas con 1000 lotes de 300 m<sup>2</sup> a 500 m<sup>2</sup>.</p>
        <p className="fs-5 fw-bold m-0">Bajas expensas, con esctrituración inmediata y seguridad.</p>
      </div>

      <div className="d-lg-none">
        <ContactForm/>
      </div>
    </div>
  )
}