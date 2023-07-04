import Header from "../components/Home/Header"
import Footer from "../components/Home/Footer"
import Main from "../components/Home/Main"
import HelmetData from '../components/HelmetData'
export default function Home({metaData}) {
  return (
    <section className="container-fluid p-0">
      <HelmetData metaData={metaData} />
      <div className="container-fluid" id="home"></div>
      <Header id="header" />
      <Main />
      <Footer id="footer" />
    </section>
  )
}