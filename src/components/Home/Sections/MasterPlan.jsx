import InteractiveMap from '../../Map/Map'
import Scroll from'react-scroll'
export default function MasterPlan() {
  var Element  = Scroll.Element
  return (
    <Element className="container-fluid p-0 d-flex justify-content-center flex-wrap" id="masterPlan" name='masterPlan'>
      <h2 className='text-quintas-green text-center'>RESERVÁ TU LOTE AHORA EN 3 PASOS</h2>
      <div className='my-3 col-11 row flex-wrap justify-content-center  align-items-center'>
        <div className='bg-quintas-green punta-final conector-md h-50px my-2 row col-12 col-md-6 col-lg-3 p-0 px-5 px-lg-5 align-items-center justify-content-between '>
          <h3 className='text-white text-center d-flex align-items-center fs-1 col-1 m-0 p-0'>1</h3>
          <p className='text-white d-flex align-items-center col-10 m-0 p-0'>NAVEGÁ EL MASTERPLAN Y ELEGÍ TU LOTE</p>
        </div>


        <div className='bg-quintas-green h-50px punta-final  my-2 row col-12 col-md-6 col-lg-3 p-0 px-5 px-lg-4 align-items-center justify-content-between'>
          <h3 className='text-white fs-1 col-1 m-0 p-0 d-flex align-items-center'>2</h3>
          <p className='text-white col-11 col-lg-10 m-0 p-0 d-flex align-items-center'>COMPLETÁ TUS DATOS Y RESERVÁ</p>
        </div>

        <div className='bg-quintas-green h-50px punta-final conector-md my-2 row col-12 col-md-6 col-lg-3 p-0 px-5 align-items-center justify-content-between'>
          <h3 className='text-white fs-1 col-1 m-0 p-0 d-flex align-items-center'>3</h3>
          <p className='text-white col-11 col-lg-10 m-0 p-0 d-flex align-items-center'>SELECCIONÁ TU FORMA DE PAGO</p>
        </div>

        <div className='bg-quintas-dark-gray h-50px my-2 punta-final sin-punta-md row col-12 col-md-6 col-lg-3 p-0 px-5 align-items-center justify-content-lg-center'>
          <p className='text-white col-11 m-0 p-0 d-flex align-items-center'>LISTO! NUESTRO EQUIPO SE CONTACTARÁ CONTIGO</p>
        </div>

      </div>
      <InteractiveMap adminMode={false} />
    </Element>
  )
}