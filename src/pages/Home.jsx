import Header from "../components/Home/Header"
import Footer from "../components/Home/Footer"
import Main from "../components/Home/Main"

export default function Home() {
  return (
    <section className="container-fluid p-0">
      <div className="container-fluid" id="home"></div>
      <Header id="header" />
      <Main />
      <Footer id="footer" />
    </section>
  )
}