import { useAuth } from '../../context/AuthContext'

export default function Header({user}) {

  const {signOut} = useAuth()

  const handleLogout = () => {
    signOut()
  }

  return (
    <header className="col-12 m-0 p-4 sticky-top row align-items-center justify-content-between bg-dark">
        <h1 className="col-3 m-0 p-0 text-center text-white">Panel Adminstrador</h1>
        {user?<h2 className="col-4 m-0 p-0 text-center text-white">Usuario: {user.name}</h2>:null}
        {user?<h2 className="col-4 m-0 p-0 text-center text-white">Mail: {user.email}</h2>:null}
        <button onClick={handleLogout} className="col-1 d-flex align-items-center justify-content-center m-0 text-center tex-twhite btn btn-danger">Cerrar sesión</button>
    </header>
  )
}