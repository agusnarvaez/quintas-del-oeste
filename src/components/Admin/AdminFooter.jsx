import logoFooter from '../../assets/logos/logoQuintasFooter.png'
import logoDIBA from '../../assets/logos/logoDIBAFooter.png'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="container-fluid m-0 row bg-quintas-dark-gray d-flex justify-content-around py-5">

        <Link to='/' className="container-fluid col-6 col-lg-3 d-flex align-items-center justify-content-end justify-content-lg-center border-end border-end-lg-0 ps-0 pe-4">
          <img className="img-fluid col-10" src={logoFooter} alt="logoFooter"/>
        </Link>

        <div className="container-fluid col-6 col-lg-3 d-flex flex-column justify-content-center align-items-lg-center border-start border-start-lg-0 ps-4 pe-0 order-lg-3">
          <p className="text-start text-white col-6 m-0 fs-4">Desarrolla</p>
          <div className="container-fluid col-6 d-flex align-items-center justify-content-center m-0 p-0">
            <img className="img-fluid col-12" src={logoDIBA} alt="logoDIBA"/>
          </div>
        </div>
    </footer>
  )
}