import Header from "./Header"
import Footer from "./Footer"
import Main from "./Main"

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