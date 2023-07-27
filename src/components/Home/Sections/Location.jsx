import Cercanias from './Location/CloseStreets'
import Direccion from './Location/Address'

import GoogleMap from './Location/GoogleMap'

export default function Location() {
  return (
    <section className="container-fluid p-0 mt-5" id="location">

      <Direccion />

      <div className="mapContainer container-fluid p-0 col-12 d-flex justify-content-center">


        <GoogleMap />
        <Cercanias />

      </div>

    </section>
  )
}