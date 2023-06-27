import Main from "../components/Admin/Main"
import Footer from "../components/Admin/Footer"
import Header from "../components/Admin/Header"

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  //* Si el usuario está autenticado lo redirijo a la página de administración
  useEffect(() => {
    if(!isAuthenticated) navigate("/admin/login")
  }, [isAuthenticated,navigate])
  return (
    <>
      <Header id="header" />
      <Main />
      <Footer id="footer" />
    </>
  )
}