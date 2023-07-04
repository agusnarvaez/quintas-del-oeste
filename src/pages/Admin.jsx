import '../assets/styles/adminPanel.css'
import Main from "../components/Admin/Main"
import Footer from "../components/Admin/Footer"
import Header from "../components/Admin/AdminHeader"
import { useAuth } from '../context/AuthContext'
import HelmetData from '../components/HelmetData'
export default function Admin({metaData}) {
  const {user} = useAuth()

  return (
    <>
      <HelmetData metaData={metaData} />
      <Header id="header" user={user} />
      <Main />
      <Footer id="footer" />
    </>
  )
}