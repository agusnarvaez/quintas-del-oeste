import Header from "../components/Home/Header"
import Footer from "../components/Home/Footer"
import Main from "../components/Home/Main"
import HelmetData from '../components/HelmetData'
import WhatsappButton from "../components/WhatsappButton"

import '../assets/styles/index.css'
import Scroll from'react-scroll'
export default function Home({metaData}) {
    var Element  = Scroll.Element
    return (
    <div className="container-fluid p-0 position-relative min-height-100vh">
      <HelmetData metaData={metaData} />
      <Element className="container-fluid" id="home" name='home'></Element>
      <Header id="header" />
      <Main />
      <WhatsappButton />
      <Footer id="footer" />
    </div>
  )
}