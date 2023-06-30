import { useAuth } from '../../context/AuthContext'
import quintasLogo from '../../assets/logos/logoQuintasFooter.png'
export default function Header({user}) {

  const {signOut} = useAuth()

  const handleLogout = () => {
    signOut()
  }

  return (
    <header className="col-12 m-0 p-4 sticky-top row align-items-center justify-content-between bg-dark">
        <img src={quintasLogo} alt="Logo Quintas" className="col-2 m-0 p-0" />
        <h1 className="col-3 m-0 p-0 text-center text-white fs-2"><i className='bi bi-gear'/> Panel de control</h1>
        {user?
          <div className='col-5 col-xxl-6 m-0 p-0 row justify-content-center'>
            <h2 className="col-12 m-0 px-xxl-5 text-white fs-3"><i className='bi bi-person'/> Usuario: {user.name}</h2>
            <h2 className="col-12 m-0 px-xxl-5 text-white fs-3"><i className='bi bi-envelope'/> Mail: {user.email}</h2>
          </div>
        :null}

        <button onClick={handleLogout} className="col-2 col-xxl-1 d-flex align-items-center justify-content-center m-0 text-center tex-twhite btn btn-danger"><i className='bi bi-person-down pe-2'/>  Cerrar sesión</button>
    </header>
  )
}