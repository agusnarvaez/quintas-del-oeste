import Cercanias from './Location/CloseStreets'
import Direccion from './Location/Address'

import GoogleMap from './Location/GoogleMap'
import Scroll from'react-scroll'


export default function Location() {
  var Element  = Scroll.Element
  return (
    <Element className="container-fluid p-0 mt-5" id='location' name="location">

      <Direccion />

      <div className="mapContainer container-fluid p-0 col-12 d-flex justify-content-center">


        <GoogleMap />
        <Cercanias />

      </div>

    </Element>
  )
}