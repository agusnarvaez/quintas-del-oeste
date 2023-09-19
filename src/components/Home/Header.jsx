import { useState } from 'react'
import logoQuintas from '../../assets/logos/logoQuintas.png'
import { Link } from 'react-router-dom'

//* Para hacer scroll suave
import Scroll from 'react-scroll'

export default function Header() {
  const [burgerMenu, setBurgerMenu] = useState(false)
  const isHomePage = window.location.pathname === '/'
  var scroller = Scroll.scroller

  const scrollToSection = sectionId => {
    setBurgerMenu(false) // Cierra el menú al hacer clic en un enlace
    console.log('En scrollToSection')
    setTimeout(() => {
      scroller.scrollTo(sectionId, {
        offset: -100, // Ajusta esto según el diseño de tu encabezado fijo
      })
    }, 100)
  }
  var liClass = 'nav-item py-2'
  var linkClass = 'nav-link text-dark fs-4 l-p-3'
  var navClass = 'navbar col-12 col-md-8 d-flex justify-content-between ps-md-4 ps-lg-6'+(burgerMenu?' show':'')
  var burgerMenuIconClass = 'bi bi-list text-center d-sm-block d-md-none z-index-150 col-1 p-0'
  var crossIconClass = 'bi bi-x-lg text-center d-sm-block d-md-none z-index-150 col-1 p-0'
  return (
    <header className="container-fluid row justify-content-between fixed-top bg-white p-3 m-0" id="header">
        <img className="img-fluid col-6 col-md-4 col-xl-2 p-md-4" src={logoQuintas} alt='logoQuintas' />
        <i  className={burgerMenu?crossIconClass:burgerMenuIconClass} onClick={() => setBurgerMenu(!burgerMenu)}></i>
      <nav className={navClass} id="navBar">
        <ul className='bg-white nav nav-underline container-fluid justify-content-between flex-column flex-md-row md-col-12 ps-md-4 ps-lg-6' id="navUl">
          <li className={liClass}><Link className={linkClass} to={'/'} onClick={() => scrollToSection('home')}>INICIO</Link></li>
          <li className={liClass}><Link className={linkClass} to={'/'} onClick={() => scrollToSection('neighborhood')}>EL BARRIO</Link></li>
          <li className={liClass}><Link className={linkClass} to={"/"} onClick={() => scrollToSection('masterPlan')}>MASTER PLAN</Link></li>
          <li className={liClass}><Link className={linkClass} to={"/"} onClick={() => scrollToSection('location')}>UBICACIÓN</Link></li>
          <li className={liClass}><Link className={linkClass} to={"/"}>CONTACTO</Link></li>
        </ul>
      </nav>
    </header>
  )
}