import logoFooter from "../../assets/logos/logoQuintasFooter.png"
import logoDIBA from "../../assets/logos/logoDIBAFooter.png"
import credentials from "../../credentials"

export default function Footer() {
  return (
    <footer className="container-fluid m-0 row bg-quintas-dark-gray d-flex justify-content-around py-5">

        <div className="container-fluid col-6 col-lg-3 d-flex align-items-center justify-content-end justify-content-lg-center border-end border-end-lg-0 ps-0 pe-4">
          <img className="img-fluid col-10" src={logoFooter} alt="logoFooter"/>
        </div>

        <div className="container-fluid col-6 col-lg-3 d-flex flex-column justify-content-center align-items-lg-center border-start border-start-lg-0 ps-4 pe-0 order-lg-3">
          <p className="text-start text-white col-6 m-0 fs-4">Desarrolla</p>
          <div className="container-fluid col-6 d-flex align-items-center justify-content-center m-0 p-0">
            <img className="img-fluid col-12" src={logoDIBA} alt="logoDIBA"/>
          </div>
        </div>

        <ul className="container-fluid row col-8 col-md-5 col-lg-6 mt-5 m-lg-0 p-0 d-flex flex-column justify-content-center align-items-center list-unstyled order-lg-2">
          <li className="col-12 col-lg-8 my-1 p-0"><a className="text-white text-decoration-none fs-3" href={credentials.whatsappApi}><i className="bi bi-whatsapp me-4 fs-3"/>11 5952 1694</a></li>
          <li className="col-12 col-lg-8 my-1 p-0"><a className="text-white text-decoration-none fs-3" href="mailto:consultas@diba.com.ar"><i className="bi bi-envelope me-4  fs-3"/>consultas@diba.com.ar</a></li>
          <li className="col-12 col-lg-8 my-1 p-0"><a className="text-white text-decoration-none fs-3" href="www.instagram.com/metrofuturo/"><i className="bi bi-instagram me-4 fs-3"/>barrioquintas</a></li>
        </ul>

    </footer>
  )
}