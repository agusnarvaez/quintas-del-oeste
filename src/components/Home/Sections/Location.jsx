import Cercanias from './Location/CloseStreets'
import Direccion from './Location/Address'

import GoogleMap from './Location/GoogleMap'
import Scroll from'react-scroll'

import mapImage from '../../../assets/map/ubicacionQuintas-1.jpg'
import mapImage2 from '../../../assets/map/ubicacionQuintas-2.jpg'

export default function Location() {
  var Element  = Scroll.Element
  return (
    <Element className="container-fluid min-height-100 p-0 mt-5 d-flex flex-wrap" id='location' name="location">

      <Direccion />

        <Cercanias />
      <div className="mapContainer min-height-50 container-fluid p-0 col-12 d-flex justify-content-center flex-wrap">


        {/* <GoogleMap /> */}
        <img src={mapImage2} alt="mapa de ubicación" className="img-fluid col-12 col-lg-8 object-fit-cover" />
        <img src={mapImage} alt="mapa de ubicación" className="img-fluid col-12 col-lg-4 object-fit-cover" />

      </div>

    </Element>
  )
}