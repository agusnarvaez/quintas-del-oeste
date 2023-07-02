import Cercanias from './Ubicacion/Cercanias'
import Direccion from './Ubicacion/Direccion'

import GoogleMap from './Ubicacion/GoogleMap'

export default function Ubicacion() {
  return (
    <div className="container-fluid p-0 mt-5" id="location">

      <Direccion />

      <div className="mapContainer container-fluid p-0 col-12 d-flex justify-content-center">


        <GoogleMap />
        <Cercanias />

      </div>

    </div>
  )
}