import Header from "../components/Home/Header"
import Footer from "../components/Home/Footer"
import Main from "../components/Home/Main"
import HelmetData from '../components/HelmetData'
import WhatsappButton from "../components/WhatsappButton"

import '../assets/styles/index.css'

export default function Home({metaData}) {
  return (
    <div className="container-fluid p-0 position-relative min-height-100vh">
      <HelmetData metaData={metaData} />
      <div className="container-fluid" id="home"></div>
      <Header id="header" />
      <Main />
      <WhatsappButton />
      <Footer id="footer" />
    </div>
  )
}