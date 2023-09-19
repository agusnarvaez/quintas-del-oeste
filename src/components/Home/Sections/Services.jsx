import SportsTennisIcon from '@mui/icons-material/SportsTennis'
export default function Services() {
  const infrastructure = [
    {
      icon: 'bi bi-lightning',
      title: 'RED ELÉCTRICA',
    },
    {
      icon: 'bi bi-lightbulb',
      title: 'ALUMBRADO PÚBLICO AÉREO LED',
    },
    {
      icon: 'bi bi-droplet-half',
      title: 'AGUA POTABLE / CORRIENTE',
    },
    {
      icon: 'bi bi-water',
      title: 'DESAGUES CLOACALES',
    },
    {
      icon:'bi bi-fire',
      title: 'GAS POR GESTIÓN PROPIA'
    },
    {
      icon: 'bi bi-hdd-network',
      title: 'INTERNET POR FIBRA ÓPTICA',
    }
  ]

  const services = [
    {
      icon: 'bi bi-house',
      title: 'SUM',
    },
    {
      icon: <SportsTennisIcon />,
      title: 'TENNIS / PADEL',
    },
    {
      icon: 'fa fa-light fa-futbol',
      title: 'FÚTBOL',
    },
    {
      icon: 'bi bi-webcam',
      title: 'CÁMARAS DE SEGURIDAD',
    },
    {
      icon:'bi bi-scooter',
      title: 'AREA PARA NIÑOS'
    }
  ]
  return (
    <section className="home-services container-fluid row p-0 my-5 mx-0 " id="services">
      {/* <div>
        <h2>Características</h2>
        <p>Quintas es un barrio ubicado en zona oeste</p>
      </div> */}

      <div className="bg-quintas-dark-gray col-12 row p-2 py-5 m-0 justify-content-center justify-content-around">
        <ul className="list-unstyled m-0 p-0 col-10 col-md-5 col-lg-4 col-xl-4 col-xxl-3">
          <li className='text-white fs-5 pb-2'><h3>INFRAESTRUCTURA</h3></li>
          {
            infrastructure.map((item, index) => (
              <li className='text-white py-2' key={index}>
                <i className={item.icon}/>
                <span className='ps-3 fs-5'>{item.title}</span>
              </li>
            ))
          }
        </ul>
        <ul className="list-unstyled m-0 px-0 py-0 pt-5 p-md-0 col-10 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
          <li className='text-white fs-5 pb-2'><h3>SERVICIOS</h3></li>
          {
            services.map((item, index) => (
              <li className='text-white py-2' key={index}>
                {typeof item.icon === 'string' ? (<i className={item.icon}/>): item.icon}
                <span className={typeof item.icon === 'string' ?'ps-3 fs-5':'ps-1 fs-5'}>{item.title}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}