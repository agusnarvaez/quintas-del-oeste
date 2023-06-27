import { useState } from 'react'
import logoQuintas from '../../assets/logos/logoQuintas.png'

export default function Header() {
  const [burgerMenu, setBurgerMenu] = useState(false)

  var liClass = 'nav-item py-2'
  var linkClass = 'nav-link text-dark fs-4 l-p-3'
  var navClass = 'navbar col-12 col-md-8 d-flex justify-content-between ps-md-4 ps-lg-6'+(burgerMenu?' show':'')
  var burgerMenuIconClass = 'bi bi-list text-center d-sm-block d-md-none z-index-150 col-1 p-0'
  var crossIconClass = 'bi bi-x-lg text-center d-sm-block d-md-none z-index-150 col-1 p-0'
  return (
    <header className="container-fluid row justify-content-between sticky-top bg-white p-3 m-0" id="header">
        <img className="img-fluid col-6 col-md-4 col-xl-2 p-md-4" src={logoQuintas} alt='logoQuintas' />
        <i  className={burgerMenu?crossIconClass:burgerMenuIconClass} onClick={() => setBurgerMenu(!burgerMenu)}></i>
      <nav className={navClass} id="navBar">
        <ul className='bg-white nav nav-underline container-fluid justify-content-between flex-column flex-md-row md-col-12 ps-md-4 ps-lg-6' id="navUl">
          <li className={liClass}><a className={linkClass} href="#home">INICIO</a></li>
          <li className={liClass}><a className={linkClass} href="#neighborhood">EL BARRIO</a></li>
          <li className={liClass}><a className={linkClass} href="#masterPlan">MASTER PLAN</a></li>
          <li className={liClass}><a className={linkClass} href="#location">UBICACION</a></li>
          <li className={liClass}><a className={linkClass} href="#contact">CONTACTO</a></li>
        </ul>
      </nav>
    </header>
  )
}