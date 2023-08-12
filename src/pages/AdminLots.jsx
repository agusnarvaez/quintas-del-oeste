import '../assets/styles/adminPanel.css'
import LotsMain from "../components/Admin/Lots/LotsMain"
import Footer from "../components/Admin/AdminFooter"
import Header from "../components/Admin/AdminHeader"
import { useAuth } from '../context/AuthContext'
import HelmetData from '../components/HelmetData'
export default function Admin({metaData}) {
  const {user} = useAuth()

  return (
    <>
      <HelmetData metaData={metaData} />
      <Header id="header" user={user} />
      <LotsMain />
      <Footer id="footer" />
    </>
  )
}