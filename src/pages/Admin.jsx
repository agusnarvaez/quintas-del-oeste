import Main from "../components/Admin/Main"
import Footer from "../components/Admin/Footer"
import Header from "../components/Admin/Header"

import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const {user} = useAuth()
  return (
    <>
      <Header id="header" user={user} />
      <Main />
      <Footer id="footer" />
    </>
  )
}