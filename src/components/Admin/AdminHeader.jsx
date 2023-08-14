import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import quintasLogo from '../../assets/logos/logoQuintasFooter.png'
import {useState} from "react"
export default function Header() {

  const {signOut,isAuthenticated,user} = useAuth()
  const [show,setShow] = useState(false)

  const handleLogout = () => {
    signOut()
  }

  return (
    <header className="admin-header w-100 m-0 p-3  d-flex flex-nowrap sticky-top align-items-center justify-content-between bg-admin-primary">
        <img src={quintasLogo} alt="Logo Quintas" className="logo-admin text-admin-primary m-0 p-0" />
        {isAuthenticated?
          <>
            <div onClick={()=>setShow(!show)} className='m-0 icon-admin-secondary-dark d-flex align-items-center justify-content-end '>
              <i className={show?'bi bi-gear-fill m-0 text-admin-primary admin-header-icon icon-admin-primary-dark hover-dark':'bi bi-gear-fill m-0 text-admin-primary hover-dark admin-header-icon rotate-90 icon-admin-primary-dark'}/>
            </div>

            <aside className={show?'padding-2 admin-nav d-flex bg-admin-primary flex-column':'admin-nav bg-admin-primary admin-nav--hidden d-flex flex-column'}>
              {user?<div className=' admin-profile bg-admin-secondary-grey w-100 m-0 p-0 mb-3 row justify-content-center'>
                <NavLink className='admin-nav_button rounded-bottom-15px rounded-top-15px bg-admin-nav-primary border-bottom text-decoration-none' to='/admin/profile' ><h2 className="col-11 p-0 d-flex align-items-center m-0 text-admin-primary fs-3 "><i className='bi bi-person-circle me-2'/> {user.name} {user.lastName}</h2></NavLink>
                <h2 className="padding-3 rounded-bottom-15px rounded-top-15px col-12 d-flex align-items-center m-0 text-admin-primary fs-3"><i className='bi bi-envelope me-2'/> {user.email}</h2>
              </div>:null}
              <ul className='padding-2 admin-nav-links m-0 list-unstyled  text-admin-primary bg-admin-secondary-grey d-flex flex-nowrap align-items-center'>
                {/* <li className='w-100 py-3'><h2 className="w-100 m-0 text-admin-primary bi bi-pie-chart-fill p-0 fs-4"> Dashboard</h2></li> */}
                <li className='admin-nav_button rounded-top-15px rounded-bottom-15px w-100 py-3'><h2 className="w-100 m-0 text-admin-primary cursor-pointer bi bi-house-gear-fill p-0 fs-4"> Lotes</h2></li>
                {/* <li className='w-100 py-3'><h2 className="w-100 m-0 text-admin-primary bi bi-house-check-fill p-0 fs-4"> Clientes</h2></li> */}
                <li className='admin-nav_button  rounded-top-15px rounded-bottom-15px w-100 py-3'><NavLink className='text-decoration-none' to='/admin/users' ><h2 className="w-100 m-0 text-admin-primary cursor-pointer bi bi-people-fill p-0 fs-4"> Usuarios</h2></NavLink></li>
                <li onClick={handleLogout} className='admin-nav_button admin-nav_button--danger rounded-bottom-15px rounded-top-15px w-100 py-3'><h2 className="w-100 m-0 cursor-pointer text-admin-primary bi bi-person-fill-down text-danger p-0 fs-5"> Cerrar sesión</h2></li>
              </ul>
            </aside>
          </>
        :null}
    </header>
  )
}