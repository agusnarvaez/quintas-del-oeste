import credentials from "../../../../credentials"


export default function LinksInfo() {
  return (
    <ul className="container-fluid d-flex flex-column align-items-center row mx-0 my-3 my-lg-0 z-index-150 col-lg-12 flex-lg-row">
      <li className="btn-quintas container col-6 col-lg-3 d-flex justify-content-center align-items-center bg-quintas-green p-2 px-lg-1 my-2"><a className="text-white text-decoration-none" href="https://calendly.com/quintasdeloestecomercial/visitas-quinta-del-oeste" target="_blank" rel="noreferrer">AGENDÁ TU VISITA</a></li>
      <li className="btn-quintas container col-6 col-lg-3 d-flex justify-content-center align-items-center bg-quintas-green p-2 px-lg-1 my-2"><a className="text-white text-decoration-none" href="google.com" target="_blank" rel="noreferrer">VER FOLLETO</a></li>
      <li className="btn-quintas container col-6 col-lg-3 d-flex justify-content-center align-items-center bg-quintas-green p-2 px-lg-1 my-2"><a className="text-white text-decoration-none" href={credentials.whatsappApi} target="_blank" rel="noreferrer">QUIERO QUE ME LLAMEN</a></li>
    </ul>
  )
}